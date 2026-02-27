export const getNextSunday = (baseDate: Date = new Date()): Date => {
  const nextDate = new Date(baseDate);
  const currentDay = nextDate.getDay();
  const daysUntilSunday = currentDay === 0 ? 7 : 7 - currentDay;

  nextDate.setDate(nextDate.getDate() + daysUntilSunday);
  nextDate.setHours(0, 0, 0, 0);

  return nextDate;
};
