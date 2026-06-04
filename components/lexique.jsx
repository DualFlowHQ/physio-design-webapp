// Lexique — searchable medical glossary.
// UX move: terms grouped by relevance to user's current rehab phase,
// with related terms surfaced on detail.

const LEXIQUE_TERMS = [
  {
    id: 'hanche', term: 'Hanche', long: 'Articulation coxo-fémorale',
    category: 'Anatomie', phase: 'all', relevant: true,
    short: 'Articulation entre le bassin et le fémur, très sollicitée à la marche.',
    full: 'La hanche relie le bassin à la cuisse. Elle doit combiner mobilité et stabilité pour marcher, monter les escaliers, s’accroupir et produire de la force sans compensation.',
    related: ['abducteurs', 'fessiers', 'amplitude'],
    important: true,
  },
  {
    id: 'abducteurs', term: 'Abducteurs', long: 'Muscles abducteurs de hanche',
    category: 'Anatomie', phase: 'all', relevant: true,
    short: 'Muscles qui éloignent la jambe du corps et stabilisent le bassin.',
    full: 'Les abducteurs de hanche, dont le moyen fessier, aident à garder le bassin stable pendant la marche. Les renforcer peut réduire les compensations quand la hanche est douloureuse.',
    related: ['hanche', 'fessiers'],
  },
  {
    id: 'proprioception', term: 'Proprioception',
    category: 'Rééducation', phase: 'mid', relevant: true,
    short: 'Sens qui permet à ton corps de savoir où il se trouve dans l\'espace.',
    full: 'Capacité du système nerveux à percevoir la position et le mouvement des articulations sans regarder. Pour la hanche, elle aide à doser la marche, l’appui et les exercices sans se crisper.',
    related: ['equilibre', 'hanche'],
    important: true,
  },
  {
    id: 'fessiers', term: 'Fessiers',
    category: 'Anatomie', phase: 'all', relevant: true,
    short: 'Groupe musculaire clé pour stabiliser et étendre la hanche.',
    full: 'Les fessiers participent à la stabilité du bassin, à la marche et aux mouvements comme le pont ou le squat. Les activer progressivement aide à reprendre de la force sans tout mettre dans le bas du dos.',
    related: ['abducteurs', 'pont-fessier'],
  },
  {
    id: 'pont-fessier', term: 'Pont fessier',
    category: 'Anatomie', phase: 'all',
    short: 'Exercice ajouté au programme depuis le 8 mai.',
    full: 'Le pont fessier renforce surtout les fessiers et l’extension de hanche. Le repère principal est de monter le bassin sans pincer la hanche et sans creuser exagérément le bas du dos.',
    related: ['fessiers', 'hanche'],
  },
  {
    id: 'douleur-score', term: 'Douleur 0-10', long: 'Échelle numérique de douleur',
    category: 'Mesure', phase: 'all', relevant: true,
    short: 'Repère pour décrire l\'intensité de la douleur et sa réaction après l\'exercice.',
    full: 'L\'échelle 0-10 aide à nommer ce que tu ressens sans poser un diagnostic. Le chiffre compte, mais son évolution compte autant : est-ce que la douleur monte pendant l\'exercice, redescend après, ou reste plus haute le lendemain ?',
    related: ['borg', 'rpe'],
    important: true,
  },
  {
    id: 'borg', term: 'Échelle de Borg',
    category: 'Mesure', phase: 'all', relevant: true,
    short: 'Échelle de 1 à 10 pour évaluer l\'effort ressenti.',
    full: 'Outil simple pour mesurer subjectivement l\'intensité d\'un effort. 1 = très facile, 10 = effort maximal. Elle s\'utilise en complément des données objectives (poids, séries) pour ajuster la charge en temps réel selon la fatigue du jour.',
    related: ['rpe', 'charge'],
  },
  {
    id: 'rpe', term: 'RPE', long: 'Rate of Perceived Exertion',
    category: 'Mesure', phase: 'all',
    short: 'Synonyme anglais de l\'échelle de Borg.',
    full: 'Rate of Perceived Exertion. Concept identique à l\'échelle de Borg. Largement utilisé en préparation physique pour ajuster les charges en fonction de la fatigue plutôt que selon un programme fixe.',
    related: ['borg'],
  },
  {
    id: 'effort-percu', term: 'Effort perçu', long: 'Borg CR10',
    category: 'Mesure', phase: 'all', relevant: true,
    short: 'Score de 1 à 10 pour décrire à quel point un exercice est facile, difficile, ou maximal.',
    full: 'L\'effort perçu complète les séries, répétitions et charges. Il aide à savoir si une séance était trop facile, bien dosée, ou trop proche de la limite pour garder une technique propre.',
    related: ['borg', 'rpe', 'charge'],
    important: true,
  },
  {
    id: 'tempo', term: 'Tempo',
    category: 'Entraînement', phase: 'all', relevant: true,
    short: 'Rythme d\'exécution d\'un mouvement, en secondes.',
    full: 'Notation à 3 ou 4 chiffres : excentrique (descente) - pause basse - concentrique (montée) - pause haute. Exemple : 3-1-1 = descendre en 3 s, tenir 1 s, remonter en 1 s. Un tempo lent augmente le temps sous tension et favorise le contrôle.',
    related: ['excentrique', 'concentrique'],
  },
  {
    id: 'excentrique', term: 'Excentrique',
    category: 'Entraînement', phase: 'mid',
    short: 'Phase où le muscle s\'allonge sous tension.',
    full: 'Contraction où le muscle s\'allonge tout en résistant à une charge — par exemple la descente d\'un squat. Particulièrement efficace pour gagner en force et reconstruire un tendon, mais provoque davantage de courbatures.',
    related: ['concentrique', 'tempo'],
  },
  {
    id: 'concentrique', term: 'Concentrique',
    category: 'Entraînement', phase: 'mid',
    short: 'Phase où le muscle se raccourcit en se contractant.',
    full: 'Contraction où le muscle se raccourcit pour produire un mouvement — par exemple la remontée d\'un squat. C\'est la phase « positive » de l\'exercice.',
    related: ['excentrique', 'tempo'],
  },
  {
    id: 'amplitude', term: 'Amplitude articulaire', long: 'ROM',
    category: 'Mesure', phase: 'early',
    short: 'L\'angle maximal que peut atteindre une articulation.',
    full: 'Range of motion. Mesurée en degrés, elle indique la mobilité d\'une articulation. Pour la hanche, l’objectif est surtout une amplitude confortable, utile pour marcher, s’accroupir et faire les exercices sans compensation.',
    related: ['extension', 'flexion'],
  },
  {
    id: 'extension', term: 'Extension',
    category: 'Mouvement', phase: 'early',
    short: 'Le fait d’ouvrir la hanche vers l’arrière.',
    full: 'Mouvement qui amène la cuisse vers l’arrière par rapport au bassin. Il est travaillé dans le pont fessier et dans la marche, sans chercher à forcer si la douleur pince.',
    related: ['flexion', 'amplitude'],
  },
  {
    id: 'flexion', term: 'Flexion',
    category: 'Mouvement', phase: 'early',
    short: 'Le fait de monter la cuisse vers le bassin.',
    full: 'Mouvement utilisé dans la montée de genou avec élastique. Le but est de lever la cuisse sans basculer le bassin ni augmenter franchement la douleur.',
    related: ['extension', 'amplitude'],
  },
  {
    id: 'pliometrie', term: 'Pliométrie',
    category: 'Entraînement', phase: 'late',
    short: 'Exercices de saut et rebond explosif.',
    full: 'Méthode d\'entraînement utilisant le cycle étirement-raccourcissement (ressort musculaire). Dans ce plan, elle appartient plutôt à une phase future si la douleur, la marche et la force sont validées.',
    related: ['retour-sport'],
  },
  {
    id: 'atrophie', term: 'Atrophie',
    category: 'Pathologie', phase: 'early',
    short: 'Diminution du volume d\'un muscle.',
    full: 'Perte de masse musculaire due à l\'inactivité ou l\'inhibition neurologique post-chirurgie. Visible dès les premiers jours, elle est la première cible de la rééducation par activation et électrostimulation.',
    related: ['fessiers'],
  },
  {
    id: 'epanchement', term: 'Épanchement',
    category: 'Pathologie', phase: 'early',
    short: 'Accumulation de liquide dans une articulation.',
    full: 'Présence anormale de liquide synovial ou de sang dans une articulation. C’est un signe clinique à surveiller avec un professionnel si la zone devient gonflée, chaude ou nettement plus douloureuse.',
    related: ['hanche'],
  },
];

window.LEXIQUE_TERMS = LEXIQUE_TERMS;

function LexiqueScreen({ onBack, scaleVocabulary, onScaleVocabularyChange, currentPainScore }) {
  const [score, setScore] = React.useState(Number.isFinite(currentPainScore) ? currentPainScore : 3);
  const [showNotes, setShowNotes] = React.useState(false);
  const reference = window.getScaleReference('pain');

  return (
    <div style={{ background: T.bg, minHeight: '100%', paddingBottom: 120 }}>
      {/* Top */}
      <div style={{ padding: '60px 16px 8px', display: 'flex', gap: 12, alignItems: 'center' }}>
        <div onClick={onBack} style={{
          width: 40, height: 40, borderRadius: 999, background: T.paper, border: `0.5px solid ${T.line}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}><Icons.chevL size={18} stroke={T.ink2}/></div>
        <div style={{ flex: 1 }}/>
      </div>

      <div style={{ padding: '8px 24px 0' }}>
        <div style={{ fontFamily: T.sans, fontSize: 12, letterSpacing: 0.5, textTransform: 'uppercase', color: T.ink3 }}>
          Vocabulaire de la douleur
        </div>
        <div style={{ marginTop: 6, fontFamily: T.display, fontSize: 36, lineHeight: 1.05, color: T.ink }}>
          Comprendre ce que<br/><span style={{ fontStyle: 'italic', color: T.accentInk }}>je ressens.</span>
        </div>
        <div style={{ marginTop: 10, fontFamily: T.sans, fontSize: 14, lineHeight: 1.45, color: T.ink2 }}>
          Repères 0-10, sensations et signaux à noter.
        </div>

        <div 
          onClick={() => setShowNotes(!showNotes)}
          style={{
            marginTop: 14, padding: '12px 16px', borderRadius: 16, background: T.paper,
            border: `0.5px solid ${T.line}`, display: 'flex', gap: 10, alignItems: 'center',
            fontFamily: T.sans, fontSize: 13, color: T.ink, cursor: 'pointer', fontWeight: 500
          }}>
          <Icons.info size={16} stroke={T.ink3}/>
          <span style={{ flex: 1 }}>Comment utiliser cette échelle ?</span>
          <Icons.chevD size={16} stroke={T.ink3} style={{ transform: showNotes ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}/>
        </div>

        {showNotes && (
          <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {reference.notes.map((note, i) => (
              <div key={i} style={{
                padding: '10px 12px', borderRadius: 14, background: T.paper,
                border: `0.5px solid ${T.line}`, display: 'flex', gap: 9, alignItems: 'flex-start',
                fontFamily: T.sans, fontSize: 12, color: T.ink2, lineHeight: 1.4,
              }}>
                <span style={{color: T.accentInk}}>•</span>
                <span>{note}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <ScaleReferenceSection
        kind="pain"
        score={score}
        onScoreChange={setScore}
        scaleVocabulary={scaleVocabulary}
        onScaleVocabularyChange={onScaleVocabularyChange}
      />
    </div>
  );
}


function ScaleReferenceSection({ kind, score, onScoreChange, scaleVocabulary, onScaleVocabularyChange }) {
  const [isEditing, setIsEditing] = React.useState(false);
  const lex = window.getScaleLexicon(kind, scaleVocabulary);
  const reference = window.getScaleReference(kind);
  const entry = window.getScaleEntry(kind, score, scaleVocabulary);
  const color = window.getScaleColor(kind, score);
  const scaleOptions = window.getScaleLevels(kind);

  return (
    <div style={{ margin: '22px 16px 0', padding: 16, borderRadius: 24, background: T.paper, border: `0.5px solid ${T.line}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontFamily: T.sans, fontSize: 12, letterSpacing: 0.5, textTransform: 'uppercase', color: T.ink3 }}>
            Douleur
          </div>
          <div style={{ marginTop: 5, fontFamily: T.display, fontSize: 23, lineHeight: 1.1, color: T.ink }}>
            Tes repères de douleur
          </div>
        </div>
        <div onClick={() => setIsEditing(!isEditing)} style={{
          width: 36, height: 36, borderRadius: 999, background: isEditing ? T.accentSoft + '33' : T.paper2, 
          border: `0.5px solid ${isEditing ? T.accentSoft : T.line}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          color: isEditing ? T.accentInk : T.ink2
        }}>
          <Icons.edit size={16} stroke={isEditing ? T.accentInk : T.ink2}/> 
        </div>
      </div>

      <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 5, paddingBottom: 4 }}>
        {scaleOptions.map(v => {
          const active = v === score;
          const c = window.getScaleColor(kind, v);
          return (
            <div key={v} onClick={()=>onScoreChange(v)} style={{
              width: 34, height: 34, borderRadius: 12, flexShrink: 0, cursor: 'pointer',
              background: active ? c : T.paper,
              color: active ? T.paper : c,
              border: `0.5px solid ${active ? c : T.line}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: T.mono, fontSize: 12, fontWeight: 600,
            }}>{v}</div>
          );
        })}
      </div>

      <div style={{ marginTop: 14, padding: 14, borderRadius: 18, background: T.paper2 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 18, background: color, color: T.paper,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <div style={{ fontFamily: T.display, fontSize: 28, lineHeight: 1 }}>{score}</div>
            <div style={{ fontFamily: T.mono, fontSize: 12, opacity: 0.84 }}>/10</div>
          </div>
          <div style={{ flex: 1, minWidth: 0, wordBreak: 'break-word' }}>
            <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              {entry.emoji ? <span style={{ fontSize: 18, lineHeight: 1 }}>{entry.emoji}</span> : null}
              <div style={{ fontFamily: T.sans, fontSize: 16, fontWeight: 600, color: T.ink }}>
                {entry.label}
              </div>
            </div>
            <div style={{ marginTop: 5, fontFamily: T.sans, fontSize: 13, color: T.ink2, lineHeight: 1.45 }}>
              {entry.official || entry.cue}
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {(entry.cues || []).map((cue, i) => (
          <div key={i} style={{ display: 'flex', gap: 9, alignItems: 'flex-start', fontFamily: T.sans, fontSize: 13, color: T.ink2, lineHeight: 1.4 }}>
            <Icons.check size={13} stroke={color}/>
            <span>{cue}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {(entry.qualities || []).map(q => (
          <span key={q} style={{
            padding: '5px 9px', borderRadius: 999, background: T.paper2,
            border: `0.5px solid ${T.line}`, fontFamily: T.sans, fontSize: 12, color: T.ink2,
          }}>{q}</span>
        ))}
      </div>

      <div style={{
        marginTop: 14, padding: '16px', borderRadius: 16,
        background: `linear-gradient(135deg, ${color}, ${color}dd)`, color: '#ffffff',
        fontFamily: T.sans, fontSize: 14, fontWeight: 500, lineHeight: 1.45,
        boxShadow: `0 4px 12px ${color}55`,
        display: 'flex', gap: 10, alignItems: 'flex-start'
      }}>
        {entry.emoji ? <span style={{ fontSize: 20 }}>{entry.emoji}</span> : null}
        <span style={{ flex: 1 }}>{entry.anchor}</span>
      </div>

      {isEditing && (
        <ScaleVocabularyEditor
          kind={kind}
          score={score}
          entry={entry}
          color={color}
          vocabulary={scaleVocabulary}
          onVocabularyChange={onScaleVocabularyChange}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
}

function ScaleVocabularyEditor({ kind, score, entry, color, vocabulary, onVocabularyChange, onClose }) {
  const override = window.getScaleOverride(kind, score, vocabulary);
  const baseEntry = window.getDefaultScaleEntry(kind, score);
  const MediaPreview = window.ScaleMediaPreview;
  const hasCustom = Object.keys(override).length > 0;

  const updateField = (field, value) => {
    if (!onVocabularyChange) return;
    onVocabularyChange(window.withScaleVocabularyLevel(vocabulary, kind, score, { [field]: value }));
  };

  const resetLevel = () => {
    if (!onVocabularyChange) return;
    onVocabularyChange(window.clearScaleVocabularyLevel(vocabulary, kind, score));
  };

  return (
    <div style={{ marginTop: 16, padding: 14, borderRadius: 18, background: T.paper2, border: `0.5px solid ${T.line}` }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <div style={{ fontFamily: T.sans, fontSize: 12, letterSpacing: 0.4, textTransform: 'uppercase', color: T.ink3 }}>
            Personnaliser ce niveau
          </div>
          <div style={{ marginTop: 4, fontFamily: T.sans, fontSize: 14, fontWeight: 600, color: T.ink }}>
            Niveau {score}/10
          </div>
        </div>
        {hasCustom ? (
          <div
            onClick={resetLevel}
            style={{
              padding: '8px 12px',
              borderRadius: 999,
              background: T.paper,
              border: `0.5px solid ${T.line}`,
              fontFamily: T.sans,
              fontSize: 12,
              color: T.ink2,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            Réinitialiser
          </div>
        ) : null}
      </div>

      <div style={{ marginTop: 12, padding: 14, borderRadius: 16, background: T.paper, border: `0.5px solid ${T.line}` }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 16,
            background: color,
            color: T.paper,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontFamily: T.display,
            fontSize: 24,
          }}>
            {entry.emoji || score}
          </div>
          <div style={{ flex: 1, minWidth: 0, wordBreak: 'break-word' }}>
            <div style={{ fontFamily: T.sans, fontSize: 15, fontWeight: 600, color: T.ink }}>
              {entry.label}
            </div>
            <div style={{ marginTop: 4, fontFamily: T.sans, fontSize: 13, lineHeight: 1.45, color: T.ink2 }}>
              {entry.short || entry.cue}
            </div>
            <div style={{ marginTop: 8, fontFamily: T.sans, fontSize: 13, lineHeight: 1.45, color: T.accentInk }}>
              {entry.anchor}
            </div>
          </div>
        </div>

        {entry.mediaUrl ? (
          <div style={{ marginTop: 12 }}>
            <MediaPreview src={entry.mediaUrl} alt={`Repère visuel ${kind} ${score}/10`} height={132} radius={16} />
          </div>
        ) : null}
      </div>

      <div style={{ marginTop: 12, display: 'grid', gap: 10 }}>
        <LabelledInput
          label="Emoji"
          value={override.emoji || ''}
          placeholder="🙂"
          onChange={(value) => updateField('emoji', value)}
        />
        <LabelledInput
          label="Titre du niveau"
          value={override.label || ''}
          placeholder={baseEntry.label}
          onChange={(value) => updateField('label', value)}
        />
        <LabelledTextarea
          label="Texte court"
          value={override.shortText || ''}
          placeholder={baseEntry.short || baseEntry.cue}
          rows={2}
          onChange={(value) => updateField('shortText', value)}
        />
        <LabelledTextarea
          label="Repère personnel"
          value={override.anchorText || ''}
          placeholder={baseEntry.anchor}
          rows={3}
          onChange={(value) => updateField('anchorText', value)}
        />
        <LabelledInput
          label="Image ou GIF (URL)"
          value={override.mediaUrl || ''}
          placeholder="https://..."
          onChange={(value) => updateField('mediaUrl', value)}
        />
      </div>

      <div style={{ marginTop: 10, fontFamily: T.sans, fontSize: 12, color: T.ink3, lineHeight: 1.45 }}>
        Laisse un champ vide pour garder la version clinique par défaut.
      </div>

      <div
        onClick={onClose}
        style={{
          marginTop: 16, padding: '14px 16px', borderRadius: 16, background: color,
          color: '#fff', fontFamily: T.sans, fontSize: 15, fontWeight: 600,
          display: 'flex', justifyContent: 'center', cursor: 'pointer',
          boxShadow: `0 4px 12px ${color}44`
        }}
      >
        Sauvegarder et fermer
      </div>
    </div>
  );
}

function LabelledInput({ label, value, placeholder, onChange }) {
  return (
    <label style={{ display: 'block' }}>
      <div style={{ marginBottom: 6, fontFamily: T.sans, fontSize: 12, letterSpacing: 0.4, textTransform: 'uppercase', color: T.ink3 }}>
        {label}
      </div>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          height: 42,
          borderRadius: 14,
          border: `0.5px solid ${T.line}`,
          background: T.paper,
          padding: '0 12px',
          outline: 'none',
          fontFamily: T.sans,
          fontSize: 14,
          color: T.ink,
        }}
      />
    </label>
  );
}

function LabelledTextarea({ label, value, placeholder, rows, onChange }) {
  return (
    <label style={{ display: 'block' }}>
      <div style={{ marginBottom: 6, fontFamily: T.sans, fontSize: 12, letterSpacing: 0.4, textTransform: 'uppercase', color: T.ink3 }}>
        {label}
      </div>
      <textarea
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          borderRadius: 14,
          border: `0.5px solid ${T.line}`,
          background: T.paper,
          padding: '10px 12px',
          outline: 'none',
          resize: 'vertical',
          fontFamily: T.sans,
          fontSize: 14,
          lineHeight: 1.45,
          color: T.ink,
        }}
      />
    </label>
  );
}

window.LexiqueScreen = LexiqueScreen;
