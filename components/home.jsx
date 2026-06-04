// Home screen — "Today" focused
// Key UX move: single hero card = today's session. Readiness check-in is inline (not a separate journal).
// Rehab progress is surfaced first, then readiness, today's session, and secondary actions.

function HomeScreen({ onStart, onOpenHistory, onOpenLibrary, onOpenProgram, onOpenSensation, state, setState, profile }) {
  const firstName = profile?.firstName?.trim() || 'Gabriel';
  const condition = profile?.condition?.trim() || 'Douleur de hanche';
  const nextAppointment = profile?.nextAppointment?.trim() || 'Vendredi · 10h';
  const todayLabel = formatTodayLabel();

  return (
    <div style={{ background: T.bg, minHeight: '100%', paddingBottom: 120 }}>
      {/* Top bar — no nav, just context */}
      <div style={{ padding: '60px 24px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: T.sans, fontSize: 14, letterSpacing: 0.4, textTransform: 'uppercase', color: T.ink3 }}>
          {todayLabel}
        </div>
      </div>

      {/* Greeting */}
      <div style={{ padding: '8px 24px 0' }}>
        <div style={{ fontFamily: T.display, fontSize: 40, lineHeight: 1.05, color: T.ink, letterSpacing: -0.5 }}>
          Bonjour,<br/>
          <span style={{ fontStyle: 'italic', color: T.accentInk }}>{firstName}.</span>
        </div>
        <div style={{ marginTop: 10, fontFamily: T.sans, fontSize: 15, color: T.ink2, lineHeight: 1.45 }}>
          Semaine 14 · {condition} · <span style={{ color: T.accentInk }}>jour 93 depuis le 4 mars</span>
        </div>
      </div>

      <CurrentPainStory state={state} onOpen={onOpenLibrary} />

      {/* Average pain timeline — separated from current pain */}
      <PainTimelineCard />

      {/* Rehab progress — one story, now opens the full program map */}
      <ProgressStory onOpen={onOpenProgram} />

      {/* Readiness strip — inline check-in, skips the journal page */}
      <ReadinessStrip state={state} setState={setState} onOpenSensation={onOpenSensation} />

      {/* Today's session */}
      <TodayCard onStart={onStart} />

      {/* Secondary actions */}
      <div style={{ padding: '28px 24px 0' }}>
        <SectionLabel>Aussi aujourd'hui</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
          <MiniCard icon={<Icons.book size={22} stroke={T.sky}/>} label="Lexique" detail="Hanche · en 2 min" tint={T.skySoft} onClick={onOpenLibrary} />
          <MiniCard icon={<Icons.calendar size={22} stroke={T.amber}/>} label="Prochain RV" detail={nextAppointment} tint={T.amberSoft} />
          <MiniCard icon={<Icons.trend size={22} stroke={T.sage}/>} label="Progrès" detail="Voir la semaine" tint={T.sageSoft} onClick={onOpenHistory} />
        </div>
      </div>
    </div>
  );
}

function formatTodayLabel() {
  const locale = window.PhysioI18n?.getLang?.() === 'en' ? 'en-CA' : 'fr-CA';
  const parts = new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).formatToParts(new Date());
  const weekday = parts.find(part => part.type === 'weekday')?.value || 'Aujourd’hui';
  const day = parts.find(part => part.type === 'day')?.value || '';
  const month = parts.find(part => part.type === 'month')?.value || '';
  return `${weekday} · ${day} ${month}`.trim();
}

function CircleBtn({ icon, dot }) {
  return (
    <div style={{
      width: 40, height: 40, borderRadius: 999, background: T.paper,
      border: `0.5px solid ${T.line}`,
      boxShadow: '0 10px 24px rgba(18,52,59,0.06)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
    }}>
      {icon}
      {dot && <div style={{
        position: 'absolute', top: 9, right: 10, width: 7, height: 7, borderRadius: 99,
        background: T.accent, boxShadow: `0 0 0 2px ${T.paper}`
      }}/>}
    </div>
  );
}

function CurrentPainStory({ state, onOpen }) {
  let activeCheckin = state.checkin;
  let statusText = activeCheckin?.done ? 'Validée ce matin' : 'À confirmer';
  
  if (state.checkins?.later?.done) {
    activeCheckin = state.checkins.later;
    statusText = 'Validée 2h après';
  } else if (state.checkins?.now?.done) {
    activeCheckin = state.checkins.now;
    statusText = 'Validée après-séance';
  }

  const vocabulary = state.scaleVocabulary;
  const pain = Number.isFinite(activeCheckin?.pain) ? activeCheckin.pain : 0;
  const entry = window.getScaleEntry('pain', pain, vocabulary);
  const color = window.getScaleColor('pain', pain);

  return (
    <div
      style={{
        margin: '18px 16px 0',
        padding: '20px 20px 18px',
        borderRadius: 24,
        background: `linear-gradient(150deg, ${T.paper} 0%, ${T.dangerSoft} 100%)`,
        border: `0.5px solid ${T.line}`,
        boxShadow: '0 18px 42px rgba(18,52,59,0.06)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ fontFamily: T.sans, fontSize: 13, color: T.ink3, letterSpacing: 0.3, textTransform: 'uppercase' }}>
          Douleur actuelle
        </div>

      </div>

      <div style={{ marginTop: 14, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{
              width: 68,
              height: 68,
              borderRadius: 20,
              background: color,
              color: T.paper,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 14px 28px rgba(18,52,59,0.12)',
            }}>
              <div style={{ fontFamily: T.display, fontSize: 30, lineHeight: 1 }}>{pain}</div>
              <div style={{ fontFamily: T.mono, fontSize: 12, opacity: 0.84 }}>/10</div>
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                {entry.emoji ? (
                  <span style={{
                    width: 34,
                    height: 34,
                    borderRadius: 12,
                    background: T.paper,
                    border: `0.5px solid ${T.line}`,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                    boxShadow: '0 10px 20px rgba(18,52,59,0.05)',
                  }}>
                    {entry.emoji}
                  </span>
                ) : null}
                <div style={{ fontFamily: T.sans, fontSize: 18, fontWeight: 600, color: T.ink }}>
                  {entry.label}
                </div>
              </div>
              <div style={{ marginTop: 6, fontFamily: T.sans, fontSize: 14, lineHeight: 1.45, color: T.ink2 }}>
                {entry.short || entry.cue}
              </div>
              <div style={{ marginTop: 8, fontFamily: T.sans, fontSize: 13, lineHeight: 1.45, color: T.accentInk }}>
                {entry.anchor}
              </div>
            </div>
          </div>
        </div>

        <CurrentPainMedia src={entry.mediaUrl} pain={pain} />
      </div>
    </div>
  );
}

function CurrentPainMedia({ src, pain }) {
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || failed) return null;

  return (
    <div style={{
      width: 104,
      flexShrink: 0,
      overflow: 'hidden',
      borderRadius: 18,
      border: `0.5px solid ${T.line}`,
      background: T.paper,
      boxShadow: '0 10px 26px rgba(18,52,59,0.06)',
    }}>
      <img
        src={src}
        alt={`Repère visuel douleur ${pain}/10`}
        onError={() => setFailed(true)}
        style={{
          display: 'block',
          width: '100%',
          height: 116,
          objectFit: 'cover',
          background: T.paper2,
        }}
      />
    </div>
  );
}

function PainTimelineCard() {
  const [open, setOpen] = React.useState(false);
  const weeks = window.getProgressWeeks ? window.getProgressWeeks() : [];
  const currentWeek = weeks.find((week) => week.current) || weeks[weeks.length - 1] || null;
  const firstWeek = weeks[0] || currentWeek;
  const painDelta = currentWeek && firstWeek ? firstWeek.pain - currentWeek.pain : null;

  if (!weeks.length || !currentWeek || !firstWeek) return null;

  return (
    <div style={{
      margin: '16px 16px 0',
      padding: '20px',
      borderRadius: 24,
      background: T.paper,
      border: `0.5px solid ${T.line}`,
      boxShadow: '0 12px 28px rgba(18,52,59,0.05)',
    }}>
      <PainAverageTimeline 
        weeks={weeks}
        currentWeek={currentWeek}
        painDelta={painDelta}
        open={open}
        onToggle={() => setOpen(!open)}
      />
    </div>
  );
}

function PainAverageTimeline({ weeks, currentWeek, painDelta, open, onToggle }) {
  const firstWeek = weeks[0];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <div>
          <div style={{ fontFamily: T.sans, fontSize: 12, letterSpacing: 0.4, textTransform: 'uppercase', color: T.ink3 }}>
            Douleur moyenne depuis le debut
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <div style={{
            padding: '6px 10px',
            borderRadius: 999,
            background: T.sageSoft,
            color: T.sage,
            fontFamily: T.mono,
            fontSize: 12,
            whiteSpace: 'nowrap',
          }}>
            {formatPainDelta(painDelta)}
          </div>
          <button
            type="button"
            onClick={onToggle}
            style={{
              border: `0.5px solid ${T.line}`,
              background: T.paper,
              color: T.accentInk,
              fontFamily: T.sans,
              fontSize: 13,
              fontWeight: 600,
              padding: '8px 12px',
              borderRadius: 999,
              cursor: 'pointer',
              boxShadow: '0 10px 20px rgba(18,52,59,0.05)',
            }}
          >
            {open ? 'Masquer' : 'Afficher'}
          </button>
        </div>
      </div>

      {open ? (
        <div>
          <div style={{ marginTop: 5, fontFamily: T.sans, fontSize: 14, lineHeight: 1.45, color: T.ink2 }}>
            Depuis {firstWeek.w}, la moyenne est passee de <b style={{ color: T.ink }}>{firstWeek.pain}/10</b> a <b style={{ color: T.ink }}>{currentWeek.pain}/10</b>.
          </div>

          <div style={{ marginTop: 16 }}>
            <div style={{ height: 88, display: 'flex', alignItems: 'flex-end', gap: 8 }}>
              {weeks.map((week) => (
                <PainAverageBar key={week.w} week={week} />
              ))}
            </div>
            <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', gap: 8, fontFamily: T.sans, fontSize: 12, color: T.ink3 }}>
              <span>Debut</span>
              <span>Cette semaine</span>
            </div>
          </div>

          <div style={{ marginTop: 12, fontFamily: T.sans, fontSize: 13, lineHeight: 1.4, color: T.accentInk }}>
            Quand les barres descendent au fil des semaines, la reeducation va dans le bon sens.
          </div>
        </div>
      ) : null}
    </div>
  );
}

function PainAverageBar({ week }) {
  const tone = getPainAverageTone(week.pain, week.current);
  const height = Math.max(16, Math.round((week.pain / 10) * 70));

  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{
          width: '100%',
          maxWidth: 28,
          height,
          borderRadius: '12px 12px 6px 6px',
          background: tone.bg,
          border: `1px solid ${tone.border}`,
          boxShadow: week.current ? '0 10px 20px rgba(18,52,59,0.12)' : 'none',
          position: 'relative',
          margin: '0 auto',
        }}>
          {week.current ? (
            <div style={{
              position: 'absolute',
              top: -8,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 8,
              height: 8,
              borderRadius: 999,
              background: tone.border,
              boxShadow: `0 0 0 3px ${T.paper}`,
            }} />
          ) : null}
        </div>
      </div>
      <div style={{ marginTop: 8, textAlign: 'center', fontFamily: T.mono, fontSize: 11, color: tone.label }}>
        {week.w.replace('Sem ', 'S')}
      </div>
      <div style={{ marginTop: 2, textAlign: 'center', fontFamily: T.mono, fontSize: 11, color: T.ink3 }}>
        {week.pain}
      </div>
    </div>
  );
}

function getPainAverageTone(pain, current) {
  if (pain <= 3) {
    return {
      bg: current ? `linear-gradient(180deg, ${T.sage}, #0C6F4E)` : T.sageSoft,
      border: T.sage,
      label: current ? T.sage : T.ink3,
    };
  }
  if (pain <= 5) {
    return {
      bg: current ? `linear-gradient(180deg, ${T.amber}, #9C5711)` : T.amberSoft,
      border: T.amber,
      label: current ? T.amber : T.ink3,
    };
  }
  return {
    bg: current ? `linear-gradient(180deg, ${T.danger}, #9E3431)` : T.dangerSoft,
    border: T.danger,
    label: current ? T.danger : T.ink3,
  };
}

function formatPainDelta(painDelta) {
  if (!Number.isFinite(painDelta)) return '0.0 pt';
  if (painDelta > 0) return `-${painDelta.toFixed(1)} pts`;
  if (painDelta < 0) return `+${Math.abs(painDelta).toFixed(1)} pts`;
  return '0.0 pt';
}

// ─────────────────────────────────────────────────────────────
// Readiness strip: if not done, 3 taps inline; if done, show result with chip to edit
// ─────────────────────────────────────────────────────────────
function ReadinessStrip({ state, setState, onOpenSensation }) {
  let ctx = 'morning';
  let c = state.checkin;
  let label = 'ce matin';
  let subtitle = 'Douleur, énergie, sommeil · ~30 sec';
  let title = `Comment ça va, ${label}\u00a0?`;
  
  if (state.session?.stage === 'complete') {
    if (!state.checkins?.now?.done) {
      ctx = 'now';
      c = state.checkins.now;
      label = 'après-séance';
      subtitle = 'Douleur, fatigue, sensation · ~30 sec';
      title = `Comment ça va, ${label}\u00a0?`;
    } else if (!state.checkins?.later?.done) {
      ctx = 'later';
      c = state.checkins.later;
      label = '2h après';
      subtitle = 'Douleur, fatigue, sensation · ~30 sec';
      title = `Comment ça va, ${label}\u00a0?`;
    }
  }

  const done = c.done;
  const [expanded, setExpanded] = React.useState(false);
  
  const updateCheckin = (patch) => {
    if (ctx === 'morning') {
      setState({ checkin: { ...state.checkin, ...patch } });
    } else {
      setState({
        checkins: {
          ...state.checkins,
          [ctx]: { ...state.checkins[ctx], ...patch }
        }
      });
    }
  };

  const handleSave = () => {
    updateCheckin({ done: true, at: "enregistré à l'instant" });
    setExpanded(false);
  };
  
  const handleEdit = () => {
    updateCheckin({ done: false });
    setExpanded(true);
  };

  if (!done) {
    if (!expanded) {
      return (
        <div style={{ margin: '16px 16px 0', padding: '12px 14px', borderRadius: 20, background: T.paper, border: `0.5px solid ${T.line}`, boxShadow: '0 12px 28px rgba(18,52,59,0.05)',
          display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 999, background: T.paper2,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            {ctx === 'morning' ? <Icons.sun size={16} stroke={T.accent}/> : <Icons.play size={16} stroke={T.accent}/>}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 500, color: T.ink }}>{title}</div>
            <div style={{ marginTop: 2, fontFamily: T.sans, fontSize: 12, color: T.ink3 }}>{subtitle}</div>
          </div>
          <div onClick={()=>setExpanded(true)} style={{
            padding: '8px 12px', borderRadius: 999, background: T.ink, color: T.paper,
            fontFamily: T.sans, fontSize: 13, fontWeight: 500, cursor: 'pointer',
          }}>Afficher</div>
        </div>
      );
    }

    return (
      <div style={{ margin: '18px 16px 0', padding: 15, borderRadius: 22, background: T.paper, border: `0.5px solid ${T.line}`, boxShadow: '0 14px 34px rgba(18,52,59,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ fontFamily: T.sans, fontSize: 15, fontWeight: 500, color: T.ink }}>{title}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <div style={{ fontFamily: T.sans, fontSize: 13, color: T.ink3 }}>~30 sec</div>
            <div onClick={()=>setExpanded(false)} style={{
              padding: '7px 11px', borderRadius: 999, background: T.paper2, border: `0.5px solid ${T.line}`,
              fontFamily: T.sans, fontSize: 12, color: T.ink2, cursor: 'pointer',
            }}>Masquer</div>
          </div>
        </div>
        
        {ctx === 'morning' ? (
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <DotScale label="Douleur à la hanche" value={c.pain} onChange={(v)=>updateCheckin({pain:v})} color={T.accent}/>
            <DotScale label="Énergie" value={c.energy} onChange={(v)=>updateCheckin({energy:v})} color={T.sage}/>
            <DotScale label="Sommeil" value={c.sleep} onChange={(v)=>updateCheckin({sleep:v})} color={T.sky}/>
          </div>
        ) : (
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <DotScale label="Douleur" value={c.pain ?? 2} onChange={(v)=>updateCheckin({pain:v})} color={T.accent}/>
            <DotScale label="Fatigue" value={c.fatigue ?? 4} onChange={(v)=>updateCheckin({fatigue:v})} color={T.sky}/>
            
            <div style={{ marginTop: 4 }}>
              <div style={{ fontFamily: T.sans, fontSize: 14, color: T.ink2 }}>Sensation principale</div>
              <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {['Stable', 'Tiraillement', 'Pincement', 'Raideur', 'Fatigue musculaire'].map(option => {
                  const active = (c.sensation ?? 'Stable') === option;
                  return (
                    <div key={option} onClick={()=>updateCheckin({sensation:option})} style={{
                      padding: '7px 10px', borderRadius: 999, cursor: 'pointer',
                      background: active ? T.ink : T.paper2,
                      color: active ? T.paper : T.ink2,
                      border: `0.5px solid ${active ? T.ink : T.line}`,
                      fontFamily: T.sans, fontSize: 12, fontWeight: active ? 600 : 500,
                    }}>{option}</div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <ReadinessDetails c={c} updateCheckin={updateCheckin} />

        <button onClick={handleSave}
          style={{
            marginTop: 14, width: '100%', height: 40, borderRadius: 999, border: 'none',
            background: T.ink, color: T.paper, fontFamily: T.sans, fontSize: 14, fontWeight: 500, cursor: 'pointer'
          }}>Enregistrer</button>
      </div>
    );
  }

  const spotCount = Object.keys(c.painSpots || {}).length;
  return (
    <div 
      onClick={onOpenSensation}
      style={{ margin: '22px 16px 0', padding: '14px 16px', borderRadius: 22, background: T.paper, border: `0.5px solid ${T.line}`, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
      <Icons.check size={18} stroke={T.sage}/>
      <div style={{ flex: 1, fontFamily: T.sans, fontSize: 14, color: T.ink, lineHeight: 1.4 }}>
        Enregistré ({label}) · douleur <b>{c.pain}</b>, 
        {ctx === 'morning' ? (
          <> énergie <b>{c.energy}</b>, sommeil <b>{c.sleep}</b></>
        ) : (
          <> fatigue <b>{c.fatigue ?? 4}</b></>
        )}
        {spotCount > 0 && <span style={{ color: T.ink3 }}> · {spotCount} zone{spotCount>1?'s':''}</span>}
        {c.note && <div style={{ marginTop: 4, fontSize: 13, color: T.ink2, fontStyle: 'italic',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>«&nbsp;{c.note}&nbsp;»</div>}
      </div>
    </div>
  );
}

function ReadinessDetails({ c, updateCheckin }) {
  const [expanded, setExpanded] = React.useState(
    (c.note && c.note.length > 0) || Object.keys(c.painSpots || {}).length > 0
  );
  const spotCount = Object.keys(c.painSpots || {}).length;

  if (!expanded) {
    return (
      <div onClick={()=>setExpanded(true)} style={{
        marginTop: 14, padding: '10px 14px', borderRadius: 14,
        background: T.paper2, border: `0.5px dashed ${T.line2}`, cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <Icons.plus size={14} stroke={T.ink3}/>
        <span style={{ flex: 1, fontFamily: T.sans, fontSize: 14, color: T.ink2 }}>
          Ajouter un détail ou pointer une zone
        </span>
        <span style={{ fontFamily: T.sans, fontSize: 12, color: T.ink3 }}>facultatif</span>
      </div>
    );
  }

  return (
    <div style={{ marginTop: 14, padding: 14, borderRadius: 16, background: T.paper2 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontFamily: T.sans, fontSize: 12, letterSpacing: 0.4, textTransform: 'uppercase', color: T.ink3 }}>
          Plus de détails {spotCount > 0 || c.note ? '' : '· facultatif'}
        </span>
        <span onClick={()=>setExpanded(false)} style={{ fontFamily: T.sans, fontSize: 13, color: T.ink3, cursor: 'pointer' }}>
          Replier
        </span>
      </div>

      <BodyMap spots={c.painSpots || {}} onChange={(s)=>updateCheckin({painSpots: s})}/>

      <div style={{ marginTop: 14, padding: '10px 12px', borderRadius: 12,
        background: T.paper, border: `0.5px solid ${T.line}` }}>
        <div style={{ fontFamily: T.sans, fontSize: 12, letterSpacing: 0.4, textTransform: 'uppercase', color: T.ink3 }}>
          Note personnelle
        </div>
        <textarea
          value={c.note || ''}
          onChange={e=>updateCheckin({note: e.target.value})}
          rows={3}
          placeholder="ex. Pincement en descendant les escaliers, ça réveille la nuit…"
          style={{ marginTop: 6, width: '100%', border: 'none', background: 'transparent', outline: 'none',
            resize: 'none', fontFamily: T.sans, fontSize: 14, color: T.ink, lineHeight: 1.5 }}
        />
      </div>
    </div>
  );
}

function DotScale({ label, value, onChange, color }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: T.sans, fontSize: 14, color: T.ink2 }}>
        <span>{label}</span>
        <span style={{ fontFamily: T.mono, color: T.ink }}>{value}/10</span>
      </div>
      <div style={{ marginTop: 8, display: 'flex', gap: 4 }}>
        {Array.from({length: 10}).map((_, i) => {
          const active = i < value;
          return (
            <div key={i} onClick={()=>onChange(i+1)} style={{
              flex: 1, height: 10, borderRadius: 4,
              background: active ? color : T.paper2,
              border: `0.5px solid ${active ? color : T.line}`,
              transition: 'all .15s',
            }}/>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Today's session hero card
// ─────────────────────────────────────────────────────────────
function TodayCard({ onStart }) {
  return (
    <div style={{ margin: '14px 16px 0', borderRadius: 28, overflow: 'hidden',
      background: `linear-gradient(145deg, ${T.ink} 0%, ${T.accentInk} 58%, #0D4F48 100%)`,
      color: T.paper, position: 'relative', padding: 18,
      boxShadow: '0 24px 55px rgba(18,52,59,0.22)',
    }}>
      {/* decorative lines */}
      <svg width="260" height="260" viewBox="0 0 260 260" style={{ position: 'absolute', right: -60, top: -60, opacity: 0.12 }}>
        <circle cx="130" cy="130" r="120" stroke={T.paper} strokeWidth="0.5" fill="none"/>
        <circle cx="130" cy="130" r="85" stroke={T.paper} strokeWidth="0.5" fill="none"/>
        <circle cx="130" cy="130" r="50" stroke={T.paper} strokeWidth="0.5" fill="none"/>
      </svg>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: T.sans, fontSize: 12, letterSpacing: 0.6, textTransform: 'uppercase', opacity: 0.72 }}>
        <Icons.dot size={8} stroke={T.accentSoft}/> Séance du jour
      </div>
      <div style={{ marginTop: 10, fontFamily: T.display, fontSize: 27, lineHeight: 1.08 }}>
        Force <span style={{ fontStyle: 'italic' }}>hanche</span>
      </div>
      <div style={{ marginTop: 13, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {['21 min', '5 exercices', '3 × 12'].map(label => (
          <span key={label} style={{
            padding: '6px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.12)',
            border: '0.5px solid rgba(255,255,255,0.18)',
            fontFamily: T.sans, fontSize: 13, color: T.paper,
          }}>{label}</span>
        ))}
      </div>
      <button onClick={onStart} style={{
        marginTop: 16, height: 48, width: '100%', borderRadius: 999, border: 'none',
        background: T.paper, color: T.ink, fontFamily: T.sans, fontSize: 15, fontWeight: 500,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer',
      }}>
        <Icons.play size={14} stroke={T.ink}/>
        Commencer la séance
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Rehab progress story
// ─────────────────────────────────────────────────────────────
function ProgressStory({ onOpen }) {
  const pct = 72;
  return (
    <div onClick={onOpen} style={{ margin: '14px 16px 0', padding: '20px 20px 18px', borderRadius: 22, background: `linear-gradient(150deg, ${T.paper2}, ${T.paper})`, border: `0.5px solid ${T.line}`, boxShadow: '0 18px 42px rgba(18,52,59,0.06)', cursor: 'pointer' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: T.sans, fontSize: 13, color: T.ink3, letterSpacing: 0.3, textTransform: 'uppercase' }}>
          Progression rééducation
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ fontFamily: T.mono, fontSize: 13, color: T.ink2 }}>{pct}%</div>
          <Icons.chev size={13} stroke={T.ink3}/>
        </div>
      </div>
      <div style={{ marginTop: 12, height: 6, borderRadius: 99, background: T.line, overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, width: `${pct}%`,
          background: `linear-gradient(90deg, ${T.sage}, ${T.accent})`, borderRadius: 99 }}/>
      </div>
      <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', gap: 8, fontFamily: T.sans, fontSize: 12, color: T.ink3 }}>
        {['Stop bobo', 'Marcher', 'Mobilité', <b key="k" style={{ color: T.accent }}>Force</b>, 'Retour'].map((l, i) => (
          <div key={i} style={{ textAlign: 'center', flex: 1 }}>{l}</div>
        ))}
      </div>
      <div style={{ marginTop: 14, fontFamily: T.display, fontSize: 18, lineHeight: 1.3, color: T.ink }}>
        Tu es dans la phase force. <span style={{ fontStyle: 'italic', color: T.ink2 }}>La fin reste à confirmer avec ton physio.</span>
      </div>
      <div style={{ marginTop: 10, fontFamily: T.sans, fontSize: 13, color: T.accentInk }}>
        Voir le plan complet
      </div>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ fontFamily: T.sans, fontSize: 13, letterSpacing: 0.5, textTransform: 'uppercase', color: T.ink3 }}>
      {children}
    </div>
  );
}

function MiniCard({ icon, label, detail, tint, onClick, badge }) {
  return (
    <div onClick={onClick} style={{
      background: T.paper, border: `0.5px solid ${T.line}`,
      boxShadow: '0 12px 28px rgba(18,52,59,0.05)',
      borderRadius: 20, padding: 14, cursor: 'pointer', position: 'relative',
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 12, background: tint,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{icon}</div>
      <div style={{ marginTop: 14, fontFamily: T.sans, fontSize: 14, fontWeight: 500, color: T.ink }}>{label}</div>
      <div style={{ marginTop: 2, fontFamily: T.sans, fontSize: 13, color: T.ink3 }}>{detail}</div>
      {badge ? (
        <div style={{ position: 'absolute', top: 12, right: 12, minWidth: 18, height: 18, padding: '0 6px',
          borderRadius: 99, background: T.accent, color: T.paper,
          fontFamily: T.mono, fontSize: 12, fontWeight: 600,
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{badge}</div>
      ) : null}
    </div>
  );
}

window.HomeScreen = HomeScreen;
window.SectionLabel = SectionLabel;
