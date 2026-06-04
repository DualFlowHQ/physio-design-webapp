// History / progress screen
const PROGRESS_PHASES = [
  { id: 'stop-bobo', label: 'Stop bobo', weeks: 'Mars', status: 'done', note: 'Faire redescendre les pics et protéger la hanche' },
  { id: 'marche', label: 'Marcher', weeks: 'Mars-avril', status: 'done', note: 'Reprendre une marche plus régulière' },
  { id: 'mobilite', label: 'Mobilité', weeks: 'Avril', status: 'done', note: 'Bouger sans protection excessive' },
  { id: 'force', label: 'Force', weeks: 'Mai-juin', status: 'current', note: 'Abducteurs, fessiers, squat et pont' },
  { id: 'retour', label: 'Retour', weeks: 'À confirmer', status: 'future', note: 'Retour progressif selon douleur et tests' },
];

function HistoryScreen({ onBack }) {
  const weeks = window.getProgressWeeks ? window.getProgressWeeks() : [];
  const currentWeek = weeks.find((week) => week.current) || weeks[weeks.length - 1];
  const firstWeek = weeks[0] || currentWeek;
  const painDelta = (firstWeek.pain - currentWeek.pain).toFixed(1);
  const averageAdherence = Math.round(weeks.reduce((sum, week) => sum + week.adherence, 0) / weeks.length);


  return (
    <div style={{ background: T.bg, minHeight: '100%', paddingBottom: 120 }}>
      <div style={{ padding: '60px 16px 8px', display: 'flex', gap: 12, alignItems: 'center' }}>
        <div
          onClick={onBack}
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
          <Icons.chevL size={18} stroke={T.ink2} />
        </div>
        <div style={{ flex: 1 }} />
      </div>
      <div style={{ padding: '8px 24px 0' }}>
        <div style={{ fontFamily: T.sans, fontSize: 12, letterSpacing: 0.5, textTransform: 'uppercase', color: T.ink3 }}>Progression</div>
        <div style={{ marginTop: 6, fontFamily: T.display, fontSize: 36, lineHeight: 1.05, letterSpacing: -0.4, color: T.ink }}>
          Depuis le 4 mars<br /><span style={{ fontStyle: 'italic', color: T.accentInk }}>plus stable.</span>
        </div>
      </div>

      <InsightCard painDelta={painDelta} adherence={averageAdherence} currentWeek={currentWeek} />
      
      <div style={{ height: 1, background: T.line, margin: '32px 24px 8px' }} />


      <div style={{ padding: '24px 16px 0' }}>
        <div style={{ fontFamily: T.sans, fontSize: 12, letterSpacing: 0.5, textTransform: 'uppercase', color: T.ink3, padding: '0 4px' }}>
          À venir
        </div>
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {PROGRESS_MILESTONES.map((item) => (
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

      <div style={{ height: 1, background: T.line, margin: '32px 24px 8px' }} />

      <WeeklyTable weeks={weeks} />
      
      <div style={{ height: 1, background: T.line, margin: '32px 24px 8px' }} />
      
      <ProgressJourneyCarousel phases={PROGRESS_PHASES} />
    </div>
  );
}

const PROGRESS_MILESTONES = [
  { when: '1er avril', text: 'Début du programme quotidien: montée de genou avec élastique, abduction et fessier' },
  { when: '8 mai', text: 'Ajout du squat et du pont: 5 exercices au total' },
  { when: 'Fin', text: 'À confirmer avec le physio selon douleur, marche et force' },
];


function InsightCard({ painDelta, adherence, currentWeek }) {
  return (
    <div style={{ margin: '22px 16px 0', padding: 20, borderRadius: 24, background: T.paper, border: `0.5px solid ${T.line}`, boxShadow: '0 18px 42px rgba(18,52,59,0.06)' }}>
      <div style={{ fontFamily: T.sans, fontSize: 12, letterSpacing: 0.4, textTransform: 'uppercase', color: T.ink3 }}>
        Lecture rapide
      </div>
      <div style={{ marginTop: 8, fontFamily: T.display, fontSize: 28, lineHeight: 1.08, color: T.ink }}>
        Ta douleur moyenne<br />est en baisse régulière.
      </div>
      <div style={{ marginTop: 10, fontFamily: T.sans, fontSize: 14, lineHeight: 1.48, color: T.ink2 }}>
        Depuis la semaine 1, la douleur moyenne a baissé de <b style={{ color: T.ink }}>{painDelta}</b> points. C'est le signal principal ici.
      </div>
      <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <OverviewStat label="Douleur moyenne de la semaine" value={`${currentWeek.pain}/10`} tone="good" />
        <OverviewStat label="Adhérence" value={`${adherence}%`} tone="neutral" />
      </div>
    </div>
  );
}

function OverviewStat({ label, value, tone }) {
  const colors = tone === 'good'
    ? { bg: T.sageSoft, fg: T.sage }
    : tone === 'accent'
      ? { bg: T.accentSoft, fg: T.accentInk }
      : { bg: T.paper2, fg: T.ink };

  return (
    <div style={{ padding: '10px 8px', borderRadius: 14, background: colors.bg, textAlign: 'center' }}>
      <div style={{ fontFamily: T.mono, fontSize: 15, color: colors.fg }}>{value}</div>
      <div style={{ marginTop: 3, fontFamily: T.sans, fontSize: 11, lineHeight: 1.25, color: T.ink3 }}>{label}</div>
    </div>
  );
}

function ProgressJourneyCarousel({ phases }) {
  const [active, setActive] = React.useState(0);
  const railRef = React.useRef(null);
  const panels = [
    { id: 'phases', label: 'Phases', title: 'Phases du plan' },
    { id: 'milestones', label: 'Étapes', title: 'Étapes' },
  ];

  const scrollToPanel = (idx) => {
    setActive(idx);
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.children[idx];
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  };

  const onScroll = () => {
    const rail = railRef.current;
    if (!rail) return;
    const idx = Math.round(rail.scrollLeft / Math.max(rail.clientWidth - 24, 1));
    setActive(Math.max(0, Math.min(idx, panels.length - 1)));
  };

  return (
    <div style={{ margin: '20px 16px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '0 4px 10px' }}>
        <div style={{ fontFamily: T.sans, fontSize: 12, letterSpacing: 0.5, textTransform: 'uppercase', color: T.ink3 }}>
          Parcours complet
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {panels.map((panel, idx) => (
            <button
              key={panel.id}
              onClick={() => scrollToPanel(idx)}
              style={{
                minWidth: 44,
                height: 44,
                padding: '0 10px',
                borderRadius: 999,
                border: `0.5px solid ${active === idx ? T.accent : T.line}`,
                background: active === idx ? `linear-gradient(135deg, ${T.accentSoft}, ${T.paper})` : T.paper,
                color: active === idx ? T.accentInk : T.ink3,
                boxShadow: active === idx ? '0 10px 22px rgba(8,127,140,0.10)' : 'none',
                fontFamily: T.sans,
                fontSize: 12,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              {panel.label}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={railRef}
        onScroll={onScroll}
        style={{
          display: 'flex',
          gap: 12,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          overscrollBehaviorX: 'contain',
          WebkitOverflowScrolling: 'touch',
          paddingBottom: 4,
          scrollbarWidth: 'none',
        }}
      >
        <JourneyPanel title="Phases du plan">
          <div style={{ fontFamily: T.sans, fontSize: 13, lineHeight: 1.45, color: T.ink2 }}>
            Cette vue aide à lire où tu te situes dans la rééducation globale, pas seulement dans la semaine en cours.
          </div>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {phases.map((phase, i) => <ProgressPhaseRow key={phase.id} phase={phase} isLast={i === phases.length - 1} />)}
          </div>
        </JourneyPanel>

        <JourneyPanel title="Étapes">
          <div style={{ fontFamily: T.sans, fontSize: 13, lineHeight: 1.45, color: T.ink2 }}>
            Les jalons marquent les validations importantes déjà franchies et les prochains caps cliniques.
          </div>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Milestone when="4 mars" text="Début des symptômes de hanche" done />
            <Milestone when="1er avr." text="Programme quotidien lancé avec 3 exercices" done />
            <Milestone when="8 mai" text="Squat et pont ajoutés au programme" done />
            <Milestone when="Sem 14" text="Douleur stable autour de 4/10" done current />
            <Milestone when="Fin" text="À confirmer avec le physio" />
          </div>
        </JourneyPanel>
      </div>

      <div style={{ marginTop: 8, display: 'flex', justifyContent: 'center', gap: 6 }}>
        {panels.map((panel, idx) => (
          <button
            key={`${panel.id}-dot`}
            onClick={() => scrollToPanel(idx)}
            aria-label={panel.title}
            style={{
              width: 28,
              height: 24,
              borderRadius: 999,
              border: 'none',
              background: 'transparent',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <span
              style={{
                width: active === idx ? 18 : 7,
                height: 7,
                borderRadius: 999,
                background: active === idx ? T.accent : T.line2,
                transition: 'width 180ms ease, background 180ms ease',
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function JourneyPanel({ title, children }) {
  return (
    <div
      style={{
        flex: '0 0 calc(100% - 24px)',
        scrollSnapAlign: 'start',
        padding: 18,
        borderRadius: 22,
        background: `linear-gradient(180deg, ${T.paper}, ${T.paper2})`,
        border: `0.5px solid ${T.line}`,
        boxShadow: '0 18px 42px rgba(18,52,59,0.06)',
      }}
    >
      <div style={{ fontFamily: T.sans, fontSize: 12, letterSpacing: 0.5, textTransform: 'uppercase', color: T.ink3 }}>
        {title}
      </div>
      <div style={{ marginTop: 12 }}>{children}</div>
    </div>
  );
}

function ProgressPhaseRow({ phase, isLast }) {
  const current = phase.status === 'current';
  const done = phase.status === 'done';
  const statusLabel = current ? 'En cours' : done ? 'Validé' : phase.status === 'next' ? 'Ensuite' : 'Plus tard';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '34px 1fr', gap: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 999,
            background: current ? T.accent : done ? T.sage : T.paper,
            border: current || done ? 'none' : `0.5px solid ${T.line2}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {done ? <Icons.check size={13} stroke={T.paper} sw={2.4} /> : current ? <Icons.dot size={9} stroke={T.paper} /> : null}
        </div>
        {!isLast && <div style={{ width: 1, flex: 1, minHeight: 38, background: done || current ? T.accentSoft : T.line }} />}
      </div>
      <div
        style={{
          padding: '12px 14px',
          borderRadius: 18,
          background: current ? `linear-gradient(150deg, ${T.accentSoft}, ${T.paper})` : T.paper,
          border: `0.5px solid ${current ? T.line2 : T.line}`,
          opacity: phase.status === 'future' ? 0.62 : 1,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: current ? 600 : 500, color: T.ink }}>{phase.label}</div>
            <div style={{ marginTop: 2, fontFamily: T.mono, fontSize: 11, color: T.ink3 }}>{statusLabel}</div>
          </div>
          <div style={{ fontFamily: T.mono, fontSize: 12, color: T.ink3, whiteSpace: 'nowrap' }}>{phase.weeks}</div>
        </div>
        <div style={{ marginTop: 4, fontFamily: T.sans, fontSize: 13, color: T.ink2, lineHeight: 1.35 }}>{phase.note}</div>
      </div>
    </div>
  );
}

function WeeklyTable({ weeks }) {
  const [open, setOpen] = React.useState(false);
  const currentWeek = weeks.find((week) => week.current) || weeks[weeks.length - 1];
  const displayWeeks = weeks.slice().reverse();

  return (
    <div style={{ margin: '20px 16px 0' }}>
      <div
        style={{
          background: T.paper,
          border: `0.5px solid ${T.line}`,
          borderRadius: 22,
          overflow: 'hidden',
          boxShadow: '0 18px 42px rgba(18,52,59,0.06)',
        }}
      >
        <button
          onClick={() => setOpen(!open)}
          style={{
            width: '100%',
            minHeight: 64,
            padding: '14px 18px',
            border: 'none',
            background: open ? `linear-gradient(135deg, ${T.accentSoft}, ${T.paper})` : T.paper,
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'center',
            gap: 12,
            textAlign: 'left',
            cursor: 'pointer',
          }}
        >
          <div>
            <div style={{ fontFamily: T.sans, fontSize: 12, letterSpacing: 0.5, textTransform: 'uppercase', color: T.ink3 }}>
              Par semaine
            </div>
            <div style={{ marginTop: 4, fontFamily: T.sans, fontSize: 13, lineHeight: 1.35, color: T.ink2 }}>
              Sem 14 · douleur {currentWeek.pain}/10
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ fontFamily: T.sans, fontSize: 12, color: T.accentInk, whiteSpace: 'nowrap' }}>
              {open ? 'Masquer' : 'Afficher'}
            </div>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 999,
                background: open ? T.paper : T.paper2,
                border: `0.5px solid ${T.line}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 180ms ease',
              }}
            >
              <Icons.chevD size={14} stroke={T.ink2} />
            </div>
          </div>
        </button>

        {open && (
          <div style={{ borderTop: `0.5px solid ${T.line}` }}>
            {displayWeeks.map((week, i) => (
              <WeekRow key={week.w} week={week} last={i === displayWeeks.length - 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function WeekRow({ week, last }) {
  const painTone = week.pain <= 3 ? T.sage : week.pain <= 5 ? T.amber : T.danger;

  return (
    <div
      style={{
        padding: '14px 18px',
        display: 'grid',
        gridTemplateColumns: '48px 1fr 110px',
        alignItems: 'center',
        gap: 12,
        borderBottom: last ? 'none' : `0.5px solid ${T.line}`,
        background: week.current ? `linear-gradient(90deg, ${T.accentSoft}, ${T.paper})` : T.paper,
      }}
    >
      <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: week.current ? 600 : 500, color: T.ink }}>{week.w}</div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {Array.from({ length: 5 }).map((_, j) => (
            <div
              key={j}
              style={{
                flex: 1,
                height: 8,
                borderRadius: 2,
                background: j < Math.round(week.adherence / 20) ? T.accent : T.line,
              }}
            />
          ))}
        </div>
        <div style={{ marginTop: 5, fontFamily: T.sans, fontSize: 12, color: T.ink3 }}>
          {week.sessions} séance{week.sessions > 1 ? 's' : ''} · adhérence {week.adherence}%
        </div>
      </div>
      <div style={{ textAlign: 'right', lineHeight: 1.35 }}>
        <div style={{ fontFamily: T.mono, fontSize: 12, color: painTone }}>Douleur {week.pain}</div>
      </div>
    </div>
  );
}

function Milestone({ when, text, done, current }) {
  return (
    <div
      style={{
        padding: '12px 16px',
        borderRadius: 16,
        background: T.paper,
        border: `0.5px solid ${T.line}`,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        opacity: done || current ? 1 : 0.55,
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 999,
          background: current ? T.accent : done ? T.sage : T.paper2,
          border: done || current ? 'none' : `0.5px solid ${T.line}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {done ? <Icons.check size={14} stroke={T.paper} sw={2.5} /> : current ? <Icons.dot size={10} stroke={T.paper} /> : null}
      </div>
      <div style={{ fontFamily: T.mono, fontSize: 12, color: T.ink3, width: 48 }}>{when}</div>
      <div style={{ flex: 1, fontFamily: T.sans, fontSize: 14, color: T.ink }}>{text}</div>
    </div>
  );
}

window.HistoryScreen = HistoryScreen;
