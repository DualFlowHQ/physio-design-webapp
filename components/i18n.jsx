const PHYSIO_I18N_STORAGE_KEY = 'physio_design_v3_lang';

const PHYSIO_I18N_TEXT_MAP = {
  'Physio App — UX amélioré': 'Physio App — Improved UX',
  'Accueil': 'Home',
  'Séance': 'Session',
  'Post-séance': 'Post-session',
  'Physio': 'Physio',
  'Programme': 'Program',
  'Ressources': 'Resources',
  'Progrès': 'Progress',
  'Lexique': 'Reference',
  "Cliquez « Commencer » sur l'accueil pour enchaîner le flux · la position est sauvegardée entre rafraîchissements": 'Click "Start" on the home screen to run through the flow · the position is saved between refreshes',
  'Tweaks': 'Tweaks',
  'Thème': 'Theme',
  'Chaud': 'Warm',
  'Clinique': 'Clinical',
  'Sportif': 'Sport',
  "Aller à l'écran": 'Go to screen',
  'Réinitialiser': 'Reset',
  "Effacer l'état": 'Clear state',
  'Lundi · 21 avril': 'Monday · April 21',
  'Bonjour,': 'Hello,',
  'Marc.': 'Marc.',
  'Semaine 6 · Post-LCA · jour 38 sur 84': 'Week 6 · Post-ACL · day 38 of 84',
  'Douleur actuelle': 'Current pain',
  'Validée ce matin': 'Checked this morning',
  'À confirmer': 'To confirm',
  'Tes mots et ton visuel viennent du lexique douleur.': 'Your words and visual cue come from the pain reference.',
  'Personnaliser': 'Customize',
  'Douleur moyenne depuis le début': 'Average pain since the start',
  'Aussi aujourd\'hui': 'Also today',
  'à consulter': 'to review',
  'Lexique · en 2 min': 'Reference · 2 min',
  'Prochain RV': 'Next appointment',
  'Jeudi · 14h': 'Thursday · 2 PM',
  'Voir la semaine': 'View the week',
  'Programme complet': 'Full program',
  "Ton plan jusqu'au": 'Your path to',
  "Ton plan jusqu'au retour au sport.": 'Your plan all the way back to sport.',
  "retour au sport.": 'return to sport.',
  "Semaine 6 · jour 38 sur 84.": "Week 6 · day 38 of 84.",
  'Avancement global': 'Overall progress',
  "Voir les progrès": "View progress",
  'Cette semaine': 'This week',
  'Phase actuelle': 'Current phase',
  'Reste estimé': 'Estimated left',
  'Objectif de la semaine': 'Goal of the week',
  'Le cap de cette semaine.': 'The focus for this week.',
  'Charge': 'Load',
  'À surveiller': 'Watch for',
  "Contrôle genou": 'Knee control',
  "Aujourd'hui · 18 min": 'Today · 18 min',
  '5 exercices · phase 2 · proprioception': '5 exercises · phase 2 · proprioception',
  'Progression': 'Progress',
  'Six semaines': 'Six weeks',
  'Six semaines plus forte.': 'Six weeks stronger.',
  'plus forte.': 'stronger.',
  'Lecture rapide': 'Quick read',
  'Tu supportes plus de travail avec moins de douleur.': 'You can handle more work with less pain.',
  "Depuis la semaine 1, la douleur moyenne a baissé de": 'Since week 1, average pain has decreased by',
  "points alors que l'effort toléré a monté de": 'points while tolerated effort has increased by',
  "C'est le signal principal ici.": "That's the main signal here.",
  'Douleur moyenne de la semaine': 'Avg pain of the week',
  'Effort toléré': 'Tolerated effort',
  'Adhérence': 'Adherence',
  'Tendance 6 semaines': '6-week trend',
  "Quand la ligne douleur descend pendant que la ligne effort monte ou reste stable, la rééducation avance dans le bon sens.": 'When the pain line goes down while the effort line rises or stays stable, rehab is moving in the right direction.',
  'Douleur moyenne': 'Average pain',
  "Comment lire cet écran": 'How to read this screen',
  "La douleur ne doit pas forcément être à zéro pour progresser. Ce qu'on veut surtout voir:": 'Pain does not have to be zero for progress. What we mainly want to see is:',
  '1. Douleur plus basse ou plus stable': '1. Lower or more stable pain',
  'pendant que tu gardes tes séances.': 'while you keep doing your sessions.',
  '2. Effort mieux toléré': '2. Better tolerated effort',
  'sans grosse réaction le lendemain.': 'without a big reaction the next day.',
  '3. Régularité suffisante': '3. Enough consistency',
  "pour que le corps s'adapte d'une semaine à l'autre.": 'so the body can adapt from week to week.',
  'Parcours complet': 'Full journey',
  'Phases': 'Phases',
  'Étapes': 'Milestones',
  'Exercice': 'Exercise',
  'En cours': 'In progress',
  'Ressenti': 'Feedback',
  'Repos': 'Rest',
  'Transition': 'Transition',
  'Séries restantes': 'Sets left',
  'Repère': 'Target',
  'Après': 'After',
  'viser un mouvement propre': 'aim for clean movement',
  'Sur cet exercice: effort moyen': 'For this exercise: average effort',
  'douleur moyenne': 'average pain',
  'Maintenant': 'Now',
  'maintenant': 'now',
  'Dans 2 heures': 'In 2 hours',
  '2 h après': '2 h later',
  'Demain matin': 'Tomorrow morning',
  'demain': 'tomorrow',
  'Post-séance · 22 min': 'Post-session · 22 min',
  'Bien joué, Marc.': 'Nice work, Marc.',
  'Note tes sensations.': 'Log how it felt.',
  'Exercices': 'Exercises',
  'Séries': 'Sets',
  'Effort moy.': 'Avg effort',
  'Sondages post-séance': 'Post-session check-ins',
  'Les 3 créneaux sont visibles ici pour la démo.': 'All 3 time slots are visible here for the demo.',
  "Ton suivi est enregistré automatiquement. Les rappels post-séance restent visibles dans l’app.": 'Your follow-up is saved automatically. Post-session reminders stay visible in the app.',
  "Retour à l'accueil": 'Back to home',
  'À remplir maintenant.': 'Fill this in now.',
  'Visible ici pour la démo, même si ce sondage arrive plus tard.': 'Visible here for the demo, even if this check-in would normally happen later.',
  'Tu peux ajuster les réponses de ce sondage.': 'You can adjust the answers for this check-in.',
  'Modifier': 'Edit',
  "noté à l'instant": 'logged just now',
  'prévu maintenant': 'scheduled now',
  'prévu demain matin': 'scheduled tomorrow morning',
  'Douleur': 'Pain',
  'Fatigue': 'Fatigue',
  'Sensation principale': 'Main sensation',
  'Stable': 'Stable',
  'Tiraillement': 'Pulling',
  'Pincement': 'Pinching',
  'Raideur': 'Stiffness',
  'Fatigue musculaire': 'Muscle fatigue',
  'Détail facultatif': 'Optional detail',
  'Enregistrer mes sensations': 'Save my sensations',
  'Enregistrer les modifications': 'Save changes',
  'Annuler': 'Cancel',
  'Tes ressources': 'Your resources',
  'Tes ressources partagées.': 'Your shared resources.',
  'partagées.': 'shared.',
  'Livres, vidéos, articles — choisis pour toi, pas pour tout le monde.': 'Books, videos, and articles — chosen for you, not for everyone.',
  'Enregistrés': 'Saved',
  'Livres': 'Books',
  'Vidéos': 'Videos',
  'Articles': 'Articles',
  'Wiki': 'Wiki',
  'Podcasts': 'Podcasts',
  'Routines': 'Routines',
  'Rien ici pour l’instant.': 'Nothing here for now.',
  'Demander une ressource': 'Ask for a resource',
  'Note de suivi': 'Follow-up note',
  'Pourquoi': 'Why',
  'Regarder': 'Watch',
  'Écouter': 'Listen',
  'Lancer': 'Start',
  'Ouvrir': 'Open',
  'Voir la ressource': 'View resource',
  'Comprendre ce que': 'Understand what',
  'Comprendre ce que je ressens.': 'Understand what I feel.',
  'je ressens.': 'I feel.',
  'Repères 0-10, sensations, effort perçu et signaux à noter.': '0-10 cues, sensations, perceived effort, and signals to track.',
  'Recherche de terme': 'Term search',
  'Chercher un': 'Look up a',
  'Chercher un mot précis.': 'Look up a specific term.',
  'mot précis.': 'specific term.',
  'Anatomie, chirurgie, exercices et mots utilisés en rééducation.': 'Anatomy, surgery, exercises, and terms used in rehab.',
  'De quoi as-tu': 'What do you',
  'De quoi as-tu besoin ?': 'What do you need?',
  'besoin ?': 'need?',
  'Choisis d’abord entre tes repères de douleur et le vocabulaire médical.': 'Start by choosing between your pain cues and medical vocabulary.',
  'Changer de choix': 'Change choice',
  'Vocabulaire de la douleur': 'Pain vocabulary',
  'Mode clinique': 'Clinical mode',
  'Pour': 'For',
  'Quel type de ressource ?': 'What type of resource?',
  'Livre': 'Book',
  'Article': 'Article',
  'Wikipédia': 'Wikipedia',
  'Vidéo': 'Video',
  'Podcast': 'Podcast',
  'Routine': 'Routine',
  'ISBN, titre': 'ISBN, title',
  'lien web': 'web link',
  'page de référence': 'reference page',
  'YouTube, Vimeo': 'YouTube, Vimeo',
  'épisode': 'episode',
  'depuis ta bibliothèque': 'from your library',
  'Suggestions pour Marc': 'Suggestions for Marc',
  'Continuer': 'Continue',
  'Un passage à pointer ?': 'Any specific section to point to?',
  'Optionnel — guide-le vers ce qui compte.': 'Optional — guide him to what matters.',
  'Pointer': 'Highlight',
  'Prochain RV en présentiel jeudi 24 avril à 14 h.': 'Next in-person appointment Thursday, April 24 at 2 PM.'
};

const PHYSIO_I18N_PATTERN_RULES = [
  {
    test: /^Semaine (\d+) · Post-LCA · jour (\d+) sur (\d+)$/,
    replace: (_, week, day, total) => `Week ${week} · Post-ACL · day ${day} of ${total}`,
  },
  {
    test: /^Semaine (\d+) · jour (\d+) sur (\d+)\.$/,
    replace: (_, week, day, total) => `Week ${week} · day ${day} of ${total}.`,
  },
  {
    test: /^Sem (\d+)-(\d+)$/,
    replace: (_, start, end) => `Wk ${start}-${end}`,
  },
  {
    test: /^Sem (\d+)$/,
    replace: (_, value) => `Wk ${value}`,
  },
  {
    test: /^(\d+) séance(?:s)?$/,
    replace: (_, count) => `${count} sessions`,
  },
  {
    test: /^(\d+) ex$/,
    replace: (_, count) => `${count} ex`,
  },
  {
    test: /^(\d+) exos$/,
    replace: (_, count) => `${count} exercises`,
  },
  {
    test: /^(\d+) j$/,
    replace: (_, count) => `${count} d`,
  },
];

function physioNormalizeText(value) {
  return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '';
}

function physioGetLang() {
  return 'fr';
}

function physioTranslateText(text, locale = physioGetLang()) {
  if (locale !== 'en') return text;
  const normalized = physioNormalizeText(text);
  if (!normalized) return text;
  if (PHYSIO_I18N_TEXT_MAP[normalized]) return PHYSIO_I18N_TEXT_MAP[normalized];

  for (const rule of PHYSIO_I18N_PATTERN_RULES) {
    if (rule.test.test(normalized)) {
      return normalized.replace(rule.test, rule.replace);
    }
  }

  return text;
}

function physioLooksTranslatable(text) {
  const normalized = physioNormalizeText(text);
  if (!normalized) return false;
  if (PHYSIO_I18N_TEXT_MAP[normalized]) return true;
  return PHYSIO_I18N_PATTERN_RULES.some((rule) => rule.test.test(normalized));
}

function physioSetLang(locale) {
  const next = locale === 'en' ? 'en' : 'fr';
  try {
    localStorage.setItem(PHYSIO_I18N_STORAGE_KEY, next);
  } catch (error) {
    // Ignore storage errors in static demos.
  }
  window.dispatchEvent(new CustomEvent('physio-languagechange', { detail: { locale: next } }));
}

function physioTranslateNode(node, locale) {
  if (!node || !node.parentElement) return;
  const currentText = node.textContent;
  const cachedSource = node.__physioSourceText;

  let sourceText;
  if (physioLooksTranslatable(currentText)) {
    // The live text is a known French source we can translate.
    sourceText = currentText;
  } else if (cachedSource !== undefined && currentText === physioTranslateText(cachedSource, 'en')) {
    // The live text is the English we previously produced from this node.
    sourceText = cachedSource;
  } else {
    // Dynamic or unknown content (rep counters, timers, user input). Leave it
    // untouched so React stays the single source of truth for these nodes.
    if (cachedSource !== undefined) delete node.__physioSourceText;
    return;
  }

  node.__physioSourceText = sourceText;
  const translated = physioTranslateText(sourceText, locale);
  if (node.textContent !== translated) {
    node.textContent = translated;
  }
}

function physioTranslateAttribute(element, attrName, locale) {
  if (!element || !element.hasAttribute(attrName)) return;
  const sourceKey = `__physioSourceAttr_${attrName}`;
  const currentText = element.getAttribute(attrName);
  const sourceText = physioLooksTranslatable(currentText) ? currentText : (element[sourceKey] || currentText);
  const translated = physioTranslateText(sourceText, locale);
  element[sourceKey] = sourceText;
  if (element.getAttribute(attrName) !== translated) {
    element.setAttribute(attrName, translated);
  }
}

let physioObserver = null;
let physioApplying = false;

function physioApplyNow() {
  if (!document.body) return;
  physioApplying = true;
  const locale = physioGetLang();
  document.documentElement.lang = locale === 'en' ? 'en' : 'fr';

  const titleNode = document.querySelector('title')?.firstChild;
  if (titleNode) physioTranslateNode(titleNode, locale);

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return physioNormalizeText(node.textContent) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });

  let current = walker.nextNode();
  while (current) {
    physioTranslateNode(current, locale);
    current = walker.nextNode();
  }

  document.body.querySelectorAll('[placeholder], [title], [aria-label]').forEach((element) => {
    physioTranslateAttribute(element, 'placeholder', locale);
    physioTranslateAttribute(element, 'title', locale);
    physioTranslateAttribute(element, 'aria-label', locale);
  });

  physioApplying = false;
}

function physioStart() {
  if (!document.body || physioObserver) return;
  physioObserver = new MutationObserver(() => {
    if (!physioApplying) {
      requestAnimationFrame(() => physioApplyNow());
    }
  });
  physioObserver.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ['placeholder', 'title', 'aria-label'],
  });
  window.addEventListener('physio-languagechange', physioApplyNow);
  physioApplyNow();
}

function usePhysioLocale() {
  const [locale, setLocaleState] = React.useState(physioGetLang());

  React.useEffect(() => {
    const sync = (event) => setLocaleState(event.detail?.locale || physioGetLang());
    window.addEventListener('physio-languagechange', sync);
    return () => window.removeEventListener('physio-languagechange', sync);
  }, []);

  React.useEffect(() => {
    physioApplyNow();
  }, [locale]);

  const setLocale = React.useCallback((nextLocale) => {
    physioSetLang(nextLocale);
  }, []);

  return [locale, setLocale];
}

window.PhysioI18n = {
  getLang: physioGetLang,
  setLang: physioSetLang,
  applyNow: physioApplyNow,
  start: physioStart,
  t: physioTranslateText,
  useLocale: usePhysioLocale,
};
