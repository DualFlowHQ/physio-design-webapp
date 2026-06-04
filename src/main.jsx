import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

window.React = React;
window.TWEAK_DEFAULTS = {
  theme: 'clinical',
  startScreen: 'home',
};

await import('../components/tokens.jsx');
await import('../components/icons.jsx');
await import('../components/i18n.jsx');
await import('../components/scales.jsx');
await import('../components/progress-data.jsx');
await import('../components/bodymap.jsx');
await import('../components/home.jsx');
await import('../components/session.jsx');
await import('../components/recap.jsx');
await import('../components/program.jsx');
await import('../components/history.jsx');
await import('../components/lexique.jsx');

const { RealApp } = await import('./RealApp.jsx');

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RealApp />
  </React.StrictMode>
);
