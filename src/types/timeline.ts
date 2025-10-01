export type TimelineItem = {
  id: number;
  start: string;
  end: string;
  name: string;
  lane: string;
};

export type ParsedTimelineEvent = TimelineItem & {
  startDate: Date;
  endDate: Date;
};

export type DateRange = {
  minDate: Date;
  maxDate: Date;
  totalDays: number;
};

export type TimelineMarker = {
  position: number;
  date: Date;
};

export type EventStyle = {
  left: string;
  width: string;
};

export type DraggedEventState = ParsedTimelineEvent & {
  offsetX: number;
  startX: number;
};

export type Lane = ParsedTimelineEvent[];
