// Post-session recap + check-in timeline
// For demo purposes, the 3 survey cards stay visible on one page so the
// follow-up questions are easy to show without waiting for timed prompts.

function RecapScreen({ onHome, state, setState, profile }) {
  const checkinItems = [
    { key_: 'tomorrow', when: 'Matin', relative: 'séance de la veille' },
    { key_: 'now', when: 'Après-séance', relative: 'séance du jour' },
    { key_: 'later', when: '2 h après', relative: 'séance du jour' },
  ];

  const firstName = profile?.firstName?.trim() || 'Marc';

  return (
    <div style={{ background: T.bg, minHeight: '100%', paddingBottom: 120 }}>
      <div style={{ padding: '60px 24px 0' }}>
        <div style={{ fontFamily: T.sans, fontSize: 12, letterSpacing: 0.5, textTransform: 'uppercase', color: T.ink3 }}>
          Journal des sensations
        </div>
        <div style={{ marginTop: 10, fontFamily: T.display, fontSize: 38, lineHeight: 1.05, color: T.ink, letterSpacing: -0.4 }}>
          Bien joué, {firstName}.<br/>
          <span style={{ fontStyle: 'italic', color: T.accentInk }}>Note tes sensations.</span>
        </div>
      </div>

      {/* Big numbers */}
      <div style={{ margin: '22px 16px 0', padding: 20, borderRadius: 24, background: T.paper, border: `0.5px solid ${T.line}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <Stat label="Exercices" value="6" sub="/ 6" />
          <Stat label="Séries" value="16" sub="/ 16" />
        </div>
        <div style={{ marginTop: 18, paddingTop: 16, borderTop: `0.5px solid ${T.line}`, fontFamily: T.sans, fontSize: 13, color: T.ink2, fontStyle: 'italic' }}>
          « Contrôle plus propre qu'hier sur les extensions. Pic de douleur sur les step-ups (3/10) — reste à surveiller. » — <span style={{ color: T.ink }}>résumé généré</span>
        </div>
      </div>

      {/* Check-in timeline */}
      <div style={{ margin: '20px 16px 0' }}>
        <div style={{ fontFamily: T.sans, fontSize: 12, letterSpacing: 0.5, textTransform: 'uppercase', color: T.ink3, padding: '0 4px 4px' }}>
          Sondages de la journée
        </div>
        <div style={{ background: T.paper, borderRadius: 24, border: `0.5px solid ${T.line}`, overflow: 'hidden', padding: 14 }}>
          {checkinItems.map(({ key_, when, relative }, index) => (
            <CheckinRow
              key={key_}
              when={when}
              relative={relative}
              state={state}
              setState={setState}
              key_={key_}
              isLast={index === checkinItems.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Saved follow-up */}
      <div style={{ margin: '16px 16px 0', padding: 16, borderRadius: 22, background: T.sageSoft, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <Icons.check size={18} stroke={T.sage} sw={2}/>
        <div style={{ flex: 1, fontFamily: T.sans, fontSize: 13, lineHeight: 1.45, color: T.accentInk }}>
Ton suivi est enregistré automatiquement. Les rappels post-séance restent visibles dans l’app.
        </div>
      </div>

      <div style={{ padding: '22px 16px 0' }}>
        <button onClick={onHome} style={{
          width: '100%', height: 52, borderRadius: 999, border: `0.5px solid ${T.line}`,
          background: T.paper, color: T.ink, fontFamily: T.sans, fontSize: 15, fontWeight: 500, cursor: 'pointer',
        }}>Retour à l'accueil</button>
      </div>
    </div>
  );
}

function Stat({ label, value, sub, accent }) {
  return (
    <div style={{ minWidth: 0 }}>
      <div style={{ fontFamily: T.sans, fontSize: 12, letterSpacing: 0.4, textTransform: 'uppercase', color: T.ink3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</div>
      <div style={{ marginTop: 6, display: 'flex', alignItems: 'baseline', gap: 4, whiteSpace: 'nowrap' }}>
        <span style={{ fontFamily: T.display, fontSize: 30, color: accent ? T.accent : T.ink, lineHeight: 1 }}>{value}</span>
        <span style={{ fontFamily: T.mono, fontSize: 12, color: T.ink3 }}>{sub}</span>
      </div>
    </div>
  );
}

function CheckinRow({ when, relative, state, setState, key_, isLast }) {
  const c = key_ === 'tomorrow' ? (state.checkin || { done: false }) : (state.checkins[key_] || { done: false });
  const showForm = !c.done;
  const highlight = showForm;
  const helperCopy = 'À remplir pour ce moment de la journée.';
  const recordedCopy = c.at || "enregistré";
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div 
      onClick={() => { if (!showForm) setExpanded(!expanded); }}
      style={{
        padding: '16px 18px',
        borderBottom: isLast ? 'none' : `0.5px solid ${T.line}`,
        display: 'flex', gap: 14,
        background: c.done ? T.paper2 : (highlight ? `linear-gradient(90deg, ${T.accentSoft}00, ${T.accentSoft}40)` : T.paper),
        cursor: !showForm ? 'pointer' : 'default',
      }}>
      {/* Timeline dot */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 2 }}>
        <div style={{
          width: 14, height: 14, borderRadius: 99,
          background: c.done ? T.sage : highlight ? T.accent : T.line2,
          border: `2px solid ${c.done ? T.paper2 : T.paper}`,
          boxShadow: highlight && !c.done ? `0 0 0 3px ${T.accentSoft}` : 'none',
        }}/>
        {!isLast && <div style={{ width: 1.5, flex: 1, minHeight: 28, background: T.line, marginTop: 4 }}/>}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: T.sans, fontSize: 15, fontWeight: 500, color: showForm ? T.ink : T.ink3, whiteSpace: 'nowrap' }}>{when}</div>
          <div style={{ fontFamily: T.mono, fontSize: 12, color: T.ink3, whiteSpace: 'nowrap', flexShrink: 0, marginLeft: 8 }}>{relative}</div>
        </div>

        {showForm ? (
          <>
            <div style={{ marginTop: 6, fontFamily: T.sans, fontSize: 13, color: T.ink3 }}>
              {helperCopy}
            </div>
            <InlineCheckin
              initialValues={undefined}
              onCancel={null}
              onSubmit={(vals) => {
                if (key_ === 'tomorrow') {
                  setState({
                    checkin: { ...state.checkin, ...vals, done: true, at: "enregistré à l'instant" }
                  });
                } else {
                  setState({
                    checkins: {
                      ...state.checkins,
                      [key_]: { ...state.checkins[key_], ...vals, done: true, at: "enregistré à l'instant" },
                    },
                  });
                }
              }}
            />
          </>
        ) : (
          <div>
            <div style={{ marginTop: 6, fontFamily: T.sans, fontSize: 13, color: T.ink2 }}>
              Douleur <b style={{ color: T.ink }}>{c.pain}</b> · {key_ === 'tomorrow' ? 'énergie' : 'fatigue'} <b style={{ color: T.ink }}>{key_ === 'tomorrow' ? (c.energy ?? c.fatigue ?? 6) : c.fatigue}</b>
              {key_ === 'tomorrow' && c.sleep != null && <span> · sommeil <b style={{ color: T.ink }}>{c.sleep}</b></span>}
              {c.sensation && <span> · {c.sensation}</span>}
              <span style={{ color: T.ink3 }}> · {recordedCopy}</span>
            </div>
            
            {c.note && !expanded && (
              <div style={{ marginTop: 4, color: T.ink3, fontStyle: 'italic',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                «&nbsp;{c.note}&nbsp;»
              </div>
            )}

            {expanded && (
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: `0.5px solid ${T.line}` }}>
                {c.painSpots && Object.keys(c.painSpots).length > 0 && (
                  <div style={{ marginBottom: 16 }}>
                    <window.BodyMap spots={c.painSpots} onChange={()=>{}} readonly={true} />
                  </div>
                )}
                
                {c.note && (
                  <div style={{ padding: '10px 12px', borderRadius: 12, background: T.paper, border: `0.5px solid ${T.line}` }}>
                    <div style={{ fontFamily: T.sans, fontSize: 12, letterSpacing: 0.4, textTransform: 'uppercase', color: T.ink3 }}>
                      Note personnelle
                    </div>
                    <div style={{ marginTop: 6, fontFamily: T.sans, fontSize: 14, color: T.ink, lineHeight: 1.45, fontStyle: 'italic' }}>
                      «&nbsp;{c.note}&nbsp;»
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function getCheckinRecordedCopy(key_, when) {
  return "enregistré";
}

function InlineCheckin({ initialValues, onSubmit, onCancel }) {
  const [pain, setPain] = React.useState(initialValues?.pain ?? 2);
  const [fatigue, setFatigue] = React.useState(initialValues?.fatigue ?? 4);
  const [sensation, setSensation] = React.useState(initialValues?.sensation ?? 'Stable');
  const [note, setNote] = React.useState(initialValues?.note ?? '');
  const sensationOptions = ['Stable', 'Tiraillement', 'Pincement', 'Raideur', 'Fatigue musculaire'];

  return (
    <div style={{ marginTop: 10 }}>
      <MicroScale label="Douleur" value={pain} onChange={setPain} color={T.accent}/>
      <div style={{ height: 8 }}/>
      <MicroScale label="Fatigue" value={fatigue} onChange={setFatigue} color={T.sky}/>

      <div style={{ marginTop: 12 }}>
        <div style={{ fontFamily: T.sans, fontSize: 13, color: T.ink2 }}>
          Sensation principale
        </div>
        <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {sensationOptions.map(option => {
            const active = sensation === option;
            return (
              <div key={option} onClick={()=>setSensation(option)} style={{
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

      <div style={{ marginTop: 12, padding: '10px 12px', borderRadius: 14, background: T.paper2, border: `0.5px solid ${T.line}` }}>
        <div style={{ fontFamily: T.sans, fontSize: 12, letterSpacing: 0.4, textTransform: 'uppercase', color: T.ink3 }}>
          Détail facultatif
        </div>
        <textarea
          value={note}
          onChange={e=>setNote(e.target.value)}
          rows={2}
          placeholder="ex. Pincement léger sur les step-ups, disparu après repos."
          style={{ marginTop: 6, width: '100%', border: 'none', background: 'transparent', outline: 'none',
            resize: 'none', fontFamily: T.sans, fontSize: 13, color: T.ink, lineHeight: 1.45 }}
        />
      </div>

      <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button onClick={()=>onSubmit({ pain, fatigue, sensation, note })} style={{
          height: 36, padding: '0 18px', borderRadius: 999, border: 'none',
          background: T.ink, color: T.paper, fontFamily: T.sans, fontSize: 14, fontWeight: 500, cursor: 'pointer',
        }}>{initialValues ? 'Enregistrer les modifications' : 'Enregistrer mes sensations'}</button>
        {onCancel && (
          <button onClick={onCancel} style={{
            height: 36, padding: '0 18px', borderRadius: 999,
            border: `0.5px solid ${T.line}`, background: T.paper,
            color: T.ink2, fontFamily: T.sans, fontSize: 14, fontWeight: 500, cursor: 'pointer',
          }}>Annuler</button>
        )}
      </div>
    </div>
  );
}

function MicroScale({ label, value, onChange, color }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: T.sans, fontSize: 13, color: T.ink2 }}>
        <span>{label}</span>
        <span style={{ fontFamily: T.mono, color: T.ink }}>{value}/10</span>
      </div>
      <div style={{ marginTop: 5, display: 'flex', gap: 3 }}>
        {Array.from({length: 11}).map((_, i) => (
          <div key={i} onClick={()=>onChange(i)} style={{
            flex: 1, height: 8, borderRadius: 3,
            background: i <= value ? color : T.paper2,
            border: `0.5px solid ${i <= value ? color : T.line}`,
          }}/>
        ))}
      </div>
    </div>
  );
}

window.RecapScreen = RecapScreen;
