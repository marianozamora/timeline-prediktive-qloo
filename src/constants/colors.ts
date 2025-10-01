export const EVENT_COLORS = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-emerald-500',
  'bg-orange-500',
  'bg-pink-500',
  'bg-cyan-500',
  'bg-indigo-500',
  'bg-rose-500',
] as const;

export type EventColor = (typeof EVENT_COLORS)[number];

export const getEventColor = (id: number): EventColor => {
  return EVENT_COLORS[id % EVENT_COLORS.length];
};
