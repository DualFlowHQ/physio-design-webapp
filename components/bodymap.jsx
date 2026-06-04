// BodyMap — tap zones on a stylised human silhouette to mark pain locations.
// Each zone has an intensity 0..3 (0 = none, 1 = gêne, 2 = douleur, 3 = vive).
// painSpots is an object: { zoneId: intensity }

const BODY_ZONES_FRONT = [
  { id: 'head',       cx: 50, cy: 9,   rx: 6,   ry: 7,   label: 'Tête' },
  { id: 'neck',       cx: 50, cy: 18,  rx: 3,   ry: 2.5, label: 'Cou' },
  { id: 'l-shoulder', cx: 38, cy: 23,  rx: 4.5, ry: 3.5, label: 'Épaule G' },
  { id: 'r-shoulder', cx: 62, cy: 23,  rx: 4.5, ry: 3.5, label: 'Épaule D' },
  { id: 'chest',      cx: 50, cy: 30,  rx: 9,   ry: 6,   label: 'Thorax' },
  { id: 'abdomen',    cx: 50, cy: 42,  rx: 7,   ry: 5,   label: 'Abdomen' },
  { id: 'l-elbow',    cx: 32, cy: 38,  rx: 3,   ry: 3,   label: 'Coude G' },
  { id: 'r-elbow',    cx: 68, cy: 38,  rx: 3,   ry: 3,   label: 'Coude D' },
  { id: 'l-wrist',    cx: 28, cy: 51,  rx: 3,   ry: 3,   label: 'Poignet G' },
  { id: 'r-wrist',    cx: 72, cy: 51,  rx: 3,   ry: 3,   label: 'Poignet D' },
  { id: 'l-hip',      cx: 44, cy: 53,  rx: 4,   ry: 3,   label: 'Hanche G' },
  { id: 'r-hip',      cx: 56, cy: 53,  rx: 4,   ry: 3,   label: 'Hanche D' },
  { id: 'l-thigh',    cx: 43, cy: 65,  rx: 4,   ry: 6,   label: 'Cuisse G' },
  { id: 'r-thigh',    cx: 57, cy: 65,  rx: 4,   ry: 6,   label: 'Cuisse D' },
  { id: 'l-knee',     cx: 43, cy: 76,  rx: 4,   ry: 3.5, label: 'Genou G' },
  { id: 'r-knee',     cx: 57, cy: 76,  rx: 4,   ry: 3.5, label: 'Genou D' },
  { id: 'l-shin',     cx: 43, cy: 86,  rx: 3.5, ry: 5,   label: 'Tibia G' },
  { id: 'r-shin',     cx: 57, cy: 86,  rx: 3.5, ry: 5,   label: 'Tibia D' },
  { id: 'l-ankle',    cx: 43, cy: 95,  rx: 3,   ry: 2.5, label: 'Cheville G' },
  { id: 'r-ankle',    cx: 57, cy: 95,  rx: 3,   ry: 2.5, label: 'Cheville D' },
];

function BodyMap({ spots, onChange, readonly }) {
  const [active, setActive] = React.useState(null);
  const [intensity, setIntensity] = React.useState(2);

  const colorFor = (lvl) => {
    if (!lvl) return null;
    if (lvl === 1) return T.amber;
    if (lvl === 2) return T.accent;
    return T.danger;
  };

  const tap = (id) => {
    if (readonly) return;
    const cur = spots[id] || 0;
    if (cur === intensity) {
      // already at this level — clear
      const { [id]: _, ...rest } = spots;
      onChange(rest);
    } else {
      onChange({ ...spots, [id]: intensity });
      setActive(id);
    }
  };

  const total = Object.keys(spots).length;
  const activeZone = active ? BODY_ZONES_FRONT.find(z => z.id === active) : null;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontFamily: T.sans, fontSize: 13, color: T.ink2 }}>Où ça fait mal&nbsp;?</span>
        <span style={{ fontFamily: T.mono, fontSize: 12, color: T.ink3 }}>
          {total === 0 ? 'tape sur le corps' : `${total} zone${total > 1 ? 's' : ''}`}
        </span>
      </div>

      {/* Intensity picker */}
      {!readonly && (
        <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
          {[
            [1, 'Gêne', T.amber],
            [2, 'Douleur', T.accent],
            [3, 'Vive', T.danger],
          ].map(([lvl, lbl, col]) => (
            <div key={lvl} onClick={()=>setIntensity(lvl)} style={{
              flex: 1, padding: '7px 0', borderRadius: 10, textAlign: 'center', cursor: 'pointer',
              background: intensity === lvl ? col : T.paper2,
              color: intensity === lvl ? T.paper : T.ink2,
              border: `0.5px solid ${intensity === lvl ? col : T.line}`,
              fontFamily: T.sans, fontSize: 12, fontWeight: 500,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}>
              <span style={{ width: 8, height: 8, borderRadius: 99, background: col,
                boxShadow: intensity === lvl ? `0 0 0 1.5px ${T.paper}` : 'none' }}/>
              {lbl}
            </div>
          ))}
        </div>
      )}

      {/* Silhouette */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'stretch' }}>
        <div style={{ flex: 1, padding: 10, borderRadius: 14, background: T.paper2, position: 'relative' }}>
          <svg viewBox="0 0 100 105" width="100%" style={{ display: 'block', maxHeight: 280 }}>
            <defs>
              <linearGradient id="skin" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.93 0.012 70)"/>
                <stop offset="100%" stopColor="oklch(0.88 0.015 65)"/>
              </linearGradient>
            </defs>
            {/* Silhouette path — stylised human, front view */}
            <path
              d="M50 2.5 c-3.5 0 -6.3 2.8 -6.3 6.5 c0 2.4 1.2 4.5 3 5.7 c-0.5 0.6 -0.8 1.4 -0.8 2.3 v1.5 c-3.2 0.5 -6.5 1.8 -9 3.6 c-3.5 2.5 -5.5 6.5 -5.5 11 v8 c0 1 -0.4 2 -1.1 2.7 l-3.8 4.2 c-0.7 0.7 -1.1 1.7 -1.1 2.7 v6.5 c0 1.4 0.4 2.7 1.2 3.8 l1.3 1.7 c0.7 1 1.1 2.1 1.1 3.3 c0 2 1.6 3.6 3.6 3.6 c1.5 0 2.8 -0.9 3.4 -2.2 v0.4 c0 0.7 0.3 1.5 0.7 2 l0.5 0.5 c0.3 0.3 0.5 0.7 0.5 1.2 v8 c0 0.7 0.1 1.4 0.4 2 l4.2 11.5 c0.4 1 0.6 2.2 0.6 3.3 v9 c0 0.7 0.2 1.4 0.5 2 c-0.3 0.5 -0.5 1.2 -0.5 1.9 v3 c0 1.5 1.2 2.7 2.7 2.7 h5 c1.5 0 2.7 -1.2 2.7 -2.7 v-2 c0 -0.5 -0.1 -1 -0.3 -1.5 c0.2 -0.7 0.3 -1.4 0.3 -2.1 v-9 c0 -1.6 0.2 -3.2 0.6 -4.7 l3 -10 c0.3 -0.9 0.4 -1.8 0.4 -2.8 v-7 c0 -0.5 0.4 -1 1 -1 s1 0.5 1 1 v7 c0 0.9 0.1 1.9 0.4 2.8 l3 10 c0.4 1.5 0.6 3.1 0.6 4.7 v9 c0 0.7 0.1 1.4 0.3 2.1 c-0.2 0.5 -0.3 1 -0.3 1.5 v2 c0 1.5 1.2 2.7 2.7 2.7 h5 c1.5 0 2.7 -1.2 2.7 -2.7 v-3 c0 -0.7 -0.2 -1.4 -0.5 -1.9 c0.3 -0.6 0.5 -1.3 0.5 -2 v-9 c0 -1.1 0.2 -2.3 0.6 -3.3 l4.2 -11.5 c0.3 -0.6 0.4 -1.3 0.4 -2 v-8 c0 -0.5 0.2 -0.9 0.5 -1.2 l0.5 -0.5 c0.4 -0.5 0.7 -1.3 0.7 -2 v-0.4 c0.6 1.3 1.9 2.2 3.4 2.2 c2 0 3.6 -1.6 3.6 -3.6 c0 -1.2 0.4 -2.3 1.1 -3.3 l1.3 -1.7 c0.8 -1.1 1.2 -2.4 1.2 -3.8 v-6.5 c0 -1 -0.4 -2 -1.1 -2.7 l-3.8 -4.2 c-0.7 -0.7 -1.1 -1.7 -1.1 -2.7 v-8 c0 -4.5 -2 -8.5 -5.5 -11 c-2.5 -1.8 -5.8 -3.1 -9 -3.6 v-1.5 c0 -0.9 -0.3 -1.7 -0.8 -2.3 c1.8 -1.2 3 -3.3 3 -5.7 c0 -3.7 -2.8 -6.5 -6.3 -6.5 z"
              fill="url(#skin)"
              stroke={T.line2}
              strokeWidth="0.3"
            />

            {/* Tap zones */}
            {BODY_ZONES_FRONT.map(z => {
              const lvl = spots[z.id] || 0;
              const col = colorFor(lvl);
              const isActive = active === z.id;
              return (
                <g key={z.id} onClick={()=>tap(z.id)} style={{ cursor: 'pointer' }}>
                  <ellipse cx={z.cx} cy={z.cy} rx={z.rx} ry={z.ry}
                    fill={col || 'transparent'}
                    fillOpacity={lvl ? 0.55 : 0}
                    stroke={isActive ? T.ink : (col || 'transparent')}
                    strokeWidth={isActive ? 0.4 : 0}
                    strokeDasharray={isActive ? '0.6 0.6' : 'none'}
                  />
                  {/* invisible bigger hit area */}
                  <ellipse cx={z.cx} cy={z.cy} rx={z.rx + 1} ry={z.ry + 1}
                    fill="transparent"/>
                </g>
              );
            })}

            {/* Pulse ring on active */}
            {activeZone && (
              <ellipse cx={activeZone.cx} cy={activeZone.cy}
                rx={activeZone.rx + 1.5} ry={activeZone.ry + 1.5}
                fill="none" stroke={colorFor(spots[active]) || T.accent} strokeWidth="0.4" opacity="0.5">
                <animate attributeName="rx" from={activeZone.rx} to={activeZone.rx + 3} dur="1s" repeatCount="indefinite"/>
                <animate attributeName="ry" from={activeZone.ry} to={activeZone.ry + 3} dur="1s" repeatCount="indefinite"/>
                <animate attributeName="opacity" from="0.6" to="0" dur="1s" repeatCount="indefinite"/>
              </ellipse>
            )}
          </svg>
        </div>

        {/* Selected zones list */}
        <div style={{ width: 110, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {total === 0 && (
            <div style={{ fontFamily: T.sans, fontSize: 12, color: T.ink3, lineHeight: 1.4,
              padding: 10, borderRadius: 10, background: T.paper2, height: '100%',
              display: 'flex', alignItems: 'center', textAlign: 'center' }}>
              Tape une zone pour la marquer
            </div>
          )}
          {Object.entries(spots).map(([id, lvl]) => {
            const z = BODY_ZONES_FRONT.find(x => x.id === id);
            if (!z) return null;
            return (
              <div key={id} style={{
                padding: '6px 8px', borderRadius: 10,
                background: T.paper, border: `0.5px solid ${T.line}`,
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <div style={{ width: 8, height: 8, borderRadius: 99, background: colorFor(lvl), flexShrink: 0 }}/>
                <div style={{ flex: 1, fontFamily: T.sans, fontSize: 12, color: T.ink, lineHeight: 1.2 }}>
                  {z.label}
                </div>
                {!readonly && (
                  <div onClick={()=>{ const { [id]: _, ...rest } = spots; onChange(rest); }}
                    style={{ cursor: 'pointer', color: T.ink3, fontSize: 14, lineHeight: 1, padding: 2 }}>×</div>
                )}
              </div>
            );
          })}
          {!readonly && total > 0 && (
            <div onClick={()=>onChange({})} style={{
              padding: '6px 8px', borderRadius: 10, textAlign: 'center', cursor: 'pointer',
              fontFamily: T.sans, fontSize: 12, color: T.ink3,
            }}>Tout effacer</div>
          )}
        </div>
      </div>
    </div>
  );
}

window.BodyMap = BodyMap;
window.BODY_ZONES_FRONT = BODY_ZONES_FRONT;
