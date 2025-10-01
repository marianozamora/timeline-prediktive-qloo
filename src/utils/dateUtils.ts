import type { DateRange } from '../types/timeline';

export const parseDate = (dateString: string): Date => {
  return new Date(dateString + 'T00:00:00');
};

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const formatDateForInput = formatDate;

export const calculateDaysBetween = (
  startDate: Date,
  endDate: Date
): number => {
  const timeDiff = endDate.getTime() - startDate.getTime();
  return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
};

export const getDateRange = (dates: Date[]): DateRange => {
  const timestamps = dates.map(d => d.getTime());
  const min = new Date(Math.min(...timestamps));
  const max = new Date(Math.max(...timestamps));
  const days = calculateDaysBetween(min, max);

  return {
    minDate: min,
    maxDate: max,
    totalDays: days,
  };
};

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
