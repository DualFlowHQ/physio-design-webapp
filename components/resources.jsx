// Ressources screen — patient sees shared resources, organised by type.
// Tap a resource to open a detail sheet with context and the source link.

function ResourcesScreen({ onBack }) {
  const [activeId, setActiveId] = React.useState(null);
  const [filter, setFilter] = React.useState('all');
  const [bookmarks, setBookmarks] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('physio_bookmarks')) || []; }
    catch { return []; }
  });
  const toggleBookmark = (id) => {
    setBookmarks(b => {
      const next = b.includes(id) ? b.filter(x => x !== id) : [...b, id];
      localStorage.setItem('physio_bookmarks', JSON.stringify(next));
      return next;
    });
  };

  const list = React.useMemo(() => {
    if (filter === 'all') return RESOURCE_DATA;
    if (filter === 'unread') return RESOURCE_DATA.filter(r => r.unread);
    if (filter === 'saved') return RESOURCE_DATA.filter(r => bookmarks.includes(r.id));
    return RESOURCE_DATA.filter(r => r.type === filter);
  }, [filter, bookmarks]);

  const unreadCount = RESOURCE_DATA.filter(r => r.unread).length;
  const active = activeId ? RESOURCE_DATA.find(r => r.id === activeId) : null;

  return (
    <div style={{ background: T.bg, minHeight: '100%', paddingBottom: 120 }}>
      {/* Top bar */}
      <div style={{ padding: '60px 16px 8px', display: 'flex', gap: 12, alignItems: 'center' }}>
        <div onClick={onBack} style={{
          width: 40, height: 40, borderRadius: 999, background: T.paper, border: `0.5px solid ${T.line}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}><Icons.chevL size={18} stroke={T.ink2}/></div>
        <div style={{ flex: 1 }}/>
      </div>

      {/* Title */}
      <div style={{ padding: '8px 24px 0' }}>
        <div style={{ fontFamily: T.sans, fontSize: 12, letterSpacing: 0.5, textTransform: 'uppercase', color: T.ink3 }}>
          Ressources
        </div>
        <div style={{ marginTop: 6, fontFamily: T.display, fontSize: 36, lineHeight: 1.05, letterSpacing: -0.4, color: T.ink }}>
          Tes ressources<br/>
          <span style={{ fontStyle: 'italic', color: T.accentInk }}>partagées.</span>
        </div>
        <div style={{ marginTop: 10, fontFamily: T.sans, fontSize: 14, color: T.ink2, lineHeight: 1.45 }}>
          Livres, vidéos, articles — choisis pour toi, pas pour tout le monde.
        </div>
      </div>

      {/* Filter chips */}
      <div style={{ marginTop: 20, padding: '0 16px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {[
          ['all', `Tout · ${RESOURCE_DATA.length}`],
          ['unread', `Non lu · ${unreadCount}`],
          ['saved', 'Enregistrés'],
          ['book', 'Livres'],
          ['video', 'Vidéos'],
          ['article', 'Articles'],
          ['wiki', 'Wiki'],
          ['podcast', 'Podcasts'],
          ['exercise', 'Routines'],
        ].map(([k, l]) => (
          <div key={k} onClick={()=>setFilter(k)} style={{
            padding: '7px 14px', borderRadius: 999, whiteSpace: 'nowrap', cursor: 'pointer',
            background: filter === k ? T.ink : T.paper,
            color: filter === k ? T.paper : T.ink2,
            border: filter === k ? 'none' : `0.5px solid ${T.line}`,
            fontFamily: T.sans, fontSize: 13, fontWeight: 500,
          }}>{l}</div>
        ))}
      </div>

      {/* List */}
      <div style={{ marginTop: 16, padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {list.length === 0 && (
          <div style={{ marginTop: 30, textAlign: 'center', fontFamily: T.sans, fontSize: 14, color: T.ink3, padding: '40px 24px' }}>
            Rien ici pour l’instant.
          </div>
        )}
        {list.map(r => (
          <ResourceRow key={r.id} r={r} onClick={()=>setActiveId(r.id)}
            saved={bookmarks.includes(r.id)} onToggleSave={()=>toggleBookmark(r.id)} />
        ))}
      </div>

      {active && (
        <ResourceSheet r={active} onClose={()=>setActiveId(null)}
          saved={bookmarks.includes(active.id)} onToggleSave={()=>toggleBookmark(active.id)}/>
      )}
    </div>
  );
}

function ResourceRow({ r, onClick, saved, onToggleSave }) {
  const m = TYPE_META[r.type];
  return (
    <div onClick={onClick} style={{
      padding: 12, borderRadius: 18, background: T.paper, border: `0.5px solid ${T.line}`,
      display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer', position: 'relative',
    }}>
      {r.unread && (
        <div style={{ position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: 99, background: T.danger }}/>
      )}
      <ResourceCover type={r.type} size="sm"/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {React.createElement(Icons[m.icon], { size: 11, stroke: T[m.ink] })}
          <span style={{ fontFamily: T.sans, fontSize: 12, letterSpacing: 0.4, textTransform: 'uppercase', color: T.ink3 }}>
            {m.label}
          </span>
          <span style={{ fontFamily: T.sans, fontSize: 12, color: T.ink3 }}>·</span>
          <span style={{ fontFamily: T.sans, fontSize: 12, color: T.ink3 }}>{r.duration}</span>
        </div>
        <div style={{ marginTop: 3, fontFamily: T.sans, fontSize: 14, fontWeight: 500, color: T.ink, lineHeight: 1.25,
          overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box',
          WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {r.title}
        </div>
        <div style={{ marginTop: 4, fontFamily: T.sans, fontSize: 12, color: T.ink3,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {r.author} · {r.sharedAt}
        </div>
      </div>
      <div onClick={(e)=>{ e.stopPropagation(); onToggleSave(); }} style={{
        width: 32, height: 32, borderRadius: 999, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icons.bookmark size={14} stroke={saved ? T.accent : T.ink3}/>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Detail sheet
// ─────────────────────────────────────────────────────────────
function ResourceSheet({ r, onClose, saved, onToggleSave }) {
  const m = TYPE_META[r.type];
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 100,
      background: 'rgba(20, 18, 15, 0.45)',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
    }} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{
        background: T.paper, borderRadius: '28px 28px 0 0', padding: '12px 0 28px',
        maxHeight: '90%', overflow: 'auto',
        boxShadow: '0 -10px 40px rgba(0,0,0,0.18)',
      }}>
        <div style={{ width: 38, height: 5, borderRadius: 99, background: T.line2, margin: '0 auto 16px' }}/>

        {/* Hero */}
        <div style={{ padding: '0 22px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <ResourceCover type={r.type} size="lg"/>
          <div style={{ flex: 1, minWidth: 0, paddingTop: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: T.sans, fontSize: 12,
              letterSpacing: 0.4, textTransform: 'uppercase', color: T[m.ink] }}>
              {React.createElement(Icons[m.icon], { size: 11, stroke: T[m.ink] })} {m.label}
            </div>
            <div style={{ marginTop: 6, fontFamily: T.display, fontSize: 24, lineHeight: 1.1, color: T.ink, letterSpacing: -0.3 }}>
              {r.title}
            </div>
            <div style={{ marginTop: 6, fontFamily: T.sans, fontSize: 13, color: T.ink2 }}>
              {r.author}
            </div>
            <div style={{ marginTop: 2, fontFamily: T.sans, fontSize: 12, color: T.ink3 }}>
              {r.meta}
            </div>
          </div>
        </div>

        {/* Clinical note — the why */}
        <div style={{ margin: '20px 22px 0', padding: 16, borderRadius: 18,
          background: T.amberSoft+'77' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 999, flexShrink: 0,
              background: `linear-gradient(135deg, ${T.accentSoft}, ${T.amberSoft})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: T.display, fontSize: 16, fontStyle: 'italic', color: T.accentInk,
            }}><Icons.info size={15} stroke={T.accentInk}/></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 500, color: T.ink }}>Note de suivi</div>
              <div style={{ fontFamily: T.sans, fontSize: 12, color: T.ink3 }}>{r.sharedAt} · pour toi</div>
            </div>
          </div>
          <div style={{ marginTop: 12, fontFamily: T.sans, fontSize: 14, color: T.ink, lineHeight: 1.5, fontStyle: 'italic' }}>
            «&nbsp;{r.note}&nbsp;»
          </div>
          {r.pages && (
            <div style={{ marginTop: 12, padding: '8px 12px', borderRadius: 10, background: T.paper,
              fontFamily: T.mono, fontSize: 12, color: T.accentInk, display: 'inline-block' }}>
              → {r.pages}
            </div>
          )}
        </div>

        {/* Why this resource is useful */}
        <div style={{ margin: '18px 22px 0' }}>
          <div style={{ fontFamily: T.sans, fontSize: 12, letterSpacing: 0.4, textTransform: 'uppercase', color: T.ink3 }}>
            Pourquoi
          </div>
          <div style={{ marginTop: 6, fontFamily: T.sans, fontSize: 14, color: T.ink2, lineHeight: 1.5 }}>
            {r.sharedFor}.
          </div>
        </div>

        {/* Source link card */}
        <div style={{ margin: '18px 22px 0', padding: '12px 14px', borderRadius: 14,
          background: T.paper2, border: `0.5px solid ${T.line}`,
          display: 'flex', alignItems: 'center', gap: 10 }}>
          <Icons.link size={16} stroke={T.ink3}/>
          <div style={{ flex: 1, minWidth: 0, fontFamily: T.mono, fontSize: 12, color: T.ink2,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {r.link}
          </div>
        </div>

        {/* Actions */}
        <div style={{ margin: '20px 22px 0', display: 'flex', gap: 10 }}>
          <button style={{
            flex: 1, height: 48, borderRadius: 999, border: 'none', cursor: 'pointer',
            background: T.ink, color: T.paper,
            fontFamily: T.sans, fontSize: 14, fontWeight: 500,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <Icons.external size={14} stroke={T.paper}/>
            {r.type === 'video' ? 'Regarder' : r.type === 'podcast' ? 'Écouter' : r.type === 'exercise' ? 'Lancer' : 'Ouvrir'}
          </button>
          <button onClick={onToggleSave} style={{
            width: 48, height: 48, borderRadius: 999, cursor: 'pointer',
            background: saved ? T.accentSoft : T.paper, border: `0.5px solid ${saved ? T.accent : T.line}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icons.bookmark size={16} stroke={saved ? T.accent : T.ink2}/>
          </button>
        </div>
      </div>
    </div>
  );
}

window.ResourcesScreen = ResourcesScreen;
