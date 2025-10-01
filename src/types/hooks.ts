import type {
  ParsedTimelineEvent,
  EventStyle,
  DraggedEventState,
  TimelineMarker,
} from './timeline';

export type UseTimelineLayoutReturn = {
  parsedEvents: ParsedTimelineEvent[];
  minDate: Date;
  maxDate: Date;
  totalDays: number;
  lanesWithEvents: ParsedTimelineEvent[][];
  getEventStyle: (event: ParsedTimelineEvent) => EventStyle;
  timelineMarkers: TimelineMarker[];
};

export type UseInlineEditReturn = {
  editingId: number | null;
  editingName: string;
  setEditingName: (name: string) => void;
  startEditing: (event: ParsedTimelineEvent) => void;
  saveEdit: () => void;
  cancelEdit: () => void;
};

export type UseDragAndDropReturn = {
  draggedEvent: DraggedEventState | null;
  handleDragStart: (
    e: React.DragEvent,
    event: ParsedTimelineEvent,
    timelineRef: React.RefObject<HTMLDivElement>
  ) => void;
  handleDrag: (e: React.DragEvent) => void;
  handleDragEnd: (
    e: React.DragEvent,
    timelineRef: React.RefObject<HTMLDivElement>
  ) => void;
};
