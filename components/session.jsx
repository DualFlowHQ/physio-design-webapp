// Session flow — guided, one-exercise-at-a-time
// UX improvement: the effort + pain capture is a single dual-slider after each set,
// not two screens. Rest timer auto-runs between sets. "Skip" and "Swap" surfaced.

function SessionScreen({ onExit, state, setState }) {
  const s = state.session;
  const sessionExercises = getActiveSessionExercises(s);
  const ex = sessionExercises[s.exerciseIdx] || sessionExercises[0];
  const totalSets = ex.sets;
  const setIdx = s.setIdx;

  // Stages: "doing" (rep counter), "feedback" (effort+pain), "rest" (timer)
  const stage = s.stage;

  return (
    <div style={{ background: T.bg, minHeight: '100%', position: 'relative', paddingBottom: 100 }}>
      <div style={{ padding: '60px 16px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          onClick={onExit}
          style={{
            width: 40,
            height: 40,
            borderRadius: 999,
            background: T.paper,
            border: `0.5px solid ${T.line}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <Icons.close size={18} stroke={T.ink2} />
        </div>
        <div style={{ flex: 1 }}>
          <ProgressBars current={s.exerciseIdx} total={sessionExercises.length} sets={sessionExercises.map((e) => e.sets)} doneSets={s.completedSets} />
        </div>
        <div style={{ fontFamily: T.mono, fontSize: 13, color: T.ink2, whiteSpace: 'nowrap', flexShrink: 0 }}>
          {s.exerciseIdx + 1}<span style={{ opacity: 0.5 }}>/</span>{sessionExercises.length}
        </div>
      </div>

      <div style={{ padding: '8px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <div style={{ fontFamily: T.sans, fontSize: 12, letterSpacing: 0.5, textTransform: 'uppercase', color: T.ink3 }}>
            Exercice {s.exerciseIdx + 1} · {ex.muscle}
          </div>
          <StagePill stage={stage} />
        </div>
        <div style={{ marginTop: 6, fontFamily: T.display, fontSize: 32, lineHeight: 1.1, letterSpacing: -0.3, color: T.ink }}>
          {ex.name}
        </div>
      </div>

      <ExerciseVisual ex={ex} />
      <SessionContextCard state={state} ex={ex} totalSets={totalSets} exercises={sessionExercises} />

      {stage === 'doing' && <DoingStage ex={ex} setIdx={setIdx} totalSets={totalSets} state={state} setState={setState} />}
      {stage === 'feedback' && <FeedbackStage state={state} setState={setState} exercises={sessionExercises} />}
      {stage === 'rest' && <RestStage state={state} setState={setState} ex={ex} />}
      {stage === 'done-exercise' && <DoneExerciseStage state={state} setState={setState} exercises={sessionExercises} />}
    </div>
  );
}

const EXERCISES = [
  { name: 'Squats au mur', muscle: 'Quadriceps', sets: 3, reps: 12, tempo: '3-1-1', load: 'Poids du corps', cue: 'Descends jusqu\'à 90° · dos bien plaqué' },
  { name: 'Extension de genou', muscle: 'Quadriceps', sets: 3, reps: 10, tempo: '2-0-2', load: '8 kg', cue: 'Contrôle la descente — pas de claquement' },
  { name: 'Step-up latéral', muscle: 'Fessiers · quadri', sets: 3, reps: 10, tempo: 'libre', load: '6 kg', cue: 'Monte par la jambe droite, pas par l\'élan' },
  { name: 'Pont fessier', muscle: 'Fessiers', sets: 3, reps: 15, tempo: '2-2-1', load: 'Bande', cue: 'Serre les fesses 2 s en haut' },
  { name: 'Fente arrière', muscle: 'Jambes', sets: 2, reps: 10, tempo: 'libre', load: '4 kg × 2', cue: 'Genou avant aligné avec la cheville' },
  { name: 'Étirement ischio', muscle: 'Étirement', sets: 2, reps: '~30 sec', tempo: '—', load: '—', cue: 'Respire, ne force pas' },
];
window.EXERCISES = EXERCISES;

function getActiveSessionExercises(session) {
  return Array.isArray(session.exercises) && session.exercises.length ? session.exercises : EXERCISES;
}

function getExerciseLogs(log, exerciseIdx) {
  return log.filter((entry) => entry.ex === exerciseIdx);
}

function getLastLog(log, exerciseIdx) {
  const entries = getExerciseLogs(log, exerciseIdx);
  return entries.length ? entries[entries.length - 1] : null;
}

function getExerciseAverages(log, exerciseIdx) {
  const entries = getExerciseLogs(log, exerciseIdx);
  if (!entries.length) return null;

  const effort = entries.reduce((sum, entry) => sum + entry.effort, 0) / entries.length;
  const pain = entries.reduce((sum, entry) => sum + entry.pain, 0) / entries.length;

  return {
    effort: effort.toFixed(1),
    pain: pain.toFixed(1),
    count: entries.length,
  };
}

function getPainSignal(value) {
  if (value <= 2) return { label: 'zone verte', text: 'signal tolérable', color: T.sage, bg: T.sageSoft };
  if (value <= 4) return { label: 'zone à surveiller', text: 'reste attentive à la suite', color: T.amber, bg: T.amberSoft };
  return { label: 'zone d\'alerte', text: 'à signaler si ça monte encore', color: T.danger, bg: '#FEE2E2' };
}

function getEffortSignal(value) {
  if (value <= 4) return { text: 'plutôt facile', color: T.sky, bg: T.skySoft };
  if (value <= 7) return { text: 'travail utile', color: T.accent, bg: T.accentSoft };
  return { text: 'très exigeant', color: T.amber, bg: T.amberSoft };
}

function getLoadOptions(ex) {
  const baseLoad = ex.load || 'Poids du corps';
  const kgMatch = String(baseLoad).match(/(\d+(?:[,.]\d+)?)\s*kg/i);

  if (kgMatch) {
    const kg = Number(kgMatch[1].replace(',', '.'));
    const lower = Math.max(0, kg - 2);
    return [`${lower} kg`, baseLoad, `${kg + 2} kg`];
  }

  if (/bande|élastique/i.test(baseLoad)) return ['aucune charge', 'bande légère', 'bande moyenne', 'bande forte'];
  if (/poids du corps/i.test(baseLoad)) return ['poids du corps', '+ charge légère', '+ charge modérée'];
  if (baseLoad === '—') return ['aucune', 'aide légère', 'aide marquée'];
  return [baseLoad, 'un peu moins', 'un peu plus'];
}

function getDefaultDifficulty(ex) {
  const baseLoad = ex.load || 'Poids du corps';
  return {
    load: baseLoad === '—' ? 'aucune' : baseLoad,
    band: /bande|élastique/i.test(baseLoad) ? 'léger' : 'aucun',
    stability: 'stable',
    rom: /90°/.test(ex.cue) ? '90°' : /étirement|extension|mobilité/i.test(ex.muscle) ? 'confortable' : 'complète',
  };
}

function getDifficultyFields(ex) {
  return [
    {
      key: 'load',
      label: 'Charge',
      helper: 'poids réel',
      options: getLoadOptions(ex),
    },
    {
      key: 'band',
      label: 'Élastique',
      helper: 'résistance',
      options: ['aucun', 'léger', 'moyen', 'fort'],
    },
    {
      key: 'stability',
      label: 'Stabilité',
      helper: 'support',
      options: ['stable', 'appui main', 'sans appui', 'surface instable'],
    },
    {
      key: 'rom',
      label: 'Amplitude',
      helper: 'range of motion',
      options: ['partielle', '60°', '90°', 'complète'],
    },
  ];
}

function formatDifficulty(difficulty) {
  if (!difficulty) return '';
  return [difficulty.load, difficulty.band !== 'aucun' ? `élastique ${difficulty.band}` : null, difficulty.stability, difficulty.rom]
    .filter(Boolean)
    .join(' · ');
}

function ProgressBars({ current, total, sets, doneSets }) {
  return (
    <div style={{ display: 'flex', gap: 4, height: 4 }}>
      {sets.map((nSets, i) => {
        const isCurrent = i === current;
        const isDone = i < current;
        return (
          <div
            key={i}
            style={{
              flex: nSets,
              height: 4,
              borderRadius: 99,
              overflow: 'hidden',
              background: T.line,
            }}
          >
            {(isCurrent || isDone) && (
              <div
                style={{
                  height: '100%',
                  width: isDone ? '100%' : `${(doneSets / nSets) * 100}%`,
                  background: T.accent,
                  transition: 'width .3s',
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function StagePill({ stage }) {
  const config = stage === 'doing'
    ? { label: 'En cours', bg: T.accentSoft, fg: T.accentInk }
    : stage === 'feedback'
      ? { label: 'Ressenti', bg: T.amberSoft, fg: T.amber }
      : stage === 'rest'
        ? { label: 'Repos', bg: T.sageSoft, fg: T.sage }
        : { label: 'Transition', bg: T.paper2, fg: T.ink3 };

  return (
    <div style={{ padding: '5px 9px', borderRadius: 999, background: config.bg, fontFamily: T.mono, fontSize: 11, color: config.fg }}>
      {config.label}
    </div>
  );
}

function SessionContextCard({ state, ex, totalSets, exercises }) {
  const s = state.session;
  const remainingExercises = exercises.length - s.exerciseIdx - 1;
  const setsLeftInExercise = Math.max(totalSets - s.setIdx, 0);
  const averages = getExerciseAverages(s.log, s.exerciseIdx);

  return (
    <div style={{ margin: '14px 16px 0', padding: 16, borderRadius: 22, background: T.paper, border: `0.5px solid ${T.line}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8 }}>
        <SessionMetric label="Repère" value={`${ex.sets} × ${ex.reps}`} />
      </div>
      <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <ContextChip label={`tempo ${ex.tempo}`} />
        <ContextChip label="viser un mouvement propre" />
      </div>
      {averages && (
        <div style={{ marginTop: 12, fontFamily: T.sans, fontSize: 13, lineHeight: 1.45, color: T.ink2 }}>
          Sur cet exercice: douleur moyenne <b style={{ color: T.ink }}>{averages.pain}/10</b> sur {averages.count} série{averages.count > 1 ? 's' : ''}.
        </div>
      )}
    </div>
  );
}

function SessionMetric({ label, value }) {
  return (
    <div style={{ padding: '10px 8px', borderRadius: 14, background: T.paper2, textAlign: 'center' }}>
      <div style={{ fontFamily: T.mono, fontSize: 15, color: T.ink }}>{value}</div>
      <div style={{ marginTop: 3, fontFamily: T.sans, fontSize: 11, lineHeight: 1.25, color: T.ink3 }}>{label}</div>
    </div>
  );
}

function ContextChip({ label }) {
  return (
    <div style={{ padding: '5px 9px', borderRadius: 999, background: T.paper2, border: `0.5px solid ${T.line}`, fontFamily: T.mono, fontSize: 11, color: T.ink3 }}>
      {label}
    </div>
  );
}

function ExerciseVisual({ ex }) {
  return (
    <div
      style={{
        margin: '18px 16px 0',
        borderRadius: 24,
        overflow: 'hidden',
        height: 200,
        background: `linear-gradient(135deg, ${T.paper2} 0%, ${T.accentSoft} 100%)`,
        position: 'relative',
        border: `0.5px solid ${T.line}`,
      }}
    >
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.25 }}>
        <defs>
          <pattern id="stripes" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
            <rect width="1" height="8" fill={T.ink3} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#stripes)" />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: T.mono, fontSize: 12, color: T.ink3, padding: '6px 10px', background: T.paper, borderRadius: 999, border: `0.5px solid ${T.line}` }}>
          [vidéo démo · {ex.name.toLowerCase()}]
        </div>
      </div>

    </div>
  );
}

function Chip({ label }) {
  return (
    <div
      style={{
        padding: '5px 10px',
        borderRadius: 999,
        background: T.paper,
        border: `0.5px solid ${T.line}`,
        fontFamily: T.mono,
        fontSize: 12,
        color: T.ink2,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </div>
  );
}

function DoingStage({ ex, setIdx, totalSets, state, setState }) {
  const targetReps = typeof ex.reps === 'number' ? ex.reps : null;
  const [reps, setReps] = React.useState(targetReps || 0);
  const [difficulty, setDifficulty] = React.useState(() => getDefaultDifficulty(ex));
  const completed = state.session.completedSets;

  React.useEffect(() => {
    setReps(targetReps || 0);
    setDifficulty(getDefaultDifficulty(ex));
  }, [ex.name]);

  const completeSet = () => {
    const repsDone = reps;
    setState({
      session: {
        ...state.session,
        stage: 'feedback',
        lastReps: repsDone,
        lastDifficulty: difficulty,
      },
    });
    setReps(0);
  };

  return (
    <div style={{ padding: '24px 16px 0' }}>
      <div style={{ padding: 20, borderRadius: 24, background: T.paper, border: `0.5px solid ${T.line}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
          <div style={{ fontFamily: T.sans, fontSize: 13, color: T.ink3, textTransform: 'uppercase', letterSpacing: 0.4, whiteSpace: 'nowrap' }}>
            Série {setIdx + 1} sur {totalSets}
          </div>
          <div style={{ fontFamily: T.mono, fontSize: 13, color: T.ink3, whiteSpace: 'nowrap', flexShrink: 0 }}>
            {completed} validée{completed > 1 ? 's' : ''} · cible {ex.reps}
          </div>
        </div>

        <div style={{ marginTop: 12, padding: '10px 12px', borderRadius: 16, background: T.paper2 }}>
          <div style={{ fontFamily: T.sans, fontSize: 13, color: T.ink3 }}>Repère d'exécution</div>
          <div style={{ marginTop: 3, fontFamily: T.sans, fontSize: 14, color: T.ink, lineHeight: 1.4 }}>
            « {ex.cue} »
          </div>
        </div>

        {targetReps ? (
          <div style={{ marginTop: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
            <TapBtn icon="-" onClick={() => setReps(Math.max(0, reps - 1))} />
            <div style={{ fontFamily: T.display, fontSize: 80, lineHeight: 1, color: T.ink, minWidth: 80, textAlign: 'center' }}>
              {reps}
            </div>
            <TapBtn icon="+" onClick={() => setReps(reps + 1)} highlight />
          </div>
        ) : (
          <div style={{ marginTop: 22, textAlign: 'center' }}>
            <InlineTimer duration={30} />
          </div>
        )}

        <DifficultyAdjustCard ex={ex} value={difficulty} onChange={setDifficulty} />

        <button
          onClick={completeSet}
          style={{
            marginTop: 22,
            width: '100%',
            height: 52,
            borderRadius: 999,
            border: 'none',
            background: T.accent,
            color: T.paper,
            fontFamily: T.sans,
            fontSize: 15,
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            cursor: 'pointer',
          }}
        >
          <Icons.check size={16} stroke={T.paper} />
          Série terminée
        </button>

      </div>
    </div>
  );
}

function DifficultyAdjustCard({ ex, value, onChange }) {
  const fields = getDifficultyFields(ex);
  const [visible, setVisible] = React.useState(false);
  const [openKey, setOpenKey] = React.useState(null);
  const openField = fields.find((field) => field.key === openKey);
  const summary = formatDifficulty(value);

  React.useEffect(() => {
    setVisible(false);
    setOpenKey(null);
  }, [ex.name]);

  const toggleVisible = () => {
    if (visible) setOpenKey(null);
    setVisible(!visible);
  };

  return (
    <div style={{ marginTop: 18, padding: 14, borderRadius: 20, background: `linear-gradient(150deg, ${T.paper2}, ${T.paper})`, border: `0.5px solid ${T.line}` }}>
      <button
        onClick={toggleVisible}
        style={{
          width: '100%',
          padding: 0,
          border: 'none',
          background: 'transparent',
          display: 'flex',
          justifyContent: 'space-between',
          gap: 12,
          alignItems: 'flex-start',
          textAlign: 'left',
          cursor: 'pointer',
        }}
      >
        <div>
          <div style={{ fontFamily: T.sans, fontSize: 12, letterSpacing: 0.4, textTransform: 'uppercase', color: T.ink3 }}>
            Difficulté réelle
          </div>
          <div style={{ marginTop: 4, fontFamily: T.sans, fontSize: 13, color: T.ink2, lineHeight: 1.35 }}>
            {visible ? 'Note ce que tu fais vraiment. Le suivi gardera le réglage avec douleur.' : summary}
          </div>
        </div>
        <div style={{ padding: '6px 9px', borderRadius: 999, background: T.accentSoft, fontFamily: T.mono, fontSize: 11, color: T.accentInk, whiteSpace: 'nowrap' }}>
          {visible ? 'Masquer' : 'Afficher'}
        </div>
      </button>

      {visible && (
        <>
          <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {fields.map((field) => (
              <DifficultyTile
                key={field.key}
                field={field}
                value={value[field.key]}
                active={openKey === field.key}
                onClick={() => setOpenKey(openKey === field.key ? null : field.key)}
              />
            ))}
          </div>

          {openField && (
            <div style={{ marginTop: 10, padding: 10, borderRadius: 16, background: T.paper, border: `0.5px solid ${T.line}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'baseline' }}>
                <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.ink }}>{openField.label}</div>
                <div style={{ fontFamily: T.sans, fontSize: 12, color: T.ink3 }}>{openField.helper}</div>
              </div>
              <div style={{ marginTop: 9, display: 'flex', gap: 7, overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: 2 }}>
                {openField.options.map((option) => {
                  const active = value[openField.key] === option;
                  return (
                    <button
                      key={option}
                      onClick={() => onChange({ ...value, [openField.key]: option })}
                      style={{
                        minHeight: 38,
                        padding: '0 12px',
                        borderRadius: 999,
                        border: `0.5px solid ${active ? T.accent : T.line}`,
                        background: active ? T.accent : T.paper2,
                        color: active ? T.paper : T.ink2,
                        fontFamily: T.sans,
                        fontSize: 12,
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                        cursor: 'pointer',
                      }}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function DifficultyTile({ field, value, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        minHeight: 64,
        padding: 10,
        borderRadius: 16,
        border: `0.5px solid ${active ? T.accent : T.line}`,
        background: active ? T.accentSoft : T.paper,
        textAlign: 'left',
        cursor: 'pointer',
      }}
    >
      <div style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: 0.35, textTransform: 'uppercase', color: active ? T.accentInk : T.ink3 }}>
        {field.label}
      </div>
      <div style={{ marginTop: 5, fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.ink, lineHeight: 1.2 }}>
        {value}
      </div>
    </button>
  );
}

function TapBtn({ icon, onClick, highlight }) {
  return (
    <div
      onClick={onClick}
      style={{
        width: 56,
        height: 56,
        borderRadius: 999,
        background: highlight ? T.ink : T.paper2,
        color: highlight ? T.paper : T.ink,
        border: `0.5px solid ${highlight ? T.ink : T.line}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: T.sans,
        fontSize: 28,
        fontWeight: 300,
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      {icon}
    </div>
  );
}


function InlineTimer({ duration }) {
  const [t, setT] = React.useState(duration);
  const [running, setRunning] = React.useState(false);

  React.useEffect(() => {
    if (!running || t <= 0) return;
    const id = setTimeout(() => setT(t - 1), 1000);
    return () => clearTimeout(id);
  }, [t, running]);

  return (
    <div>
      <div style={{ fontFamily: T.display, fontSize: 80, lineHeight: 1, color: T.ink }}>
        {String(Math.floor(t / 60)).padStart(1, '0')}:{String(t % 60).padStart(2, '0')}
      </div>
      <div
        onClick={() => setRunning(!running)}
        style={{
          marginTop: 10,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '8px 14px',
          borderRadius: 999,
          background: T.paper2,
          border: `0.5px solid ${T.line}`,
          fontFamily: T.sans,
          fontSize: 13,
          color: T.ink2,
          cursor: 'pointer',
        }}
      >
        {running ? <Icons.pause size={12} stroke={T.ink2} /> : <Icons.play size={12} stroke={T.ink2} />}
        {running ? 'Pause' : 'Démarrer'}
      </div>
    </div>
  );
}

function FeedbackStage({ state, setState, exercises }) {
  const [pain, setPain] = React.useState(1);
  const painSignal = getPainSignal(pain);

  const next = () => {
    const s = state.session;
    const thisEx = exercises[s.exerciseIdx];
    const newCompleted = s.completedSets + 1;
    const isLastSet = newCompleted >= thisEx.sets;
    setState({
      session: {
        ...s,
        stage: isLastSet ? 'done-exercise' : 'rest',
        completedSets: newCompleted,
        log: [...s.log, { ex: s.exerciseIdx, set: s.setIdx, effort: 5, pain, reps: s.lastReps, difficulty: s.lastDifficulty || getDefaultDifficulty(thisEx) }],
      },
    });
  };

  return (
    <div style={{ padding: '24px 16px 0' }}>
      <div style={{ padding: 20, borderRadius: 24, background: T.paper, border: `0.5px solid ${T.line}` }}>
        <div style={{ fontFamily: T.sans, fontSize: 14, color: T.ink3, textTransform: 'uppercase', letterSpacing: 0.4 }}>
          Comment c'était ?
        </div>
        <div style={{ marginTop: 4, fontFamily: T.display, fontSize: 22, color: T.ink }}>Rapide et utile pour le suivi.</div>

        <ScaleCard kind="pain" value={pain} onChange={setPain} vocabulary={state.scaleVocabulary} />

        <div style={{ marginTop: 18, padding: 14, borderRadius: 18, background: T.paper2, border: `0.5px solid ${T.line}` }}>
          <div style={{ fontFamily: T.sans, fontSize: 13, color: T.ink3 }}>Lecture rapide</div>
          <div style={{ marginTop: 6, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <FeedbackBadge label={`Douleur ${painSignal.label}`} color={painSignal.color} bg={painSignal.bg} />
          </div>
          {state.session.lastDifficulty && (
            <div style={{ marginTop: 8, fontFamily: T.sans, fontSize: 12, lineHeight: 1.35, color: T.ink3 }}>
              Réglage noté: <span style={{ color: T.ink2 }}>{formatDifficulty(state.session.lastDifficulty)}</span>
            </div>
          )}
          <div style={{ marginTop: 8, fontFamily: T.sans, fontSize: 13, lineHeight: 1.45, color: T.ink2 }}>
            {pain <= 3
              ? 'Si la douleur reste dans cette zone et redescend après, la séance reste cohérente.'
              : pain <= 5
                ? 'Note bien l\'évolution après la série et en post-séance pour voir si cette charge reste adaptée.'
                : 'Cette douleur mérite d\'être notée clairement et discutée si elle ne redescend pas vite.'}
          </div>
        </div>

        <button
          onClick={next}
          style={{
            marginTop: 22,
            width: '100%',
            height: 52,
            borderRadius: 999,
            border: 'none',
            background: T.ink,
            color: T.paper,
            fontFamily: T.sans,
            fontSize: 15,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Continuer
        </button>
      </div>
    </div>
  );
}
function FeedbackBadge({ label, color, bg }) {
  return (
    <div style={{ padding: '6px 10px', borderRadius: 999, background: bg, fontFamily: T.mono, fontSize: 11, color }}>
      {label}
    </div>
  );
}

function BorgSlider({ value, onChange }) {
  const label = [
    '',
    'Très très facile',
    'Très facile',
    'Facile',
    'Assez facile',
    'Modéré',
    'Un peu difficile',
    'Difficile',
    'Très difficile',
    'Très très difficile',
    'Maximal',
  ][value];

  return (
    <div style={{ marginTop: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontFamily: T.sans, fontSize: 14, color: T.ink }}>Effort ressenti</div>
        <div style={{ fontFamily: T.mono, fontSize: 13, color: T.ink2 }}>{value}/10</div>
      </div>
      <input type="range" min="1" max="10" value={value} onChange={(e) => onChange(+e.target.value)} style={{ width: '100%', marginTop: 10, accentColor: T.accent }} />
      <div style={{ fontFamily: T.sans, fontSize: 13, color: T.ink2, fontStyle: 'italic' }}>{label}</div>
    </div>
  );
}

function PainSlider({ value, onChange }) {
  const label = value === 0
    ? 'Aucune douleur'
    : value <= 2
      ? 'Légère, tolérable'
      : value <= 5
        ? 'Inconfortable — attention'
        : value <= 7
          ? 'Douloureux — envisage d\'arrêter'
          : 'Très douloureux — arrête';
  const color = value <= 2 ? T.sage : value <= 5 ? T.amber : T.danger;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontFamily: T.sans, fontSize: 14, color: T.ink }}>Douleur au genou</div>
        <div style={{ fontFamily: T.mono, fontSize: 13, color }}>{value}/10</div>
      </div>
      <input type="range" min="0" max="10" value={value} onChange={(e) => onChange(+e.target.value)} style={{ width: '100%', marginTop: 10, accentColor: color }} />
      <div style={{ fontFamily: T.sans, fontSize: 13, color, fontStyle: 'italic' }}>{label}</div>
    </div>
  );
}

function RestStage({ state, setState, ex }) {
  const [t, setT] = React.useState(60);
  const lastLog = getLastLog(state.session.log, state.session.exerciseIdx);

  React.useEffect(() => {
    if (t <= 0) return;
    const id = setTimeout(() => setT(t - 1), 1000);
    return () => clearTimeout(id);
  }, [t]);

  const next = () =>
    setState({
      session: { ...state.session, stage: 'doing', setIdx: state.session.setIdx + 1 },
    });

  return (
    <div style={{ padding: '24px 16px 0' }}>
      <div
        style={{
          padding: 24,
          borderRadius: 24,
          background: `linear-gradient(160deg, ${T.sageSoft}, ${T.paper})`,
          border: `0.5px solid ${T.line}`,
          textAlign: 'center',
        }}
      >
        <div style={{ fontFamily: T.sans, fontSize: 12, letterSpacing: 0.5, textTransform: 'uppercase', color: T.ink3 }}>
          Repos
        </div>
        <div style={{ marginTop: 8, fontFamily: T.display, fontSize: 88, lineHeight: 1, color: T.ink }}>
          {String(Math.floor(t / 60))}:{String(t % 60).padStart(2, '0')}
        </div>
        <div style={{ marginTop: 8, fontFamily: T.sans, fontSize: 14, color: T.ink2 }}>
          Respire. Prochaine série de {ex.name.toLowerCase()} dans un instant.
        </div>
        {lastLog && (
          <div style={{ marginTop: 10, fontFamily: T.sans, fontSize: 13, color: T.ink2 }}>
            Série précédente: {lastLog.reps} rep · douleur {lastLog.pain}/10
            {lastLog.difficulty && (
              <div style={{ marginTop: 3, color: T.ink3 }}>
                {formatDifficulty(lastLog.difficulty)}
              </div>
            )}
          </div>
        )}
        <div style={{ display: 'flex', gap: 10, marginTop: 18, justifyContent: 'center' }}>
          <div onClick={() => setT(t + 15)} style={pillBtn()}>+15 s</div>
          <div onClick={next} style={pillBtn({ solid: true })}>Passer à la série suivante</div>
        </div>
      </div>

      <SetRecapCard state={state} />
    </div>
  );
}

function pillBtn({ solid = false } = {}) {
  return {
    padding: '12px 22px',
    borderRadius: 999,
    background: solid ? T.ink : T.paper,
    color: solid ? T.paper : T.ink,
    border: solid ? 'none' : `0.5px solid ${T.line}`,
    fontFamily: 'Geist, system-ui',
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
  };
}

function SetRecapCard({ state }) {
  const entries = getExerciseLogs(state.session.log, state.session.exerciseIdx);
  const nextIndex = entries.length + 1;

  return (
    <div
      style={{
        marginTop: 16,
        padding: '14px 18px',
        borderRadius: 18,
        background: T.paper,
        border: `0.5px solid ${T.line}`,
        display: 'flex',
        justifyContent: 'space-around',
        fontFamily: T.sans,
        fontSize: 13,
        color: T.ink2,
      }}
    >
      {entries.map((entry, idx) => (
        <SetMini key={`${entry.ex}-${entry.set}-${idx}`} label={`Série ${idx + 1}`} reps={entry.reps} effort={entry.effort} pain={entry.pain} done />
      ))}
      <SetMini label={`Série ${nextIndex}`} upcoming />
    </div>
  );
}

function SetMini({ label, reps, effort, pain, done, upcoming }) {
  return (
    <div style={{ textAlign: 'center', opacity: upcoming ? 0.4 : 1 }}>
      <div style={{ fontSize: 12, color: T.ink3, textTransform: 'uppercase', letterSpacing: 0.4 }}>{label}</div>
      {done && (
        <div style={{ marginTop: 4, fontFamily: T.mono, fontSize: 13, color: T.ink }}>
          {reps} rep · <span style={{ color: T.sage }}>Douleur {pain}</span>
        </div>
      )}
      {upcoming && <div style={{ marginTop: 4, fontFamily: T.mono, fontSize: 13 }}>—</div>}
    </div>
  );
}

function DoneExerciseStage({ state, setState, exercises }) {
  const s = state.session;
  const nextEx = exercises[s.exerciseIdx + 1];
  const averages = getExerciseAverages(s.log, s.exerciseIdx);

  const goNext = () => {
    if (s.exerciseIdx >= exercises.length - 1) {
      setState({ session: { ...s, stage: 'complete' } });
    } else {
      setState({
        session: {
          ...s,
          exerciseIdx: s.exerciseIdx + 1,
          setIdx: 0,
          completedSets: 0,
          stage: 'doing',
        },
      });
    }
  };

  return (
    <div style={{ padding: '24px 16px 0' }}>
      <div style={{ padding: 22, borderRadius: 24, background: T.paper, border: `0.5px solid ${T.line}`, textAlign: 'center' }}>
        <div
          style={{
            margin: '4px auto 0',
            width: 56,
            height: 56,
            borderRadius: 999,
            background: T.sageSoft,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icons.check size={28} stroke={T.sage} sw={2} />
        </div>
        <div style={{ marginTop: 14, fontFamily: T.display, fontSize: 26, color: T.ink }}>Exercice bouclé.</div>
        {averages && (
          <div style={{ marginTop: 8, fontFamily: T.sans, fontSize: 14, color: T.ink2, lineHeight: 1.45 }}>
            Moyenne sur cet exercice: douleur <b style={{ color: T.ink }}>{averages.pain}/10</b>.
          </div>
        )}
        {nextEx ? (
          <div style={{ marginTop: 8, fontFamily: T.sans, fontSize: 14, color: T.ink2 }}>
            Suivant · <b style={{ color: T.ink }}>{nextEx.name}</b> · {nextEx.sets} × {nextEx.reps}
          </div>
        ) : (
          <div style={{ marginTop: 8, fontFamily: T.sans, fontSize: 14, color: T.ink2 }}>
            Dernier exercice terminé.
          </div>
        )}
        <button
          onClick={goNext}
          style={{
            marginTop: 22,
            width: '100%',
            height: 52,
            borderRadius: 999,
            border: 'none',
            background: T.accent,
            color: T.paper,
            fontFamily: T.sans,
            fontSize: 15,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          {s.exerciseIdx >= exercises.length - 1 ? 'Terminer la séance' : 'Exercice suivant'}
        </button>
      </div>
    </div>
  );
}

window.SessionScreen = SessionScreen;
