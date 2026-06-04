// Ressources — patient resource library.
// Each resource has type (book / article / wiki / video / podcast / exercise),
// source meta, and a short clinical note explaining why it is useful.

const RESOURCE_DATA = [
  {
    id: 'r1', type: 'book', unread: true,
    title: 'Le guide du genou',
    author: 'Dr Bénédicte Forthomme',
    meta: 'Éditions De Boeck · 2021 · 320 p.',
    cover: 'book-knee',
    sharedAt: 'il y a 2 h',
    sharedFor: 'Section sur la phase de renforcement',
    note: 'Concentre-toi sur le chapitre 4 — c’est exactement où tu en es. Saute l’intro, c’est très technique.',
    pages: 'Ch. 4, p. 88–112',
    duration: '~25 min de lecture',
    link: 'librairie.example.com/le-guide-du-genou',
  },
  {
    id: 'r2', type: 'video', unread: true,
    title: 'Squat unipodal — la technique propre',
    author: 'Major Mouvement',
    meta: 'YouTube · 7 min',
    cover: 'video-squat',
    sharedAt: 'hier',
    sharedFor: 'Avant ta séance de mardi',
    note: 'Regarde de 2:10 à 4:30. Note bien le placement du genou par rapport au pied — c’est ce qu’on travaille en ce moment.',
    duration: '7 min',
    link: 'youtube.com/watch?v=...',
  },
  {
    id: 'r3', type: 'wiki',
    title: 'Ligament croisé antérieur',
    author: 'Wikipédia',
    meta: 'Article · 12 min de lecture',
    cover: 'wiki-lca',
    sharedAt: 'il y a 3 jours',
    sharedFor: 'Ta question sur le greffon',
    note: 'Bonne vue d’ensemble. Pour ta question précise sur le greffon, va directement à la section « Reconstruction ».',
    duration: '12 min',
    link: 'fr.wikipedia.org/wiki/Ligament_croisé_antérieur',
  },
  {
    id: 'r4', type: 'article',
    title: 'Pourquoi la proprioception décide du retour au sport',
    author: 'Kiné Actualité',
    meta: 'Article · 6 min',
    cover: 'article-proprio',
    sharedAt: 'la semaine dernière',
    sharedFor: 'Pour comprendre pourquoi on insiste là-dessus',
    note: 'C’est un peu dense mais ça explique pourquoi je te fais faire les exercices d’équilibre, même si tu trouves ça moins « efficace » que le renforcement.',
    duration: '6 min',
    link: 'kineactu.example.com/proprioception',
  },
  {
    id: 'r5', type: 'podcast',
    title: 'Reconstruire après le LCA — témoignages',
    author: 'La Clinique du Coureur',
    meta: 'Podcast · épisode 142 · 48 min',
    cover: 'podcast-lca',
    sharedAt: 'la semaine dernière',
    sharedFor: 'Pour le moral des longs jours',
    note: 'Trois témoignages de coureurs revenus au niveau. À écouter pendant que tu marches — pas pendant la séance.',
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
    sharedFor: 'Pour les soirs où le genou tire',
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
          le<br/>genou
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
