// Shared weekly rehab progression data used across Accueil, Programme, and Progres.

const PROGRESS_WEEKS = [
  { w: 'Sem 1-2', sessions: 10, targetSessions: 14, adherence: 71, effort: 2.6, pain: 8.0, summary: 'Stop bobo: calmer la douleur' },
  { w: 'Sem 3-4', sessions: 12, targetSessions: 14, adherence: 86, effort: 3.2, pain: 8.0, summary: 'Marche courte et controle' },
  { w: 'Sem 5-6', sessions: 14, targetSessions: 14, adherence: 100, effort: 4.1, pain: 8.0, summary: 'Programme quotidien lance' },
  { w: 'Sem 7-8', sessions: 13, targetSessions: 14, adherence: 93, effort: 4.7, pain: 8.0, summary: 'Mobilite plus reguliere' },
  { w: 'Sem 9-10', sessions: 14, targetSessions: 14, adherence: 100, effort: 5.5, pain: 6.0, summary: 'Ajout squat et pont' },
  { w: 'Sem 11-12', sessions: 13, targetSessions: 14, adherence: 93, effort: 5.9, pain: 6.0, summary: 'Force mieux toleree' },
  { w: 'Sem 13-14', sessions: 13, targetSessions: 14, adherence: 93, effort: 6.1, pain: 4.0, summary: 'Douleur stabilisee a 4/10', current: true },
];

function cloneProgressWeek(week) {
  return { ...week };
}

function getProgressWeeks() {
  return PROGRESS_WEEKS.map(cloneProgressWeek);
}

function getCurrentProgressWeek() {
  const weeks = getProgressWeeks();
  return weeks.find((week) => week.current) || weeks[weeks.length - 1] || null;
}

function getFirstProgressWeek() {
  const weeks = getProgressWeeks();
  return weeks[0] || null;
}

function getCompletedProgressWeeks(limit = 2) {
  const weeks = getProgressWeeks().filter((week) => !week.current).reverse();
  return typeof limit === 'number' ? weeks.slice(0, limit) : weeks;
}

window.PROGRESS_WEEKS = PROGRESS_WEEKS;
window.getProgressWeeks = getProgressWeeks;
window.getCurrentProgressWeek = getCurrentProgressWeek;
window.getFirstProgressWeek = getFirstProgressWeek;
window.getCompletedProgressWeeks = getCompletedProgressWeeks;
