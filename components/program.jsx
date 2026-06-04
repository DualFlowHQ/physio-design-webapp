// Programme screen - bank of patient-selectable rehab programs.

// Demo prescription data: in a real product this would come from the clinician-authored plan.
const HIP_INITIAL_EXERCISES = [
  { name: 'Montée de genou avec élastique', muscle: 'Fléchisseurs hanche', sets: 3, reps: 12, tempo: '2-1-2', load: 'Élastique léger', cue: 'Monte le genou sans basculer le bassin' },
  { name: 'Abduction de hanche avec élastique', muscle: 'Abducteurs', sets: 3, reps: 12, tempo: '2-1-2', load: 'Élastique léger', cue: 'Garde le tronc stable et contrôle le retour' },
  { name: 'Activation fessier', muscle: 'Fessiers', sets: 3, reps: 12, tempo: '2-2-2', load: 'Poids du corps', cue: 'Serre le fessier sans creuser le bas du dos' },
];

const HIP_FULL_EXERCISES = [
  ...HIP_INITIAL_EXERCISES,
  { name: 'Squat contrôlé', muscle: 'Hanche · jambes', sets: 3, reps: 12, tempo: '3-1-2', load: 'Poids du corps', cue: 'Amplitude confortable, poids réparti sur les deux pieds' },
  { name: 'Pont fessier', muscle: 'Fessiers', sets: 3, reps: 12, tempo: '2-2-2', load: 'Poids du corps', cue: 'Monte le bassin sans pincer la hanche' },
];

const PROGRAM_DATA = {
  day: 93,
  totalDays: null,
  endLabel: 'à confirmer',
  currentWeek: 14,
  currentPhaseId: 'force',
  weeklyFocus: {
    title: 'Objectif de la semaine',
    text: 'Choisir dans la banque selon la tolérance du jour et les consignes du physio, en gardant la douleur autour de 4/10.',
    checks: [
      { label: 'Douleur après séance', value: 'rester autour de 4/10', tone: 'good' },
      { label: 'Choix du jour', value: 'cardio doux ou force hanche', tone: 'neutral' },
      { label: 'À surveiller', value: 'pic de hanche ou boiterie', tone: 'watch' },
    ],
  },
  programs: [
    {
      id: 'swim-15',
      badge: '15 min',
      title: 'Nager',
      meta: '15 min · cardio doux',
      objective: 'Bouger sans impact et surveiller la réaction de la hanche.',
      exercises: [
        { name: 'Nage facile', muscle: 'Cardio doux', sets: 1, reps: '15 min', tempo: 'facile', load: 'Piscine', cue: 'Reste à une intensité confortable et note la réaction de la hanche après.' },
      ],
    },
    {
      id: 'bike-5',
      badge: '5 min',
      title: 'Vélo',
      meta: '5 min · mobilité active',
      objective: 'Réchauffer la hanche sans forcer.',
      exercises: [
        { name: 'Vélo facile', muscle: 'Mobilité hanche', sets: 1, reps: '5 min', tempo: 'facile', load: 'Résistance faible', cue: 'Garde une cadence fluide, sans chercher la fatigue.' },
      ],
    },
    {
      id: 'hip-3',
      badge: '3 exos',
      title: 'Programme 3 exercices',
      meta: '3 exercices · 3 × 12',
      objective: 'Bloc initial depuis le 1er avril.',
      exercises: HIP_INITIAL_EXERCISES,
    },
    {
      id: 'hip-5',
      badge: '5 exos',
      title: 'Programme 5 exercices',
      meta: '21 min · 5 exercices',
      objective: 'Bloc complet depuis l’ajout du squat et du pont le 8 mai.',
      exercises: HIP_FULL_EXERCISES,
    },
  ],
};

function ProgramScreen({ onBack, onStart, onOpenHistory }) {
  const pct = 72;
  const defaultProgram = PROGRAM_DATA.programs[0];
  const [selectedProgramId, setSelectedProgramId] = React.useState(defaultProgram.id);
  const selectedProgram = PROGRAM_DATA.programs.find((program) => program.id === selectedProgramId) || defaultProgram;

  return (
    <div style={{ background: T.bg, minHeight: '100%', paddingBottom: 120 }}>
      <div style={{ padding: '60px 16px 8px', display: 'flex', gap: 12, alignItems: 'center' }}>
        <CircleIcon onClick={onBack} icon={<Icons.chevL size={18} stroke={T.ink2} />} />
        <div style={{ flex: 1 }} />
        <CircleIcon onClick={onOpenHistory} icon={<Icons.trend size={18} stroke={T.ink2} />} />
      </div>

      <div style={{ padding: '8px 24px 0' }}>
        <div style={{ fontFamily: T.sans, fontSize: 12, letterSpacing: 0.5, textTransform: 'uppercase', color: T.ink3 }}>
          Programme complet
        </div>
        <div style={{ marginTop: 6, fontFamily: T.display, fontSize: 36, lineHeight: 1.05, color: T.ink }}>
          Ton plan jusqu'au<br /><span style={{ fontStyle: 'italic', color: T.accentInk }}>retour progressif.</span>
        </div>
        <div style={{ marginTop: 12, fontFamily: T.sans, fontSize: 14, color: T.ink2, lineHeight: 1.45 }}>
          Semaine {PROGRAM_DATA.currentWeek} · jour {PROGRAM_DATA.day} depuis le 4 mars · {PROGRAM_DATA.endLabel}.
        </div>
      </div>

      <SelectedProgramCard program={selectedProgram} onStart={() => onStart(selectedProgram.exercises)} />
      <ProgramProgress
        pct={pct}
        programCount={PROGRAM_DATA.programs.length}
        currentPhase="Force"
        endLabel={PROGRAM_DATA.endLabel}
        onOpenHistory={onOpenHistory}
      />
      <WeeklyFocusCard focus={PROGRAM_DATA.weeklyFocus} />
      <ProgramBankBlock
        programs={PROGRAM_DATA.programs}
        selectedProgram={selectedProgram}
        onSelectProgram={setSelectedProgramId}
      />
    </div>
  );
}

function CircleIcon({ icon, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        width: 40,
        height: 40,
        borderRadius: 999,
        background: T.paper,
        border: `0.5px solid ${T.line}`,
        boxShadow: '0 10px 24px rgba(18,52,59,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}
    >
      {icon}
    </div>
  );
}

function ProgramProgress({ pct, programCount, currentPhase, endLabel, onOpenHistory }) {
  return (
    <div style={{ margin: '22px 16px 0', padding: 20, borderRadius: 24, background: T.paper, border: `0.5px solid ${T.line}`, boxShadow: '0 18px 42px rgba(18,52,59,0.06)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontFamily: T.sans, fontSize: 12, letterSpacing: 0.4, textTransform: 'uppercase', color: T.ink3 }}>Avancement global</div>
        <div style={{ fontFamily: T.mono, fontSize: 13, color: T.ink }}>{pct}%</div>
      </div>
      <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        <ProgramStat label="Banque" value={programCount} />
        <ProgramStat label="Phase" value={currentPhase} />
        <ProgramStat label="Fin" value={endLabel} />
      </div>
      <button
        onClick={onOpenHistory}
        style={{
          marginTop: 14,
          height: 40,
          width: '100%',
          borderRadius: 999,
          border: `1px solid ${T.line}`,
          background: T.paper,
          color: T.ink,
          fontFamily: T.sans,
          fontSize: 14,
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          cursor: 'pointer',
        }}
      >
        Voir les progrès
      </button>
    </div>
  );
}

function ProgramStat({ label, value }) {
  return (
    <div style={{ padding: '10px 8px', borderRadius: 14, background: `linear-gradient(180deg, ${T.paper2}, ${T.paper})`, border: `0.5px solid ${T.line}`, textAlign: 'center' }}>
      <div style={{ fontFamily: T.mono, fontSize: 16, color: T.ink }}>{value}</div>
      <div style={{ marginTop: 3, fontFamily: T.sans, fontSize: 12, color: T.ink3, lineHeight: 1.25 }}>{label}</div>
    </div>
  );
}

function WeeklyFocusCard({ focus }) {
  return (
    <div style={{ margin: '14px 16px 0', padding: 18, borderRadius: 24, background: `linear-gradient(150deg, ${T.paper} 0%, ${T.accentSoft} 62%, ${T.sageSoft} 100%)`, border: `0.5px solid ${T.line}`, boxShadow: '0 16px 38px rgba(8,127,140,0.08)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: T.sans, fontSize: 12, letterSpacing: 0.4, textTransform: 'uppercase', color: T.ink3 }}>
        <Icons.spark size={14} stroke={T.accentInk} />
        {focus.title}
      </div>
      <div style={{ marginTop: 8, fontFamily: T.display, fontSize: 24, lineHeight: 1.12, color: T.ink }}>
        Le cap de cette semaine.
      </div>
      <div style={{ marginTop: 8, fontFamily: T.sans, fontSize: 14, lineHeight: 1.45, color: T.ink2 }}>
        {focus.text}
      </div>
      <div style={{ marginTop: 14, display: 'grid', gap: 8 }}>
        {focus.checks.map((item) => (
          <FocusCheck key={item.label} item={item} />
        ))}
      </div>
    </div>
  );
}

function FocusCheck({ item }) {
  const tone = item.tone === 'good'
    ? { bg: T.sageSoft, fg: T.sage, border: '#BFE8D2' }
    : item.tone === 'watch'
      ? { bg: T.amberSoft, fg: T.amber, border: '#F0D29B' }
      : { bg: T.paper, fg: T.accentInk, border: T.line };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '34px 1fr', gap: 10, alignItems: 'center' }}>
      <div style={{ width: 34, height: 34, borderRadius: 14, background: tone.bg, border: `0.5px solid ${tone.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icons.dot size={10} stroke={tone.fg} />
      </div>
      <div style={{ paddingBottom: 2 }}>
        <div style={{ fontFamily: T.sans, fontSize: 13, color: T.ink3 }}>{item.label}</div>
        <div style={{ marginTop: 2, fontFamily: T.sans, fontSize: 14, color: T.ink, fontWeight: 500 }}>{item.value}</div>
      </div>
    </div>
  );
}

function SelectedProgramCard({ program, onStart }) {
  const totalSets = getProgramTotalSets(program);

  return (
    <div style={{ margin: '14px 16px 0', padding: 18, borderRadius: 24, background: `linear-gradient(145deg, ${T.ink} 0%, ${T.accentInk} 62%, #0D4F48 100%)`, color: T.paper, position: 'relative', overflow: 'hidden', boxShadow: '0 24px 55px rgba(18,52,59,0.22)' }}>
      <div style={{ position: 'absolute', right: -54, top: -64, width: 172, height: 172, borderRadius: 999, background: 'rgba(255,255,255,0.08)' }} />
      <div style={{ position: 'absolute', left: -52, bottom: -76, width: 154, height: 154, borderRadius: 999, background: 'rgba(221,243,241,0.12)' }} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: T.sans, fontSize: 13, letterSpacing: 0.5, textTransform: 'uppercase', opacity: 0.78 }}>
          <Icons.dot size={7} stroke={T.accentSoft} />
          Programme sélectionné
        </div>
        <div style={{ padding: '6px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.12)', border: '0.5px solid rgba(255,255,255,0.18)', fontFamily: T.mono, fontSize: 12 }}>
          {program.exercises.length} bloc{program.exercises.length > 1 ? 's' : ''}
        </div>
      </div>
      <div style={{ marginTop: 10, fontFamily: T.display, fontSize: 25, lineHeight: 1.12 }}>
        {program.title}
      </div>
      <div style={{ marginTop: 8, fontFamily: T.sans, fontSize: 14, lineHeight: 1.45, opacity: 0.84 }}>
        {program.meta} · {program.objective}
      </div>
      <div style={{ marginTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <DarkChip label={totalSets === 1 ? 'bloc cardio doux' : `${totalSets} séries`} />
        <DarkChip label="surveiller la douleur à chaud" />
      </div>
      <button
        onClick={onStart}
        style={{
          marginTop: 16,
          height: 46,
          width: '100%',
          borderRadius: 999,
          border: 'none',
          background: T.paper,
          color: T.ink,
          fontFamily: T.sans,
          fontSize: 14,
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          cursor: 'pointer',
        }}
      >
        <Icons.play size={13} stroke={T.ink} />
        Commencer maintenant
      </button>
    </div>
  );
}

function DarkChip({ label }) {
  return (
    <div style={{ padding: '5px 9px', borderRadius: 999, background: 'rgba(255,255,255,0.12)', border: '0.5px solid rgba(255,255,255,0.14)', fontFamily: T.mono, fontSize: 11, color: T.paper }}>
      {label}
    </div>
  );
}

function ProgramBankBlock({ programs, selectedProgram, onSelectProgram }) {
  const exercises = selectedProgram.exercises || [];
  const totalSets = exercises.reduce((sum, ex) => sum + ex.sets, 0);


  return (
    <div style={{ padding: '24px 16px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0 4px' }}>
        <SectionLabel>Banque de programmes</SectionLabel>
        <div style={{ fontFamily: T.mono, fontSize: 12, color: T.ink3 }}>
          {exercises.length} bloc{exercises.length > 1 ? 's' : ''} · {formatTotalSets(totalSets)}
        </div>
      </div>

      <div style={{ marginTop: 12, padding: 14, borderRadius: 22, background: T.paper, border: `0.5px solid ${T.line}`, boxShadow: '0 18px 42px rgba(18,52,59,0.06)' }}>
        <div style={{ padding: '0 2px 12px', fontFamily: T.sans, fontSize: 13, lineHeight: 1.45, color: T.ink2 }}>
          Choisis le programme que tu veux faire maintenant.
        </div>

        <WorkoutPlanCarousel
          programs={programs}
          selectedProgram={selectedProgram}
          onSelectProgram={onSelectProgram}
        />



        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {exercises.map((ex, i) => (
            <DayExerciseRow key={ex.name} index={i + 1} ex={ex} isLast={i === exercises.length - 1} />
          ))}
        </div>
      </div>
    </div>
  );
}

function WorkoutPlanCarousel({ programs, selectedProgram, onSelectProgram }) {
  return (
    <div style={{ display: 'flex', gap: 10, overflowX: 'auto', padding: '0 0 12px', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}>
      {programs.map((program) => (
        <WorkoutPlanCard
          key={program.id}
          program={program}
          active={program.id === selectedProgram.id}
          onSelect={() => onSelectProgram(program.id)}
        />
      ))}
    </div>
  );
}

function WorkoutPlanCard({ program, active, onSelect }) {
  const tone = active
    ? { bg: `linear-gradient(145deg, ${T.ink}, ${T.accentInk})`, fg: T.paper, muted: T.accentSoft, border: T.accentInk, shadow: '0 16px 32px rgba(18,52,59,0.20)' }
    : { bg: `linear-gradient(180deg, ${T.paper2}, ${T.paper})`, fg: T.ink, muted: T.ink3, border: T.line, shadow: 'none' };

  return (
    <button
      onClick={onSelect}
      style={{
        flex: '0 0 178px',
        minHeight: 118,
        padding: 14,
        borderRadius: 18,
        border: `0.5px solid ${tone.border}`,
        background: tone.bg,
        color: tone.fg,
        boxShadow: tone.shadow,
        scrollSnapAlign: 'start',
        textAlign: 'left',
        cursor: 'pointer',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 38, height: 38, borderRadius: 14, background: active ? 'rgba(255,255,255,0.13)' : T.paper, border: active ? '0.5px solid rgba(255,255,255,0.18)' : `0.5px solid ${T.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.mono, fontSize: 12, color: active ? T.paper : T.ink }}>
          {program.badge}
        </div>
        <div style={{ padding: '5px 8px', borderRadius: 999, background: active ? 'rgba(255,255,255,0.13)' : T.paper, border: active ? '0.5px solid rgba(255,255,255,0.18)' : `0.5px solid ${T.line}`, fontFamily: T.mono, fontSize: 10, color: active ? T.paper : T.ink3, whiteSpace: 'nowrap' }}>
          {program.exercises.length} bloc{program.exercises.length > 1 ? 's' : ''}
        </div>
      </div>
      <div style={{ marginTop: 12, fontFamily: T.sans, fontSize: 14, lineHeight: 1.2, fontWeight: 600, color: tone.fg }}>
        {program.title}
      </div>
      <div style={{ marginTop: 5, fontFamily: T.sans, fontSize: 12, lineHeight: 1.35, color: active ? T.accentSoft : tone.muted }}>
        {program.meta}
      </div>
    </button>
  );
}

function getProgramTotalSets(program) {
  return (program.exercises || []).reduce((sum, ex) => sum + ex.sets, 0);
}

function formatTotalSets(totalSets) {
  return totalSets === 1 ? '1 bloc' : `${totalSets} séries`;
}



function DayExerciseRow({ index, ex, isLast }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '32px 1fr', gap: 10, alignItems: 'start' }}>
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 12,
          background: index === 1 ? T.accent : T.paper2,
          color: index === 1 ? T.paper : T.ink3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: T.mono,
          fontSize: 12,
        }}
      >
        {index}
      </div>
      <div style={{ paddingBottom: 10, borderBottom: isLast ? 'none' : `0.5px solid ${T.line}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'baseline' }}>
          <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 600, color: T.ink, lineHeight: 1.25 }}>
            {ex.name}
          </div>
          <div style={{ fontFamily: T.mono, fontSize: 12, color: T.ink3, whiteSpace: 'nowrap' }}>
            {formatExerciseDose(ex)}
          </div>
        </div>
        <div style={{ marginTop: 5, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <TinyProgramChip label={ex.muscle} />
          <TinyProgramChip label={ex.load} />
          <TinyProgramChip label={`tempo ${ex.tempo}`} />
        </div>
        <div style={{ marginTop: 7, fontFamily: T.sans, fontSize: 13, color: T.ink2, lineHeight: 1.4, fontStyle: 'italic' }}>
          « {ex.cue} »
        </div>
      </div>
    </div>
  );
}

function TinyProgramChip({ label }) {
  return (
    <div
      style={{
        padding: '4px 8px',
        borderRadius: 999,
        background: T.paper2,
        border: `0.5px solid ${T.line}`,
        fontFamily: T.mono,
        fontSize: 12,
        color: T.ink3,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </div>
  );
}

function formatExerciseDose(ex) {
  return ex.sets === 1 && typeof ex.reps === 'string' ? ex.reps : `${ex.sets} × ${ex.reps}`;
}

window.ProgramScreen = ProgramScreen;
