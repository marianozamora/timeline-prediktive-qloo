import { useState, useCallback } from 'react';
import type { DragEvent, RefObject } from 'react';
import { formatDateForInput } from '../utils/dateUtils';
import type {
  TimelineItem,
  ParsedTimelineEvent,
  DraggedEventState,
} from '../types/timeline';
import type { UseDragAndDropReturn } from '../types/hooks';

export const useDragAndDrop = (
  events: TimelineItem[],
  setEvents: (events: TimelineItem[]) => void,
  minDate: Date,
  totalDays: number
): UseDragAndDropReturn => {
  const [draggedEvent, setDraggedEvent] = useState<DraggedEventState | null>(
    null
  );

  const handleDragStart = useCallback(
    (
      e: DragEvent,
      event: ParsedTimelineEvent,
      timelineRef: RefObject<HTMLDivElement>
    ) => {
      e.stopPropagation();

      if (!timelineRef.current) return;

      const rect = timelineRef.current.getBoundingClientRect();
      const minDateTime = minDate.getTime();
      const eventStartTime = event.startDate.getTime();

      setDraggedEvent({
        ...event,
        offsetX: e.clientX - rect.left,
        startX: (eventStartTime - minDateTime) / (1000 * 60 * 60 * 24),
      });
    },
    [minDate]
  );

  const handleDrag = useCallback(
    (e: DragEvent) => {
      if (!draggedEvent) return;
      e.preventDefault();
    },
    [draggedEvent]
  );

  const handleDragEnd = useCallback(
    (e: DragEvent, timelineRef: RefObject<HTMLDivElement>) => {
      if (!draggedEvent || !timelineRef.current) return;

      const rect = timelineRef.current.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const deltaX = currentX - draggedEvent.offsetX;

      const deltaDays = Math.round((deltaX / rect.width) * totalDays);
      if (deltaDays !== 0) {
        setEvents(
          events.map(ev => {
            if (ev.id === draggedEvent.id) {
              const newStart = new Date(draggedEvent.startDate);
              newStart.setDate(newStart.getDate() + deltaDays);

              const newEnd = new Date(draggedEvent.endDate);
              newEnd.setDate(newEnd.getDate() + deltaDays);

              return {
                ...ev,
                start: formatDateForInput(newStart),
                end: formatDateForInput(newEnd),
              };
            }
            return ev;
          })
        );
      }

      setDraggedEvent(null);
    },
    [draggedEvent, events, setEvents, totalDays]
  );

  return {
    draggedEvent,
    handleDragStart,
    handleDrag,
    handleDragEnd,
  };
};
