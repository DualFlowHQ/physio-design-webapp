// Shared weekly rehab progression data used across Accueil, Programme, and Progres.

const PROGRESS_WEEKS = [
  { w: 'Sem 1', sessions: 2, targetSessions: 3, adherence: 66, effort: 3.1, pain: 5.8, summary: 'Remise en route prudente' },
  { w: 'Sem 2', sessions: 3, targetSessions: 4, adherence: 75, effort: 4.4, pain: 4.5, summary: 'Gonflement mieux tolere' },
  { w: 'Sem 3', sessions: 4, targetSessions: 4, adherence: 100, effort: 5.2, pain: 3.9, summary: 'Controle plus stable' },
  { w: 'Sem 4', sessions: 3, targetSessions: 4, adherence: 75, effort: 5.9, pain: 3.4, summary: 'Mobilite validee' },
  { w: 'Sem 5', sessions: 4, targetSessions: 4, adherence: 100, effort: 6.5, pain: 2.8, summary: 'Charge stable' },
  { w: 'Sem 6', sessions: 4, targetSessions: 4, adherence: 100, effort: 6.3, pain: 2.1, summary: 'Force bien toleree', current: true },
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
