import type { LucideIcon } from 'lucide-react';
import type {
  ParsedTimelineEvent,
  EventStyle,
  DraggedEventState,
  TimelineMarker,
  TimelineItem,
} from './timeline';

export type ZoomButtonProps = {
  icon: LucideIcon;
  onClick: () => void;
  disabled?: boolean;
  title?: string;
};

export type EditButtonProps = {
  onClick: (e: React.MouseEvent) => void;
};

export type InlineInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
};

export type DateLabelProps = {
  date: Date;
  position: number;
};

export type TimelineHeaderProps = {
  minDate: Date;
  maxDate: Date;
  totalDays: number;
  eventCount: number;
};

export type ZoomControlsProps = {
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
};

export type TimelineMarkerProps = {
  markers: TimelineMarker[];
};

export type TimelineEventProps = {
  event: ParsedTimelineEvent;
  style: EventStyle;
  laneHeight: number;
  isEditing: boolean;
  editingName: string;
  isDragging: boolean;
  onDragStart: (e: React.DragEvent) => void;
  onDrag: (e: React.DragEvent) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onStartEdit: () => void;
  onEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditSave: () => void;
  onEditCancel: () => void;
};

export type TimelineStatsProps = {
  eventCount: number;
  laneCount: number;
};

export type TimelineLanesProps = {
  timelineRef: React.RefObject<HTMLDivElement>;
  lanesWithEvents: ParsedTimelineEvent[][];
  laneHeight: number;
  getEventStyle: (event: ParsedTimelineEvent) => EventStyle;
  editingId: number | null;
  editingName: string;
  draggedEvent: DraggedEventState | null;
  onEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStartEdit: (event: ParsedTimelineEvent) => void;
  onEditSave: () => void;
  onEditCancel: () => void;
  onDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    event: ParsedTimelineEvent,
    ref: React.RefObject<HTMLDivElement>
  ) => void;
  onDrag: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: (
    e: React.DragEvent<HTMLDivElement>,
    ref: React.RefObject<HTMLDivElement>
  ) => void;
};

export type TimelineProps = {
  initialEvents?: TimelineItem[];
};
