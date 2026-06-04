import React from 'react';
import { loadBackendState, resetBackendState, saveBackendState } from './backendApi.js';

const STATE_KEY = 'physio_single_user_state';
const SCREEN_KEY = 'physio_single_user_screen';
const THEME_KEY = 'physio_single_user_theme';

const NAV_ITEMS = [
  { key: 'home', label: 'Accueil', icon: 'home' },
  { key: 'program', label: 'Programme', icon: 'calendar' },
  { key: 'session', label: 'Séance', icon: 'play' },
  { key: 'more', label: 'Plus', icon: 'settings' },
];

const MORE_ITEMS = [
  { key: 'history', label: 'Progrès', icon: 'trend' },
  { key: 'lexique', label: 'Lexique', icon: 'book' },
  { key: 'recap', label: 'Sensations', icon: 'check' },
  { key: 'profile', label: 'Profil', icon: 'user' },
];

const SCREEN_KEYS = new Set([...NAV_ITEMS, ...MORE_ITEMS].map((item) => item.key));
const normalizeScreenKey = (screen) => (SCREEN_KEYS.has(screen) ? screen : null);

export function RealApp() {
  const appDefaults = typeof TWEAK_DEFAULTS !== 'undefined'
    ? TWEAK_DEFAULTS
    : { theme: 'clinical', startScreen: 'home' };
  const [locale, setLocale] = window.PhysioI18n.useLocale();
  const [state, _setState] = React.useState(() => readSavedState());
  const [syncStatus, setSyncStatus] = React.useState('loading');
  const [screen, setScreen] = React.useState(() => {
    const forced = new URLSearchParams(location.search).get('screen');
    if (normalizeScreenKey(forced)) return forced;
    const saved = localStorage.getItem(SCREEN_KEY);
    if (normalizeScreenKey(saved)) return saved;
    return appDefaults.startScreen || 'home';
  });
  const [theme, setTheme] = React.useState(() => localStorage.getItem(THEME_KEY) || appDefaults.theme || 'clinical');
  const [moreOpen, setMoreOpen] = React.useState(false);

  const setState = React.useCallback((patch) => {
    _setState((prev) => {
      const next = normalizeAppState({ ...prev, ...patch });
      localStorage.setItem(STATE_KEY, JSON.stringify(next));
      setSyncStatus('saving');
      saveBackendState(next)
        .then(() => setSyncStatus('saved'))
        .catch(() => setSyncStatus('offline'));
      return next;
    });
  }, []);

  const goScreen = React.useCallback((next) => {
    setScreen(next);
    setMoreOpen(false);
    localStorage.setItem(SCREEN_KEY, next);
  }, []);

  React.useEffect(() => {
    let cancelled = false;

    loadBackendState()
      .then((savedState) => {
        if (cancelled) return;
        if (savedState) {
          const next = normalizeAppState(savedState);
          localStorage.setItem(STATE_KEY, JSON.stringify(next));
          _setState(next);
        }
        setSyncStatus('saved');
      })
      .catch(() => setSyncStatus('offline'));

    return () => {
      cancelled = true;
    };
  }, []);

  React.useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  React.useEffect(() => {
    window.PhysioI18n.start();
    window.PhysioI18n.applyNow();
  }, []);

  React.useEffect(() => {
    requestAnimationFrame(() => window.PhysioI18n.applyNow());
  }, [locale, screen, theme, state]);

  React.useEffect(() => {
    if (state.session.stage === 'complete' && screen === 'session') {
      goScreen('recap');
    }
  }, [goScreen, state.session.stage, screen]);

  const onStart = (exercises) => {
    setState({ session: freshSession(exercises) });
    goScreen('session');
  };

  const renderHomeScreen = () => (
    <HomeScreen
      onStart={onStart}
      onOpenHistory={() => goScreen('history')}
      onOpenLibrary={() => goScreen('lexique')}
      onOpenProgram={() => goScreen('program')}
      onOpenSensation={() => goScreen('recap')}
      state={state}
      setState={setState}
      profile={state.profile}
    />
  );

  const content = (() => {
    switch (screen) {
      case 'profile':
        return (
          <ProfileScreen
            profile={state.profile}
            locale={locale}
            onLocaleChange={setLocale}
            theme={theme}
            onThemeChange={setTheme}
            onSave={(profile) => {
              setState({ profile: { ...profile, setupDone: true } });
              goScreen('home');
            }}
            onReset={async () => {
              localStorage.removeItem(STATE_KEY);
              localStorage.removeItem(SCREEN_KEY);
              await resetBackendState().catch(() => {});
              location.reload();
            }}
          />
        );
      case 'home':
        return renderHomeScreen();
      case 'session':
        return <SessionScreen onExit={() => goScreen('program')} state={state} setState={setState} />;
      case 'recap':
        return <RecapScreen onHome={() => { goScreen('home'); setState({ session: freshSession() }); }} state={state} setState={setState} profile={state.profile} />;
      case 'program':
        return <ProgramScreen onBack={() => goScreen('home')} onStart={onStart} onOpenHistory={() => goScreen('history')} />;
      case 'history':
        return <HistoryScreen onBack={() => goScreen('home')} />;
      case 'lexique':
        return (
          <LexiqueScreen
            onBack={() => goScreen('home')}
            currentPainScore={state.checkin.pain}
            scaleVocabulary={state.scaleVocabulary}
            onScaleVocabularyChange={(scaleVocabulary) => setState({ scaleVocabulary })}
          />
        );
      default:
        return renderHomeScreen();
    }
  })();

  const activeNav = NAV_ITEMS.some((item) => item.key === screen) ? screen : 'more';

  return (
    <div className="real-app-shell">
      <main className="real-app-viewport">
        <div className="screen-host">{content}</div>
        {moreOpen && <MoreMenu active={screen} onNavigate={goScreen} />}
        <SyncBadge status={syncStatus} />
        <BottomNav
          active={activeNav}
          onNavigate={(key) => {
            if (key === 'more') {
              setMoreOpen((open) => !open);
              return;
            }
            goScreen(key);
          }}
        />
      </main>
    </div>
  );
}

function SyncBadge({ status }) {
  const label = {
    loading: 'Chargement',
    saving: 'Synchronisation',
    saved: 'Sauvegardé',
    offline: 'Hors ligne',
  }[status] || 'Sauvegardé';

  return (
    <div className={`sync-badge sync-badge-${status}`} aria-live="polite">
      {label}
    </div>
  );
}

function BottomNav({ active, onNavigate }) {
  return (
    <nav className="bottom-nav" aria-label="Navigation principale">
      <div className="bottom-nav-inner">
        {NAV_ITEMS.map((item) => {
          const IconComponent = Icons[item.icon];
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              type="button"
              className={`bottom-nav-item${isActive ? ' is-active' : ''}`}
              onClick={() => onNavigate(item.key)}
              aria-current={isActive ? 'page' : undefined}
            >
              {IconComponent ? <IconComponent size={19} stroke="currentColor" /> : null}
              <span className="bottom-nav-label">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function MoreMenu({ active, onNavigate }) {
  return (
    <div className="app-menu-sheet">
      <div className="app-menu-grid">
        {MORE_ITEMS.map((item) => {
          const IconComponent = Icons[item.icon];
          return (
            <button
              key={item.key}
              type="button"
              className="app-menu-button"
              onClick={() => onNavigate(item.key)}
              style={{
                background: active === item.key ? T.accentSoft : T.paper2,
                borderColor: active === item.key ? T.accent : T.line,
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {IconComponent ? <IconComponent size={17} stroke={active === item.key ? T.accentInk : T.ink2} /> : null}
                <span>{item.label}</span>
              </span>
              <Icons.chev size={13} stroke={T.ink3} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ProfileScreen({ profile, locale, onLocaleChange, theme, onThemeChange, onSave, onReset }) {
  const [draft, setDraft] = React.useState(() => ({ ...defaultProfile(), ...(profile || {}) }));
  const update = (key, value) => setDraft((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="profile-screen">
      <div style={{ fontFamily: T.sans, fontSize: 13, color: T.ink3, letterSpacing: 0.4, textTransform: 'uppercase' }}>
        Profil patient
      </div>
      <div style={{ marginTop: 8, fontFamily: T.display, fontSize: 42, lineHeight: 1.02, color: T.ink }}>
        Tes infos<br />
        <span style={{ fontStyle: 'italic', color: T.accentInk }}>patient.</span>
      </div>
      <div style={{ marginTop: 10, fontFamily: T.sans, fontSize: 15, color: T.ink2, lineHeight: 1.45 }}>
        Ajuste ce que la présentation affiche dans l'accueil patient.
      </div>

      <div className="profile-card" style={{ marginTop: 22 }}>
        <div className="field-grid">
          <Field label="Prénom" value={draft.firstName} onChange={(v) => update('firstName', v)} placeholder="Gabriel" />
          <Field label="Blessure / condition" value={draft.condition} onChange={(v) => update('condition', v)} placeholder="Douleur de hanche" />
          <Field label="Objectif" value={draft.goal} onChange={(v) => update('goal', v)} placeholder="Marcher sans boiter puis retrouver la force" />
          <Field label="Prochain rendez-vous" value={draft.nextAppointment} onChange={(v) => update('nextAppointment', v)} placeholder="Vendredi · 10h" />
          <Field label="Notes utiles" value={draft.notes} onChange={(v) => update('notes', v)} placeholder="Début le 4 mars 2026. Fin inconnue." multiline />
        </div>

        <button type="button" className="primary-action" style={{ marginTop: 18 }} onClick={() => onSave(draft)}>
          Enregistrer
        </button>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, multiline = false }) {
  return (
    <label>
      <span className="field-label">{label}</span>
      {multiline ? (
        <textarea
          className="text-field"
          rows={3}
          value={value || ''}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          className="text-field"
          value={value || ''}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}

function Segmented({ label, value, options, onChange }) {
  return (
    <div>
      <div className="field-label">{label}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {options.map(([key, text]) => (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            style={{
              flex: '1 1 auto',
              minHeight: 38,
              borderRadius: 999,
              border: `0.5px solid ${value === key ? T.accent : T.line}`,
              background: value === key ? T.accentSoft : T.paper2,
              color: value === key ? T.accentInk : T.ink2,
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}

function readSavedState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STATE_KEY));
    if (isLegacyMarcDemoState(saved)) {
      localStorage.removeItem(STATE_KEY);
      return defaultState();
    }
    return normalizeAppState(saved);
  } catch {
    return defaultState();
  }
}

function isLegacyMarcDemoState(raw) {
  const profile = raw?.profile;
  if (!profile || typeof profile !== 'object') return false;
  return profile.firstName === 'Marc' || profile.condition === 'Post-LCA';
}

function defaultState() {
  return {
    profile: defaultProfile(),
    checkin: { pain: 4, energy: 6, sleep: 7, note: '', painSpots: { 'r-hip': 2 }, done: false },
    session: freshSession(),
    checkins: {
      now: { done: false },
      later: { done: false },
      tomorrow: { done: false },
    },
    scaleVocabulary: getDefaultScaleVocabulary(),
  };
}

function defaultProfile() {
  return {
    setupDone: true,
    firstName: 'Gabriel',
    condition: 'Douleur de hanche',
    goal: 'Marcher sans boiter puis retrouver la force',
    nextAppointment: 'Vendredi · 10h',
    notes: 'Début le 4 mars 2026. Fin de rééducation inconnue.',
  };
}

function getDefaultScaleVocabulary() {
  return window.createEmptyScaleVocabulary
    ? window.createEmptyScaleVocabulary()
    : { pain: {}, effort: {} };
}

function normalizeAppState(raw) {
  const defaults = defaultState();
  if (!raw || typeof raw !== 'object') return defaults;

  const profile = { ...defaults.profile, ...(raw.profile || {}) };
  Object.keys(profile).forEach((key) => {
    const normalizedKey = key.toLowerCase();
    if (normalizedKey.includes('physio') && normalizedKey.includes('name')) delete profile[key];
  });

  return {
    ...defaults,
    ...raw,
    profile,
    checkin: { ...defaults.checkin, ...(raw.checkin || {}) },
    session: raw.session ? { ...defaults.session, ...raw.session } : defaults.session,
    checkins: { ...defaults.checkins, ...(raw.checkins || {}) },
    scaleVocabulary: window.normalizeScaleVocabulary
      ? window.normalizeScaleVocabulary(raw.scaleVocabulary)
      : getDefaultScaleVocabulary(),
  };
}

function freshSession(exercises) {
  const session = {
    exerciseIdx: 0,
    setIdx: 0,
    completedSets: 0,
    stage: 'doing',
    lastReps: 0,
    log: [],
  };
  if (Array.isArray(exercises) && exercises.length) session.exercises = exercises;
  return session;
}

function applyTheme(name) {
  const themes = {
    warm: {
      bg: 'oklch(0.975 0.008 75)',
      paper: 'oklch(0.995 0.004 85)',
      paper2: 'oklch(0.965 0.010 75)',
      ink: 'oklch(0.22 0.015 60)',
      ink2: 'oklch(0.42 0.012 60)',
      ink3: 'oklch(0.60 0.010 60)',
      line: 'oklch(0.90 0.008 75)',
      line2: 'oklch(0.85 0.010 75)',
      accent: 'oklch(0.58 0.135 40)',
      accentSoft: 'oklch(0.93 0.040 45)',
      accentInk: 'oklch(0.36 0.10 40)',
      sage: '#059669',
      sageSoft: '#D1FAE5',
      sky: '#0284C7',
      skySoft: '#E0F2FE',
      amber: '#D97706',
      amberSoft: '#FEF3C7',
      danger: '#DC2626',
      dangerSoft: '#FEE2E2',
    },
    clinical: {
      bg: '#F6FBFA',
      paper: '#FFFFFF',
      paper2: '#EEF7F5',
      ink: '#12343B',
      ink2: '#315D65',
      ink3: '#6B7C80',
      line: '#D7E7E4',
      line2: '#B9D6D1',
      accent: '#087F8C',
      accentSoft: '#DDF3F1',
      accentInk: '#0E5F68',
      sage: '#0F8A5F',
      sageSoft: '#DFF4EA',
      sky: '#2563A8',
      skySoft: '#E6F0FA',
      amber: '#B86A14',
      amberSoft: '#FFF1D6',
      danger: '#C2413D',
      dangerSoft: '#FBE5E2',
    },
    sport: {
      bg: 'oklch(0.975 0.010 140)',
      paper: 'oklch(0.995 0.004 140)',
      paper2: 'oklch(0.955 0.020 145)',
      ink: 'oklch(0.22 0.035 150)',
      ink2: 'oklch(0.40 0.030 150)',
      ink3: 'oklch(0.58 0.025 150)',
      line: 'oklch(0.88 0.020 145)',
      line2: 'oklch(0.82 0.028 145)',
      accent: 'oklch(0.56 0.16 140)',
      accentSoft: 'oklch(0.93 0.045 140)',
      accentInk: 'oklch(0.34 0.11 140)',
      sage: '#059669',
      sageSoft: '#D1FAE5',
      sky: '#0284C7',
      skySoft: '#E0F2FE',
      amber: '#D97706',
      amberSoft: '#FEF3C7',
      danger: '#DC2626',
      dangerSoft: '#FEE2E2',
    },
  };

  Object.assign(window.T, themes[name] || themes.clinical);
  document.body.style.background = window.T.bg;
}
