// Programme screen - patient-facing map of the full rehab plan, not only today's slice.

// Demo prescription data: in a real product this would come from the clinician-authored plan.
const PROGRAM_DATA = {
  day: 38,
  totalDays: 84,
  currentWeek: 6,
  currentPhaseId: 'force',
  nextSession: {
    title: 'Contrôle genou',
    time: 'Aujourd\'hui · 18 min',
    detail: '5 exercices · phase 2 · proprioception',
  },
  weeklyFocus: {
    title: 'Objectif de la semaine',
    text: 'Tolérer 4 séances sans hausse durable de douleur le lendemain.',
    checks: [
      { label: 'Douleur après séance', value: 'viser 0 à 3/10', tone: 'good' },
      { label: 'Charge', value: 'stable ou légèrement en hausse', tone: 'neutral' },
      { label: 'À surveiller', value: 'raideur marquée le lendemain', tone: 'watch' },
    ],
  },
  phases: [
    { id: 'protection', label: 'Protection', weeks: 'Sem 1-2', status: 'done', note: 'Gonflement sous contrôle' },
    { id: 'mobilite', label: 'Mobilité', weeks: 'Sem 3-4', status: 'done', note: 'Flexion complète retrouvée' },
    { id: 'force', label: 'Force', weeks: 'Sem 5-8', status: 'current', note: 'Quadriceps et stabilité' },
    { id: 'sport', label: 'Sport', weeks: 'Sem 9-11', status: 'next', note: 'Course légère, sauts simples' },
    { id: 'retour', label: 'Retour', weeks: 'Sem 12', status: 'future', note: 'Retour contrôlé au terrain' },
  ],
  weekSessions: [
    {
      id: 'quad',
      day: 'Lun',
      title: 'Renforcement quadriceps',
      meta: '22 min · 6 exercices',
      status: 'done',
      objective: 'Tolérer la charge sans douleur qui grimpe après la séance.',
      exercises: [
        { name: 'Squats au mur', muscle: 'Quadriceps', sets: 3, reps: 12, tempo: '3-1-1', load: 'Poids du corps', cue: 'Descends jusqu\'à 90° · dos bien plaqué' },
        { name: 'Extension de genou', muscle: 'Quadriceps', sets: 3, reps: 10, tempo: '2-0-2', load: '8 kg', cue: 'Contrôle la descente — pas de claquement' },
        { name: 'Step-up latéral', muscle: 'Fessiers · quadri', sets: 3, reps: 10, tempo: 'libre', load: '6 kg', cue: 'Monte par la jambe droite, pas par l\'élan' },
        { name: 'Pont fessier', muscle: 'Fessiers', sets: 3, reps: 15, tempo: '2-2-1', load: 'Bande', cue: 'Serre les fesses 2 s en haut' },
        { name: 'Fente arrière', muscle: 'Jambes', sets: 2, reps: 10, tempo: 'libre', load: '4 kg × 2', cue: 'Genou avant aligné avec la cheville' },
        { name: 'Étirement ischio', muscle: 'Étirement', sets: 2, reps: '~30 sec', tempo: '—', load: '—', cue: 'Respire, ne force pas' },
      ],
    },
    {
      id: 'mobility',
      day: 'Mar',
      title: 'Mobilité + ischios',
      meta: '14 min · routine douce',
      status: 'done',
      objective: 'Récupérer de la fluidité sans ajouter de fatigue.',
      exercises: [
        { name: 'Glissés de talon', muscle: 'Mobilité genou', sets: 2, reps: 12, tempo: 'lent', load: '—', cue: 'Garde le talon au sol et arrête avant le pincement' },
        { name: 'Extension passive', muscle: 'Extension', sets: 2, reps: '~45 sec', tempo: '—', load: 'Serviette', cue: 'Relâche la cuisse, laisse le genou s\'ouvrir' },
        { name: 'Ischio élastique', muscle: 'Ischios', sets: 2, reps: 12, tempo: '2-1-2', load: 'Bande légère', cue: 'Ramène le talon sans cambrer le dos' },
        { name: 'Respiration jambes au mur', muscle: 'Récupération', sets: 1, reps: '~2 min', tempo: 'calme', load: '—', cue: 'Respire lentement, genou confortable' },
      ],
    },
    {
      id: 'control',
      day: 'Jeu',
      title: 'Contrôle genou',
      meta: '18 min · proprioception',
      status: 'today',
      objective: 'Garder l\'alignement du genou quand l\'équilibre devient moins stable.',
      exercises: [
        { name: 'Équilibre unipodal', muscle: 'Proprioception', sets: 3, reps: '~30 sec', tempo: 'stable', load: '—', cue: 'Fixe un point et garde le genou au-dessus du pied' },
        { name: 'Mini squat contrôlé', muscle: 'Quadriceps', sets: 3, reps: 8, tempo: '3-1-2', load: 'Poids du corps', cue: 'Petit angle, mouvement lent, pas de valgus' },
        { name: 'Step-down bas', muscle: 'Contrôle genou', sets: 3, reps: 8, tempo: '2-1-2', load: 'Marche basse', cue: 'Descends sans laisser le bassin tomber' },
        { name: 'Marche latérale bande', muscle: 'Fessiers', sets: 2, reps: 10, tempo: 'régulier', load: 'Bande', cue: 'Garde les pieds parallèles et la tension constante' },
        { name: 'Étirement mollet', muscle: 'Mobilité cheville', sets: 2, reps: '~30 sec', tempo: '—', load: 'Mur', cue: 'Talons au sol, respiration calme' },
      ],
    },
    {
      id: 'walk',
      day: 'Sam',
      title: 'Marche active',
      meta: '25 min · effort 5/10',
      status: 'upcoming',
      objective: 'Tester l\'endurance sans dépasser un effort modéré.',
      exercises: [
        { name: 'Échauffement marche', muscle: 'Cardio doux', sets: 1, reps: '~5 min', tempo: 'facile', load: '—', cue: 'Allure confortable, pas de boiterie' },
        { name: 'Marche active fractionnée', muscle: 'Endurance', sets: 5, reps: '~3 min', tempo: 'effort 5/10', load: '—', cue: 'Augmente légèrement l\'allure, genou stable' },
        { name: 'Retour au calme', muscle: 'Récupération', sets: 1, reps: '~5 min', tempo: 'calme', load: '—', cue: 'Ralentis jusqu\'à une respiration normale' },
      ],
    },
  ],
  completed: [
    { label: 'Sem 5', sessions: '4/4 séances', pain: '2.8', note: 'Charge stable' },
    { label: 'Sem 4', sessions: '3/4 séances', pain: '3.4', note: 'Mobilité validée' },
  ],
  milestones: [
    { when: 'Dans 3 semaines', text: 'Test de course légère si douleur stable sous 3/10' },
    { when: 'Sem 12', text: 'Retour au sport contrôlé après validation clinique' },
  ],
};

function ProgramScreen({ onBack, onStart, onOpenHistory }) {
  const progressWeeks = window.getProgressWeeks ? window.getProgressWeeks() : [];
  const completedRows = getProgramCompletedRows(progressWeeks);
  const pct = Math.round((PROGRAM_DATA.day / PROGRAM_DATA.totalDays) * 100);
  const daysLeft = Math.max(PROGRAM_DATA.totalDays - PROGRAM_DATA.day, 0);
  const defaultSession = PROGRAM_DATA.weekSessions.find((session) => session.status === 'today') || PROGRAM_DATA.weekSessions[0];
  const [selectedSessionId, setSelectedSessionId] = React.useState(defaultSession.id);
  const selectedSession = PROGRAM_DATA.weekSessions.find((session) => session.id === selectedSessionId) || defaultSession;
  const totalSessions = PROGRAM_DATA.weekSessions.length;
  const completedSessions = PROGRAM_DATA.weekSessions.filter((session) => session.status === 'done').length;
  const todaySession = PROGRAM_DATA.weekSessions.find((session) => session.status === 'today');

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
          Ton plan jusqu'au<br /><span style={{ fontStyle: 'italic', color: T.accentInk }}>retour au sport.</span>
        </div>
        <div style={{ marginTop: 12, fontFamily: T.sans, fontSize: 14, color: T.ink2, lineHeight: 1.45 }}>
          Semaine {PROGRAM_DATA.currentWeek} · jour {PROGRAM_DATA.day} sur {PROGRAM_DATA.totalDays}.
        </div>
      </div>

      <TodayProgramCard session={PROGRAM_DATA.nextSession} todaySession={todaySession} onStart={() => onStart(todaySession?.exercises)} />
      <ProgramProgress
        pct={pct}
        currentWeek={PROGRAM_DATA.currentWeek}
        completedSessions={completedSessions}
        totalSessions={totalSessions}
        daysLeft={daysLeft}
        onOpenHistory={onOpenHistory}
      />
      <WeeklyFocusCard focus={PROGRAM_DATA.weeklyFocus} />
      <DayProgramBlock
        sessions={PROGRAM_DATA.weekSessions}
        selectedSession={selectedSession}
        onSelectSession={setSelectedSessionId}
      />
    </div>
  );
}

function getProgramCompletedRows(weeks) {
  const source = window.getCompletedProgressWeeks
    ? window.getCompletedProgressWeeks(2)
    : weeks.filter((week) => !week.current).reverse().slice(0, 2);

  return source.map((week) => ({
    label: week.w,
    sessions: `${week.sessions}/${week.targetSessions} séances`,
    pain: week.pain,
    note: week.summary,
  }));
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

function ProgramProgress({ pct, currentWeek, completedSessions, totalSessions, daysLeft, onOpenHistory }) {
  return (
    <div style={{ margin: '22px 16px 0', padding: 20, borderRadius: 24, background: T.paper, border: `0.5px solid ${T.line}`, boxShadow: '0 18px 42px rgba(18,52,59,0.06)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontFamily: T.sans, fontSize: 12, letterSpacing: 0.4, textTransform: 'uppercase', color: T.ink3 }}>Avancement global</div>
        <div style={{ fontFamily: T.mono, fontSize: 13, color: T.ink }}>{pct}%</div>
      </div>
      <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        <ProgramStat label="Cette semaine" value={`${completedSessions}/${totalSessions}`} />
        <ProgramStat label="Phase actuelle" value={`Sem ${currentWeek}`} />
        <ProgramStat label="Reste estimé" value={`${daysLeft} j`} />
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

function TodayProgramCard({ session, todaySession, onStart }) {
  return (
    <div style={{ margin: '14px 16px 0', padding: 18, borderRadius: 24, background: `linear-gradient(145deg, ${T.ink} 0%, ${T.accentInk} 62%, #0D4F48 100%)`, color: T.paper, position: 'relative', overflow: 'hidden', boxShadow: '0 24px 55px rgba(18,52,59,0.22)' }}>
      <div style={{ position: 'absolute', right: -54, top: -64, width: 172, height: 172, borderRadius: 999, background: 'rgba(255,255,255,0.08)' }} />
      <div style={{ position: 'absolute', left: -52, bottom: -76, width: 154, height: 154, borderRadius: 999, background: 'rgba(221,243,241,0.12)' }} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: T.sans, fontSize: 13, letterSpacing: 0.5, textTransform: 'uppercase', opacity: 0.78 }}>
          <Icons.dot size={7} stroke={T.accentSoft} />
          Prochaine action
        </div>
        {todaySession && (
          <div style={{ padding: '6px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.12)', border: '0.5px solid rgba(255,255,255,0.18)', fontFamily: T.mono, fontSize: 12 }}>
            {todaySession.day} · aujourd'hui
          </div>
        )}
      </div>
      <div style={{ marginTop: 10, fontFamily: T.display, fontSize: 25, lineHeight: 1.12 }}>
        {session.title}
      </div>
      <div style={{ marginTop: 8, fontFamily: T.sans, fontSize: 14, lineHeight: 1.45, opacity: 0.84 }}>
        {session.time} · {session.detail}
      </div>
      <div style={{ marginTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <DarkChip label="objectif: contrôle du genou" />
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

function DayProgramBlock({ sessions, selectedSession, onSelectSession }) {
  const exercises = selectedSession.exercises || [];
  const totalSets = exercises.reduce((sum, ex) => sum + ex.sets, 0);


  return (
    <div style={{ padding: '24px 16px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0 4px' }}>
        <SectionLabel>Programme du jour</SectionLabel>
        <div style={{ fontFamily: T.mono, fontSize: 12, color: T.ink3 }}>
          {exercises.length} exercices · {totalSets} séries
        </div>
      </div>

      <div style={{ marginTop: 12, padding: 14, borderRadius: 22, background: T.paper, border: `0.5px solid ${T.line}`, boxShadow: '0 18px 42px rgba(18,52,59,0.06)' }}>
        <div style={{ padding: '0 2px 12px', fontFamily: T.sans, fontSize: 13, lineHeight: 1.45, color: T.ink2 }}>
          Change de séance pour voir les autres plans prévus cette semaine.
        </div>

        <WorkoutPlanCarousel
          sessions={sessions}
          selectedSession={selectedSession}
          onSelectSession={onSelectSession}
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

function WorkoutPlanCarousel({ sessions, selectedSession, onSelectSession }) {
  return (
    <div style={{ display: 'flex', gap: 10, overflowX: 'auto', padding: '0 0 12px', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}>
      {sessions.map((session) => (
        <WorkoutPlanCard
          key={session.id}
          session={session}
          active={session.id === selectedSession.id}
          onSelect={() => onSelectSession(session.id)}
        />
      ))}
    </div>
  );
}

function WorkoutPlanCard({ session, active, onSelect }) {
  const done = session.status === 'done';
  const today = session.status === 'today';
  const tone = active
    ? { bg: `linear-gradient(145deg, ${T.ink}, ${T.accentInk})`, fg: T.paper, muted: T.accentSoft, border: T.accentInk, shadow: '0 16px 32px rgba(18,52,59,0.20)' }
    : today
      ? { bg: `linear-gradient(160deg, ${T.accentSoft}, ${T.paper})`, fg: T.ink, muted: T.accentInk, border: T.line2, shadow: '0 10px 24px rgba(8,127,140,0.08)' }
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
          {session.day}
        </div>
        <div style={{ padding: '5px 8px', borderRadius: 999, background: active ? 'rgba(255,255,255,0.13)' : T.paper, border: active ? '0.5px solid rgba(255,255,255,0.18)' : `0.5px solid ${T.line}`, fontFamily: T.mono, fontSize: 10, color: active ? T.paper : done ? T.sage : today ? T.accentInk : T.ink3, whiteSpace: 'nowrap' }}>
          {today ? 'Aujourd\'hui' : done ? 'Fait' : 'À venir'}
        </div>
      </div>
      <div style={{ marginTop: 12, fontFamily: T.sans, fontSize: 14, lineHeight: 1.2, fontWeight: 600, color: tone.fg }}>
        {session.title}
      </div>
      <div style={{ marginTop: 5, fontFamily: T.sans, fontSize: 12, lineHeight: 1.35, color: active ? T.accentSoft : tone.muted }}>
        {session.meta}
      </div>
    </button>
  );
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
            {ex.sets} × {ex.reps}
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

function CompletedBlock({ rows, onOpenHistory }) {
  return (
    <div style={{ padding: '24px 16px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0 4px' }}>
        <SectionLabel>Déjà complété</SectionLabel>
        <div onClick={onOpenHistory} style={{ fontFamily: T.sans, fontSize: 12, color: T.accentInk, cursor: 'pointer' }}>
          Voir progrès
        </div>
      </div>
      <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {rows.map((row) => (
          <div key={row.label} style={{ padding: 14, borderRadius: 18, background: T.paper, border: `0.5px solid ${T.line}`, boxShadow: '0 10px 24px rgba(18,52,59,0.05)' }}>
            <div style={{ fontFamily: T.mono, fontSize: 12, color: T.ink3 }}>{row.label}</div>
            <div style={{ marginTop: 6, fontFamily: T.sans, fontSize: 14, fontWeight: 500, color: T.ink }}>{row.sessions}</div>
            <div style={{ marginTop: 4, fontFamily: T.sans, fontSize: 13, color: T.ink3 }}>Douleur moyenne {row.pain} · {row.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MilestoneBlock({ items }) {
  return (
    <div style={{ padding: '24px 16px 0' }}>
      <SectionLabel>À venir</SectionLabel>
      <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((item) => (
          <div key={item.when} style={{ padding: 14, borderRadius: 18, background: T.paper2, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <Icons.calendar size={17} stroke={T.amber} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: T.mono, fontSize: 12, color: T.ink3 }}>{item.when}</div>
              <div style={{ marginTop: 3, fontFamily: T.sans, fontSize: 13, lineHeight: 1.4, color: T.ink }}>{item.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

window.ProgramScreen = ProgramScreen;
