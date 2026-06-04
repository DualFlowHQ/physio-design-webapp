// Patient-language lexicon for pain (NRS 0-10) and effort (Borg/RPE 1-10)
// Each level has: a short label, a body sensation, and a behavioral signal —
// written in everyday French as a patient would describe it.

const PAIN_LEXICON = [
  { v: 0, label: 'Aucune douleur', short: 'Aucune douleur.', cue: 'Tu ne sens pas de douleur en ce moment.', behav: 'Le mouvement n\'est pas limité par la douleur.', official: 'Ce score sert surtout de point de comparaison pour les prochains jours.', cues: ['Rien ne tire ton attention.', 'Tu bouges naturellement.', 'Le suivi aide à garder un repère de base.'], qualities: ['aucune', 'calme', 'stable'], anchor: 'Mon repère : je peux marcher et monter les escaliers sans y penser.' },
  { v: 1, label: 'Très légère', short: 'À peine perceptible.', cue: 'La douleur est presque absente, mais tu la remarques si tu y fais attention.', behav: 'Tu l\'oublies dès que tu fais autre chose.', official: 'Le score signale une trace précoce, sans impact réel sur l\'activité.', cues: ['Tu peux l\'oublier facilement.', 'Le mouvement reste naturel.', 'Tu la notes surtout si elle change après l\'exercice.'], qualities: ['léger', 'trace', 'discret'], anchor: 'Mon repère : je dois chercher la sensation pour la remarquer.' },
  { v: 2, label: 'Légère', short: 'Présente mais facile à gérer.', cue: 'La douleur est présente, mais elle reste facile à gérer.', behav: 'Ça ne change presque rien à ce que tu fais.', official: 'Elle n\'interrompt pas vraiment l\'activité et reste compatible avec un mouvement contrôlé.', cues: ['Tu peux continuer sans modifier grand-chose.', 'Le geste reste propre.', 'Le symptôme mérite d\'être noté s\'il monte après l\'exercice.'], qualities: ['léger', 'sourd', 'supportable'], anchor: 'Mon repère : petit pincement en descendant les escaliers, mais je reste fluide.' },
  { v: 3, label: 'Claire mais supportable', short: 'Claire, mais encore supportable.', cue: 'La douleur est nette et attire ton attention.', behav: 'Tu peux souvent continuer en ralentissant ou en restant attentif.', official: 'Le contexte avant, pendant et après l\'exercice devient utile à noter.', cues: ['Tu la sens pendant le mouvement.', 'Tu gardes le contrôle.', 'Tu surveilles si elle redescend ensuite.'], qualities: ['sourd', 'tiraillement', 'pulsatile'], anchor: 'Mon repère : je la sens à chaque répétition, mais je peux finir proprement.' },
  { v: 4, label: 'Modérée basse', short: 'Elle commence à peser.', cue: 'La douleur commence à peser sur ton attention.', behav: 'Tu adaptes ton rythme ou ton amplitude.', official: 'Elle peut te faire ajuster le mouvement sans forcément imposer l\'arrêt.', cues: ['Tu adaptes plus consciemment.', 'La douleur prend une vraie place dans l\'effort.', 'Le suivi aide à voir si elle redescend ensuite.'], qualities: ['pression', 'tiraillement', 'raideur'], anchor: 'Mon repère : je réduis naturellement l\'amplitude pour rester confortable.' },
  { v: 5, label: 'Modérée', short: 'Difficile à ignorer.', cue: 'La douleur limite plus clairement le confort ou la fluidité.', behav: 'Tu dois te concentrer pour continuer.', official: 'Un score répété à ce niveau mérite souvent une discussion avec le physio.', cues: ['Tu dois gérer la douleur pendant la tâche.', 'Certaines actions deviennent moins fluides.', 'Tu notes ce qui déclenche ou calme le symptôme.'], qualities: ['lancinant', 'brûlure', 'lourd'], anchor: 'Mon repère : je peux continuer, mais je pense surtout à mon genou.' },
  { v: 6, label: 'Modérée haute', short: 'Le mouvement se complique.', cue: 'La douleur est importante et complique le mouvement.', behav: 'Tu hésites avant le mouvement suivant.', official: 'Elle mérite un suivi plus serré, surtout si elle monte vite ou reste haute.', cues: ['Le geste perd en aisance.', 'Tu peux réduire l\'amplitude ou ralentir beaucoup.', 'Tu vérifies la réaction 2 h après et le lendemain.'], qualities: ['aigu', 'brûlure', 'pulsatile'], anchor: 'Mon repère : je peux faire le mouvement, mais ma technique commence à changer.' },
  { v: 7, label: 'Forte', short: 'Elle prend beaucoup de place.', cue: 'La douleur prend une grande place dans ton attention.', behav: 'Tu cherches à éviter ce mouvement précis.', official: 'Une hausse rapide ou inhabituelle à ce niveau doit être signalée.', cues: ['Tu changes nettement ta façon de bouger.', 'Le mouvement peut devenir hésitant.', 'La qualité du geste devient moins fiable.'], qualities: ['fort', 'pulsatile', 'brutal'], anchor: 'Mon repère : je commence à éviter la charge ou l\'exercice.' },
  { v: 8, label: 'Très forte', short: 'Difficile de rester relâché.', cue: 'La douleur rend le mouvement difficile à maintenir normalement.', behav: 'Tu ralentis ou tu t\'arrêtes spontanément.', official: 'Le score devient prioritaire à remonter au physio.', cues: ['Tu es tendu ou sur la défensive.', 'Le mouvement se dégrade ou s\'arrête plus vite.', 'Tu ne cherches pas à pousser à travers.'], qualities: ['coupant', 'brûlant', 'écrasant'], anchor: 'Mon repère : je protège le genou et je perds le contrôle du geste.' },
  { v: 9, label: 'Presque insupportable', short: 'Presque insupportable.', cue: 'La douleur monopolise presque toute ton attention.', behav: 'Tu penses d\'abord à t\'arrêter.', official: 'Le symptôme demande une réaction rapide et une communication claire.', cues: ['La qualité de mouvement n\'est plus fiable.', 'Tu ne peux pas rester relâché.', 'Tu évites de continuer normalement.'], qualities: ['violent', 'insupportable', 'brutal'], anchor: 'Mon repère : je ne peux presque plus penser à autre chose.' },
  { v: 10, label: 'Douleur maximale', short: 'Douleur maximale.', cue: 'La douleur est au maximum de ce que tu peux imaginer ou tolérer.', behav: 'Tu dois arrêter immédiatement et demander de l’aide si nécessaire.', official: 'C\'est un signal à prendre au sérieux et à communiquer immédiatement.', cues: ['Tu ne peux plus continuer normalement.', 'Le mouvement s\'arrête ou casse tout de suite.', 'Tu demandes de l\'aide si nécessaire.'], qualities: ['extrême', 'insupportable', 'débordant'], anchor: 'Mon repère : arrêt complet, je dois demander de l’aide si nécessaire.' },
];

const EFFORT_LEXICON = [
  { v: 1, label: 'Très facile', short: 'Très facile, presque au repos.', cue: 'L\'effort est minime.', behav: 'Tu pourrais continuer longtemps.', official: 'Tu sens à peine la charge ou la demande physique.', cues: ['Respiration normale.', 'Le mouvement est très propre.', 'Tu as beaucoup de marge.'], qualities: ['léger', 'fluide', 'facile'], anchor: 'Mon repère : je pourrais parler normalement pendant toute la série.' },
  { v: 2, label: 'Facile', short: 'Facile, très confortable.', cue: 'L\'effort reste très confortable.', behav: 'Tu gardes une grande réserve.', official: 'Le mouvement est facile à soutenir et ne demande pas encore beaucoup d\'attention.', cues: ['Tu peux parler sans effort.', 'La forme reste stable.', 'Tu pourrais ajouter du volume sans problème.'], qualities: ['confortable', 'stable', 'contrôle'], anchor: 'Mon repère : je sens que je travaille, mais sans fatigue.' },
  { v: 3, label: 'Modéré léger', short: 'Tu chauffes.', cue: 'Tu sens que le corps travaille, mais l\'effort reste léger à modéré.', behav: 'Tu es engagé sans être proche de ta limite.', official: 'La respiration monte un peu, mais le contrôle reste facile.', cues: ['Le muscle chauffe légèrement.', 'Tu peux parler en phrases complètes.', 'Tu as encore beaucoup de marge.'], qualities: ['actif', 'régulier', 'maîtrisé'], anchor: 'Mon repère : début d\'échauffement, je pourrais continuer longtemps.' },
  { v: 4, label: 'Modéré', short: 'Ça travaille pour vrai.', cue: 'L\'effort est clairement présent, mais bien contrôlé.', behav: 'Tu pourrais encore faire plusieurs répétitions de plus.', official: 'Tu sens un vrai travail musculaire sans perte de technique.', cues: ['Le muscle travaille franchement.', 'La respiration augmente.', 'La forme reste stable.'], qualities: ['solide', 'régulier', 'maîtrisé'], anchor: 'Mon repère : je dois me concentrer un peu, mais la forme reste facile.' },
  { v: 5, label: 'Soutenu', short: 'Soutenu, mais encore sous contrôle.', cue: 'Tu travailles pour vrai, mais tu restes sous contrôle.', behav: 'Tu gardes encore de la marge.', official: 'Un effort soutenu peut être normal en renforcement selon l\'objectif.', cues: ['La respiration augmente.', 'Tu sens la fatigue monter.', 'Tu pourrais faire quelques répétitions propres de plus.'], qualities: ['soutenu', 'engagé', 'contrôle'], anchor: 'Mon repère : la série demande un vrai effort, mais je finis proprement.' },
  { v: 6, label: 'Difficile', short: 'Difficile, avec encore un peu de marge.', cue: 'L\'effort est difficile mais contrôlable.', behav: 'Tu dois vraiment te concentrer.', official: 'Tu peux encore maintenir une bonne technique avec de l\'attention.', cues: ['Le corps travaille fort.', 'Il reste quelques répétitions possibles.', 'Tu surveilles que la forme ne se dégrade pas.'], qualities: ['difficile', 'dense', 'exigeant'], anchor: 'Mon repère : je peux finir, mais je ne veux pas ajouter beaucoup plus.' },
  { v: 7, label: 'Très difficile', short: 'La marge devient mince.', cue: 'L\'effort est très difficile.', behav: 'Ta forme peut commencer à se dégrader si tu pousses trop.', official: 'Le score est utile pour calibrer la charge et garder des répétitions propres.', cues: ['Tu peux faire peu de répétitions de plus.', 'Tu réponds par mots courts.', 'Tu dois protéger la qualité du mouvement.'], qualities: ['très dur', 'limite', 'serré'], anchor: 'Mon repère : il reste peut-être 2 répétitions propres.' },
  { v: 8, label: 'Presque maximal', short: 'Très proche du maximum.', cue: 'Le mouvement demande un engagement quasi total.', behav: 'La technique demande toute ton attention.', official: 'Ce niveau est rarement nécessaire en rééducation précoce sans consigne précise.', cues: ['La réserve est très faible.', 'Tu ne pourrais pas tenir ce niveau longtemps.', 'Le contrôle devient fragile.'], qualities: ['quasi max', 'très lourd', 'intense'], anchor: 'Mon repère : je peux finir seulement si tout reste parfaitement aligné.' },
  { v: 9, label: 'Quasi maximal', short: 'Presque plus de marge.', cue: 'Tu es presque au maximum.', behav: 'La forme risque de casser si tu insistes.', official: 'Le score sert surtout à signaler une intensité très élevée.', cues: ['Tu peux difficilement ajouter une répétition propre.', 'La respiration est très haute.', 'La technique n\'a presque plus de marge.'], qualities: ['presque max', 'extrême', 'limite'], anchor: 'Mon repère : il reste peut-être 1 répétition, pas plus.' },
  { v: 10, label: 'Maximal', short: 'Tu ne peux pas en faire plus.', cue: 'C\'est ton effort maximal du moment.', behav: 'Le mouvement doit s\'arrêter.', official: 'Tu ne peux pas faire plus sans t\'arrêter ou casser la forme.', cues: ['Tu n\'as plus de réserve.', 'La forme n\'est plus fiable.', 'Le score indique une limite atteinte.'], qualities: ['maximal', 'échec', 'aucune marge'], anchor: 'Mon repère : aucune répétition propre en réserve.' },
];

const SCALE_REFERENCE = {
  pain: {
    title: 'Comment lire la douleur pendant la rééducation',
    subtitle: 'Échelle numérique de douleur 0-10',
    source: 'Base clinique simplifiée issue d\'une échelle numérique de douleur 0-10. En pratique, 1 à 3 est souvent léger, 4 à 6 modéré, 7 à 10 sévère.',
    notes: [
      'Une douleur n\'est pas toujours un signal de dommage. Ce qui compte, c\'est aussi comment elle évolue pendant et après l\'exercice.',
      'Regarde si elle monte vite, si elle change de qualité, ou si elle reste élevée longtemps après la séance.',
      'Si la douleur grimpe brutalement, devient très différente, ou bloque clairement le mouvement, note-le dans ton suivi.',
    ],
  },
  effort: {
    title: 'Comment lire l\'effort pendant les exercices',
    subtitle: 'Borg CR10 / effort perçu 1-10',
    source: 'Base clinique simplifiée issue de Borg CR10 pour l\'effort perçu. Le score aide à décrire à quel point l\'exercice est facile, difficile, ou maximal pour toi.',
    notes: [
      'Un effort 5 à 7/10 peut être normal sur des exercices de renforcement. Le bon score dépend de l\'objectif de l\'exercice.',
      'Si ta forme commence à se dégrader, si tu retiens ton souffle, ou si tu perds le contrôle du mouvement, l\'effort est peut-être trop haut.',
      'Le chiffre est utile s\'il t\'aide à décrire ta marge : combien de répétitions propres il te reste vraiment.',
    ],
  },
};

window.PAIN_LEXICON = PAIN_LEXICON;
window.EFFORT_LEXICON = EFFORT_LEXICON;
window.SCALE_REFERENCE = SCALE_REFERENCE;

function getScaleLevels(kind) {
  return kind === 'pain'
    ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
}

function createEmptyScaleVocabulary() {
  return { pain: {}, effort: {} };
}

function sanitizeScaleOverride(raw) {
  if (!raw || typeof raw !== 'object') return {};

  const next = {};
  ['label', 'shortText', 'anchorText', 'emoji', 'mediaUrl'].forEach((field) => {
    if (typeof raw[field] !== 'string') return;
    const cleaned = raw[field];
    if (cleaned !== '') next[field] = cleaned;
  });

  return next;
}

function normalizeScaleVocabulary(vocabulary) {
  const next = createEmptyScaleVocabulary();
  if (!vocabulary || typeof vocabulary !== 'object') return next;

  ['pain', 'effort'].forEach((kind) => {
    const source = vocabulary[kind];
    if (!source || typeof source !== 'object') return;

    getScaleLevels(kind).forEach((level) => {
      const override = sanitizeScaleOverride(source[level] || source[String(level)]);
      if (Object.keys(override).length) {
        next[kind][String(level)] = override;
      }
    });
  });

  return next;
}

function getDefaultScaleEntry(kind, value) {
  const lex = kind === 'pain' ? PAIN_LEXICON : EFFORT_LEXICON;
  return lex.find((entry) => entry.v === value) || lex[0];
}

function getScaleOverride(kind, value, vocabulary) {
  const normalized = normalizeScaleVocabulary(vocabulary);
  return normalized[kind][String(value)] || {};
}

function applyScaleOverride(entry, override) {
  if (!override || !Object.keys(override).length) return entry;

  return {
    ...entry,
    label: override.label || entry.label,
    short: override.shortText || entry.short,
    anchor: override.anchorText || entry.anchor,
    emoji: override.emoji || entry.emoji || '',
    mediaUrl: override.mediaUrl || entry.mediaUrl || '',
  };
}

// Color helpers
function painColor(v) {
  if (v <= 2) return T.sage;
  if (v <= 5) return T.amber;
  if (v <= 7) return T.accent;
  return T.danger;
}
function effortColor(v) {
  if (v <= 3) return T.sage;
  if (v <= 6) return T.sky;
  if (v <= 8) return T.amber;
  return T.accent;
}
window.painColor = painColor;
window.effortColor = effortColor;

function getScaleLexicon(kind, vocabulary) {
  const base = kind === 'pain' ? PAIN_LEXICON : EFFORT_LEXICON;
  const normalized = vocabulary ? normalizeScaleVocabulary(vocabulary) : null;

  if (!normalized) return base;

  return base.map((entry) =>
    applyScaleOverride(entry, normalized[kind][String(entry.v)])
  );
}

function getScaleReference(kind) {
  return SCALE_REFERENCE[kind === 'pain' ? 'pain' : 'effort'];
}

function getScaleEntry(kind, value, vocabulary) {
  return applyScaleOverride(
    getDefaultScaleEntry(kind, value),
    getScaleOverride(kind, value, vocabulary)
  );
}

function getScaleColor(kind, value) {
  return kind === 'pain' ? painColor(value) : effortColor(value);
}

function withScaleVocabularyLevel(vocabulary, kind, value, patch) {
  const next = normalizeScaleVocabulary(vocabulary);
  const levelKey = String(value);
  const current = next[kind][levelKey] || {};
  const merged = sanitizeScaleOverride({ ...current, ...patch });

  if (Object.keys(merged).length) {
    next[kind][levelKey] = merged;
  } else {
    delete next[kind][levelKey];
  }

  return next;
}

function clearScaleVocabularyLevel(vocabulary, kind, value) {
  const next = normalizeScaleVocabulary(vocabulary);
  delete next[kind][String(value)];
  return next;
}

window.getScaleLexicon = getScaleLexicon;
window.getScaleReference = getScaleReference;
window.getScaleEntry = getScaleEntry;
window.getScaleColor = getScaleColor;
window.getScaleLevels = getScaleLevels;
window.getDefaultScaleEntry = getDefaultScaleEntry;
window.getScaleOverride = getScaleOverride;
window.createEmptyScaleVocabulary = createEmptyScaleVocabulary;
window.normalizeScaleVocabulary = normalizeScaleVocabulary;
window.withScaleVocabularyLevel = withScaleVocabularyLevel;
window.clearScaleVocabularyLevel = clearScaleVocabularyLevel;

function ScaleMediaPreview({ src, alt, height = 112, radius = 18 }) {
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || failed) return null;

  return (
    <div style={{
      overflow: 'hidden',
      borderRadius: radius,
      border: `0.5px solid ${T.line}`,
      background: T.paper,
      boxShadow: '0 10px 26px rgba(18,52,59,0.06)',
    }}>
      <img
        src={src}
        alt={alt}
        onError={() => setFailed(true)}
        style={{
          display: 'block',
          width: '100%',
          height,
          objectFit: 'cover',
          background: T.paper2,
        }}
      />
    </div>
  );
}

window.ScaleMediaPreview = ScaleMediaPreview;

// ─────────────────────────────────────────────────────────────
// Reusable scale card with patient-language description per level
// ─────────────────────────────────────────────────────────────
function ScaleCard({ kind, value, onChange, vocabulary }) {
  const isPain = kind === 'pain';
  const lex = getScaleLexicon(kind, vocabulary);
  const min = isPain ? 0 : 1;
  const entry = getScaleEntry(kind, value, vocabulary);
  const color = getScaleColor(kind, value);
  const [showAll, setShowAll] = React.useState(false);

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 500, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, minWidth: 0 }}>
          {isPain ? 'Douleur au genou' : 'Effort ressenti'}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexShrink: 0 }}>
          <span style={{ fontFamily: T.mono, fontSize: 13, color, whiteSpace: 'nowrap' }}>{value}/10</span>
          <div onClick={()=>setShowAll(!showAll)} style={{
            fontFamily: T.sans, fontSize: 12, color: T.ink3, textTransform: 'uppercase',
            letterSpacing: 0.4, cursor: 'pointer', padding: '2px 8px', borderRadius: 99,
            background: T.paper2, border: `0.5px solid ${T.line}`, whiteSpace: 'nowrap',
          }}>{showAll ? 'Fermer' : 'Échelle'}</div>
        </div>
      </div>

      {/* Slider */}
      <input type="range" min={min} max="10" value={value} onChange={e=>onChange(+e.target.value)}
        style={{ width: '100%', marginTop: 10, accentColor: color }}/>

      {/* Tick row */}
      <div style={{ marginTop: -4, display: 'flex', justifyContent: 'space-between',
        fontFamily: T.mono, fontSize: 9, color: T.ink3, padding: '0 2px',
      }}>
        {lex.filter(x => x.v % 2 === (isPain ? 0 : 1)).map(x => (
          <span key={x.v}>{x.v}</span>
        ))}
      </div>

      {/* Current level description card */}
      <div style={{
        marginTop: 12, padding: '12px 14px', borderRadius: 14,
        background: T.paper2, border: `0.5px solid ${T.line}`,
        borderLeft: `3px solid ${color}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {entry.emoji && (
            <span style={{ fontSize: 18, lineHeight: 1 }}>{entry.emoji}</span>
          )}
          <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color }}>
            {entry.label}
          </div>
        </div>
        <div style={{ marginTop: 4, fontFamily: T.sans, fontSize: 13, color: T.ink, lineHeight: 1.4 }}>
          {entry.short || entry.cue}
        </div>
        <div style={{ marginTop: 4, fontFamily: T.sans, fontSize: 13, color: T.ink2, fontStyle: 'italic', lineHeight: 1.4 }}>
          {entry.behav}
        </div>
      </div>

      {/* Full ladder, expanded on click */}
      {showAll && (
        <>
          <ScaleMeaningPanel kind={kind} entry={entry} color={color}/>
          <ScaleLadder kind={kind} value={value} onChange={onChange} vocabulary={vocabulary}/>
        </>
      )}
    </div>
  );
}

function ScaleMeaningPanel({ kind, entry, color }) {
  const reference = getScaleReference(kind);

  return (
    <div style={{ marginTop: 10, padding: 14, borderRadius: 16, background: T.paper, border: `0.5px solid ${T.line}` }}>
      <div style={{ fontFamily: T.sans, fontSize: 12, letterSpacing: 0.4, textTransform: 'uppercase', color: T.ink3 }}>
        {reference.subtitle}
      </div>
      <div style={{ marginTop: 8, fontFamily: T.sans, fontSize: 13, lineHeight: 1.45, color: T.ink }}>
        {entry.official || entry.cue}
      </div>

      <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {(entry.cues || []).slice(0, 3).map((cue, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontFamily: T.sans, fontSize: 13, color: T.ink2, lineHeight: 1.35 }}>
            <Icons.check size={12} stroke={color}/>
            <span>{cue}</span>
          </div>
        ))}
      </div>

      {entry.qualities && (
        <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {entry.qualities.map(q => (
            <span key={q} style={{
              padding: '4px 8px', borderRadius: 999, background: T.paper2,
              border: `0.5px solid ${T.line}`, fontFamily: T.sans, fontSize: 12, color: T.ink2,
            }}>{q}</span>
          ))}
        </div>
      )}

      {entry.anchor && (
        <div style={{
          marginTop: 12, padding: '10px 12px', borderRadius: 13,
          background: T.accentSoft + '66', border: `0.5px solid ${T.accentSoft}`,
          fontFamily: T.sans, fontSize: 13, lineHeight: 1.4, color: T.accentInk,
        }}>
          {entry.emoji ? <span style={{ marginRight: 8, fontSize: 17 }}>{entry.emoji}</span> : null}
          {entry.anchor}
        </div>
      )}
    </div>
  );
}

function ScaleLadder({ kind, value, onChange, vocabulary }) {
  const lex = getScaleLexicon(kind, vocabulary);

  return (
    <div style={{ marginTop: 10, borderRadius: 14, background: T.paper2,
      border: `0.5px solid ${T.line}`, overflow: 'hidden',
    }}>
      {lex.map((x, i) => {
        const c = getScaleColor(kind, x.v);
        const active = x.v === value;
        return (
          <div key={x.v} onClick={()=>onChange(x.v)} style={{
            padding: '10px 12px', display: 'flex', gap: 10, alignItems: 'flex-start',
            borderBottom: i === lex.length-1 ? 'none' : `0.5px solid ${T.line}`,
            background: active ? T.paper : 'transparent', cursor: 'pointer',
          }}>
            <div style={{
              width: 26, height: 26, borderRadius: 7, flexShrink: 0,
              background: active ? c : 'transparent',
              border: `1px solid ${c}`, color: active ? T.paper : c,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: T.mono, fontSize: 12, fontWeight: 600,
            }}>{x.v}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.ink }}>{x.label}</div>
              <div style={{ marginTop: 1, fontFamily: T.sans, fontSize: 13, color: T.ink2, lineHeight: 1.35 }}>{x.short || x.cue}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

window.ScaleCard = ScaleCard;
