const API_USER_ID = 'demo-patient';
const API_BASE = '/api';

function stateUrl(suffix = '') {
  return API_BASE + '/state/' + encodeURIComponent(API_USER_ID) + suffix;
}

export async function loadBackendState() {
  const response = await fetch(stateUrl());
  if (!response.ok) throw new Error('Backend load failed: ' + response.status);
  const payload = await response.json();
  return payload.state || null;
}

export async function saveBackendState(state) {
  const response = await fetch(stateUrl(), {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ state }),
  });
  if (!response.ok) throw new Error('Backend save failed: ' + response.status);
  return response.json();
}

export async function resetBackendState() {
  const response = await fetch(stateUrl('/reset'), {
    method: 'POST',
  });
  if (!response.ok) throw new Error('Backend reset failed: ' + response.status);
  return response.json();
}
