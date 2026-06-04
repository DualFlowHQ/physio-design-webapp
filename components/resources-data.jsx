// Ressources — patient resource library.
// Each resource has type (book / article / wiki / video / podcast / exercise),
// source meta, and a short clinical note explaining why it is useful.

const RESOURCE_DATA = [
  {
    id: 'r1', type: 'book', unread: true,
    title: 'Comprendre la douleur de hanche',
    author: 'Ressource clinique',
    meta: 'Guide patient · 2024 · 42 p.',
    cover: 'book-knee',
    sharedAt: 'il y a 2 h',
    sharedFor: 'Repères douleur et reprise de marche',
    note: 'Lis surtout la partie sur la douleur persistante: l’objectif est de suivre la tendance, pas de viser zéro douleur à chaque mouvement.',
    pages: 'p. 12–24',
    duration: '~15 min de lecture',
    link: 'clinique.example.com/hanche-douleur',
  },
  {
    id: 'r2', type: 'video', unread: true,
    title: 'Squat contrôlé — amplitude confortable',
    author: 'Major Mouvement',
    meta: 'YouTube · 7 min',
    cover: 'video-squat',
    sharedAt: 'hier',
    sharedFor: 'Depuis l’ajout du squat le 8 mai',
    note: 'Regarde surtout le contrôle du bassin et l’amplitude. Le but est un mouvement propre, pas une grande profondeur.',
    duration: '7 min',
    link: 'youtube.com/watch?v=...',
  },
  {
    id: 'r3', type: 'wiki',
    title: 'Articulation de la hanche',
    author: 'Wikipédia',
    meta: 'Article · 10 min de lecture',
    cover: 'wiki-lca',
    sharedAt: 'il y a 3 jours',
    sharedFor: 'Pour situer la zone douloureuse',
    note: 'Bonne vue d’ensemble anatomique. À utiliser comme repère, pas comme diagnostic.',
    duration: '10 min',
    link: 'fr.wikipedia.org/wiki/Hanche',
  },
  {
    id: 'r4', type: 'article',
    title: 'Pourquoi les abducteurs comptent pour la marche',
    author: 'Kiné Actualité',
    meta: 'Article · 6 min',
    cover: 'article-proprio',
    sharedAt: 'la semaine dernière',
    sharedFor: 'Pour comprendre pourquoi on insiste là-dessus',
    note: 'Ça explique pourquoi on travaille abduction et fessiers: ils aident à stabiliser le bassin pendant la marche.',
    duration: '6 min',
    link: 'kineactu.example.com/proprioception',
  },
  {
    id: 'r5', type: 'podcast',
    title: 'Reprendre confiance avec une douleur persistante',
    author: 'La Clinique du Coureur',
    meta: 'Podcast · épisode 142 · 48 min',
    cover: 'podcast-lca',
    sharedAt: 'la semaine dernière',
    sharedFor: 'Pour le moral des longues semaines',
    note: 'À écouter pendant une marche facile. L’idée: voir la progression par paliers plutôt que jour par jour.',
    duration: '48 min',
    link: 'cliniqueducoureur.example.com/142',
  },
  {
    id: 'r6', type: 'exercise',
    title: 'Routine d’étirements du soir',
    author: 'Routine personnalisée',
    meta: 'Routine personnalisée · 4 mouvements',
    cover: 'exercise-night',
    sharedAt: 'il y a 2 semaines',
    sharedFor: 'Pour les soirs où la hanche tire',
    note: 'À faire avant de te coucher les soirs de séance. Ne force jamais — juste de la mobilité douce.',
    duration: '5 min',
    link: 'physio.app/routines/etirements-soir',
  },
];

window.RESOURCE_DATA = RESOURCE_DATA;

const TYPE_META = {
  book:     { label: 'Livre',    icon: 'book',    tint: 'amberSoft',  ink: 'amber' },
  article:  { label: 'Article',  icon: 'article', tint: 'skySoft',    ink: 'sky' },
  wiki:     { label: 'Wikipédia',icon: 'wiki',    tint: 'paper2',     ink: 'ink2' },
  video:    { label: 'Vidéo',    icon: 'film',    tint: 'accentSoft', ink: 'accent' },
  podcast:  { label: 'Podcast',  icon: 'mic',     tint: 'sageSoft',   ink: 'sage' },
  exercise: { label: 'Routine',  icon: 'stretch', tint: 'sageSoft',   ink: 'sage' },
};
window.TYPE_META = TYPE_META;

// ─────────────────────────────────────────────────────────────
// Resource cover artwork — different visual treatment per type
// (placeholders, iconographic — no copyrighted artwork)
// ─────────────────────────────────────────────────────────────
function ResourceCover({ type, size = 'md' }) {
  const m = TYPE_META[type];
  const tint = T[m.tint];
  const ink = T[m.ink];

  const dims = size === 'sm' ? { w: 56, h: 72 } : size === 'lg' ? { w: 120, h: 156 } : { w: 76, h: 100 };

  if (type === 'book') {
    return (
      <div style={{
        width: dims.w, height: dims.h, borderRadius: '4px 8px 8px 4px',
        background: `linear-gradient(110deg, oklch(0.45 0.06 60) 0%, oklch(0.32 0.05 50) 100%)`,
        boxShadow: `inset 4px 0 0 oklch(0.30 0.05 50), 0 2px 8px rgba(0,0,0,0.15)`,
        position: 'relative', overflow: 'hidden', flexShrink: 0,
      }}>
        <div style={{ position: 'absolute', inset: '14% 12% auto 22%', height: 1, background: ink, opacity: 0.7 }}/>
        <div style={{ position: 'absolute', inset: 'auto 12% 14% 22%', height: 1, background: ink, opacity: 0.4 }}/>
        <div style={{ position: 'absolute', inset: '32% 16% auto 22%', fontFamily: T.display, fontStyle: 'italic',
          fontSize: dims.w/9, color: T.paper, lineHeight: 1.05 }}>
          la<br/>hanche
        </div>
      </div>
    );
  }

  if (type === 'video') {
    return (
      <div style={{
        width: dims.w, height: dims.h * 0.62, borderRadius: 10, flexShrink: 0,
        background: `linear-gradient(135deg, oklch(0.30 0.04 60) 0%, ${T.accent} 130%)`,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* subtle stripes hint at video frames */}
        {[0,1,2,3].map(i => (
          <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: `${20+i*18}%`, height: 1, background: 'rgba(255,255,255,0.07)' }}/>
        ))}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: dims.w*0.32, height: dims.w*0.32, borderRadius: 999, background: 'rgba(255,255,255,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icons.play size={dims.w*0.16} stroke={T.accentInk}/>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 6, right: 8, fontFamily: T.mono, fontSize: 12, color: T.paper, opacity: 0.9 }}>7:14</div>
      </div>
    );
  }

  if (type === 'wiki') {
    return (
      <div style={{
        width: dims.w, height: dims.h, borderRadius: 8, flexShrink: 0,
        background: T.paper, border: `0.5px solid ${T.line}`,
        padding: dims.w * 0.12, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div style={{ fontFamily: T.display, fontStyle: 'italic', fontSize: dims.w/4, color: T.ink, lineHeight: 1 }}>W</div>
        <div>
          {[0.9, 0.6, 0.75, 0.5].map((w, i) => (
            <div key={i} style={{ height: 2, marginTop: 3, background: T.line2, width: `${w*100}%`, borderRadius: 2 }}/>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'podcast') {
    return (
      <div style={{
        width: dims.w, height: dims.w, borderRadius: 12, flexShrink: 0,
        background: `radial-gradient(circle at 30% 30%, ${T.sageSoft}, ${T.sage})`,
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* concentric audio rings */}
        {[1,2,3].map(i => (
          <div key={i} style={{ position: 'absolute', width: `${i*30}%`, height: `${i*30}%`,
            borderRadius: 999, border: `1px solid rgba(255,255,255,0.5)`, opacity: 0.4 + i*0.15 }}/>
        ))}
        <Icons.mic size={dims.w*0.3} stroke={T.paper}/>
      </div>
    );
  }

  if (type === 'exercise') {
    return (
      <div style={{
        width: dims.w, height: dims.h * 0.7, borderRadius: 10, flexShrink: 0,
        background: T.sageSoft, position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icons.stretch size={dims.w*0.4} stroke={T.sage}/>
        <div style={{ position: 'absolute', bottom: 6, left: 8, fontFamily: T.mono, fontSize: 9, color: T.sage, opacity: 0.8 }}>4 mvts</div>
      </div>
    );
  }

  // article (default)
  return (
    <div style={{
      width: dims.w, height: dims.h, borderRadius: 10, flexShrink: 0,
      background: tint, padding: dims.w * 0.12,
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', gap: 4 }}>
        <div style={{ width: 6, height: 6, borderRadius: 99, background: ink }}/>
        <div style={{ width: 6, height: 6, borderRadius: 99, background: ink, opacity: 0.4 }}/>
      </div>
      <div>
        {[0.85, 0.95, 0.6].map((w, i) => (
          <div key={i} style={{ height: 2, marginTop: 4, background: ink, opacity: 0.4, width: `${w*100}%`, borderRadius: 2 }}/>
        ))}
      </div>
    </div>
  );
}

window.ResourceCover = ResourceCover;
