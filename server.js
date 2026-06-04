import http from 'node:http';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 5174);
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'patient-state.json');
const PUBLIC_DIR = path.join(__dirname, 'dist');
const DEFAULT_USER_ID = 'demo-patient';

const jsonHeaders = {
  'content-type': 'application/json; charset=utf-8',
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET,PUT,POST,OPTIONS',
  'access-control-allow-headers': 'content-type',
};

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
};

async function readStore() {
  try {
    return JSON.parse(await readFile(DATA_FILE, 'utf8'));
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.warn('Could not read data store, starting with an empty store.', error);
    }
    return { users: {} };
  }
}

async function writeStore(store) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(store, null, 2) + '\n');
}

function sendJson(res, status, body) {
  res.writeHead(status, jsonHeaders);
  res.end(JSON.stringify(body));
}

async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

function getUserId(url) {
  return decodeURIComponent(url.pathname.split('/').filter(Boolean)[2] || DEFAULT_USER_ID);
}

async function handleApi(req, res, url) {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, jsonHeaders);
    res.end();
    return;
  }

  if (url.pathname === '/api/health' && req.method === 'GET') {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (url.pathname.startsWith('/api/state/')) {
    const userId = getUserId(url);
    const store = await readStore();

    if (req.method === 'GET') {
      sendJson(res, 200, { userId, state: store.users[userId]?.state || null, updatedAt: store.users[userId]?.updatedAt || null });
      return;
    }

    if (req.method === 'PUT') {
      const body = await readJsonBody(req);
      if (!body || typeof body.state !== 'object' || Array.isArray(body.state)) {
        sendJson(res, 400, { error: 'Expected JSON body with a state object.' });
        return;
      }

      const now = new Date().toISOString();
      store.users[userId] = { state: body.state, updatedAt: now };
      await writeStore(store);
      sendJson(res, 200, { ok: true, userId, updatedAt: now });
      return;
    }

    if (req.method === 'POST' && url.pathname.endsWith('/reset')) {
      delete store.users[userId];
      await writeStore(store);
      sendJson(res, 200, { ok: true, userId });
      return;
    }
  }

  sendJson(res, 404, { error: 'Not found' });
}

function serveStatic(req, res, url) {
  const requestedPath = url.pathname === '/' ? '/index.html' : url.pathname;
  const filePath = path.normalize(path.join(PUBLIC_DIR, requestedPath));

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  const stream = createReadStream(filePath);
  stream.on('open', () => {
    const contentType = mimeTypes[path.extname(filePath)] || 'application/octet-stream';
    res.writeHead(200, { 'content-type': contentType });
    stream.pipe(res);
  });
  stream.on('error', () => {
    if (path.extname(filePath)) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    const fallback = createReadStream(path.join(PUBLIC_DIR, 'index.html'));
    fallback.on('open', () => {
      res.writeHead(200, { 'content-type': mimeTypes['.html'] });
      fallback.pipe(res);
    });
    fallback.on('error', () => {
      res.writeHead(404);
      res.end('Build the app with npm run build, or use npm run dev for Vite.');
    });
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://' + (req.headers.host || 'localhost'));

  try {
    if (url.pathname.startsWith('/api/')) {
      await handleApi(req, res, url);
      return;
    }
    serveStatic(req, res, url);
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: 'Internal server error' });
  }
});

server.listen(PORT, () => {
  console.log('Physio backend listening on http://localhost:' + PORT);
});
