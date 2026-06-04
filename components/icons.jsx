// Thin stroke icons — 1.6 stroke width, round caps
const Icon = ({ d, size = 20, stroke = 'currentColor', fill = 'none', sw = 1.6, children, vb = 24 }) => (
  <svg width={size} height={size} viewBox={`0 0 ${vb} ${vb}`} fill="none"
       stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {d ? <path d={d}/> : children}
  </svg>
);

const Icons = {
  edit:    (p) => <Icon {...p} d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>,
  home:    (p) => <Icon {...p} d="M3 11l9-8 9 8v10a1 1 0 01-1 1h-5v-7h-6v7H4a1 1 0 01-1-1V11z"/>,
  play:    (p) => <Icon {...p}><path d="M7 4l13 8-13 8V4z" fill="currentColor" stroke="none"/></Icon>,
  pause:   (p) => <Icon {...p}><rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none"/><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none"/></Icon>,
  check:   (p) => <Icon {...p} d="M4 12l5 5L20 6"/>,
  chev:    (p) => <Icon {...p} d="M9 6l6 6-6 6"/>,
  chevL:   (p) => <Icon {...p} d="M15 6l-6 6 6 6"/>,
  chevD:   (p) => <Icon {...p} d="M6 9l6 6 6-6"/>,
  spark:   (p) => <Icon {...p} d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>,
  flame:   (p) => <Icon {...p} d="M12 3c1 3 5 4 5 9a5 5 0 11-10 0c0-3 2-3 2-6 0 0 2 1 3 3 0-2 0-4 0-6z"/>,
  body:    (p) => <Icon {...p}><circle cx="12" cy="5" r="2"/><path d="M12 7v6m-4 0l4-2 4 2M8 20l4-7 4 7"/></Icon>,
  book:    (p) => <Icon {...p} d="M4 5a2 2 0 012-2h14v16H6a2 2 0 00-2 2V5zm0 0v14"/>,
  user:    (p) => <Icon {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></Icon>,
  clock:   (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></Icon>,
  plus:    (p) => <Icon {...p} d="M12 5v14M5 12h14"/>,
  close:   (p) => <Icon {...p} d="M6 6l12 12M18 6L6 18"/>,
  info:    (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8v.5"/></Icon>,
  bell:    (p) => <Icon {...p} d="M6 8a6 6 0 1112 0c0 7 3 8 3 8H3s3-1 3-8zM10 20a2 2 0 004 0"/>,
  sun:     (p) => <Icon {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></Icon>,
  moon:    (p) => <Icon {...p} d="M20 15a8 8 0 11-8-11 6 6 0 008 11z"/>,
  settings:(p) => <Icon {...p}><circle cx="12" cy="12" r="3"/><path d="M12 2l1.5 3 3-1 .5 3 3 1.5-2 2.5 2 2.5-3 1.5-.5 3-3-1-1.5 3-1.5-3-3 1-.5-3-3-1.5 2-2.5-2-2.5 3-1.5.5-3 3 1z"/></Icon>,
  stretch: (p) => <Icon {...p}><circle cx="12" cy="4" r="1.8"/><path d="M12 6v5m-4 9l4-9 4 9M6 12l6-1 6 1"/></Icon>,
  leg:     (p) => <Icon {...p}><circle cx="12" cy="4" r="1.8"/><path d="M12 6v6l-3 8M12 12l3 8"/></Icon>,
  heart:   (p) => <Icon {...p} d="M12 20s-7-4.5-7-10a4 4 0 017-3 4 4 0 017 3c0 5.5-7 10-7 10z"/>,
  dot:     (p) => <Icon {...p}><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/></Icon>,
  arrow:   (p) => <Icon {...p} d="M5 12h14M13 6l6 6-6 6"/>,
  refresh: (p) => <Icon {...p} d="M3 12a9 9 0 0115-6.7L21 8M21 3v5h-5M21 12a9 9 0 01-15 6.7L3 16M3 21v-5h5"/>,
  calendar:(p) => <Icon {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></Icon>,
  trend:   (p) => <Icon {...p} d="M3 17l6-6 4 4 8-8M14 7h7v7"/>,
  // resources
  film:    (p) => <Icon {...p}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M3 15h18M8 4v16M16 4v16"/></Icon>,
  article: (p) => <Icon {...p}><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></Icon>,
  wiki:    (p) => <Icon {...p} d="M3 6l4 14 5-12 5 12 4-14"/>,
  mic:     (p) => <Icon {...p}><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3M9 21h6"/></Icon>,
  link:    (p) => <Icon {...p} d="M10 14a4 4 0 005.66 0l3-3a4 4 0 10-5.66-5.66l-1 1M14 10a4 4 0 00-5.66 0l-3 3a4 4 0 105.66 5.66l1-1"/>,
  bookmark:(p) => <Icon {...p} d="M6 3h12v18l-6-4-6 4V3z"/>,
  external:(p) => <Icon {...p} d="M14 4h6v6M20 4l-9 9M16 12v6a2 2 0 01-2 2H6a2 2 0 01-2-2V10a2 2 0 012-2h6"/>,
  search:  (p) => <Icon {...p}><circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5"/></Icon>,
};
window.Icons = Icons;
window.Icon = Icon;
