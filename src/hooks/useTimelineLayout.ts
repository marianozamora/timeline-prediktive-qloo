import { useMemo } from 'react';
import {
  parseDate,
  getDateRange,
  calculateDaysBetween,
} from '../utils/dateUtils';
import { assignEventsToLanes } from '../utils/layoutAlgorithm';
import type {
  TimelineItem,
  EventStyle,
  ParsedTimelineEvent,
} from '../types/timeline';
import type { UseTimelineLayoutReturn } from '../types/hooks';

export const useTimelineLayout = (
  events: TimelineItem[]
): UseTimelineLayoutReturn => {
  const parsedEvents = useMemo<ParsedTimelineEvent[]>(() => {
    return events.map(event => ({
      ...event,
      startDate: parseDate(event.start),
      endDate: parseDate(event.end),
    }));
  }, [events]);

  const { minDate, maxDate, totalDays } = useMemo(() => {
    const dates = parsedEvents.flatMap(e => [e.startDate, e.endDate]);
    return getDateRange(dates);
  }, [parsedEvents]);

  const lanesWithEvents = useMemo(() => {
    return assignEventsToLanes(parsedEvents, totalDays);
  }, [parsedEvents, totalDays]);

  const getEventStyle = useMemo(() => {
    return (event: ParsedTimelineEvent): EventStyle => {
      const startOffset = calculateDaysBetween(minDate, event.startDate) - 1;
      const duration = calculateDaysBetween(event.startDate, event.endDate);

      return {
        left: `${(startOffset / totalDays) * 100}%`,
        width: `${(duration / totalDays) * 100}%`,
      };
    };
  }, [minDate, totalDays]);

  const timelineMarkers = useMemo(() => {
    const markers = [];
    const step = Math.max(1, Math.floor(totalDays / 12));

    for (let i = 0; i <= totalDays; i += step) {
      const date = new Date(minDate);
      date.setDate(date.getDate() + i);
      markers.push({
        position: (i / totalDays) * 100,
        date: date,
      });
    }

    return markers;
  }, [minDate, totalDays]);

  return {
    parsedEvents,
    minDate,
    maxDate,
    totalDays,
    lanesWithEvents,
    getEventStyle,
    timelineMarkers,
  };
};
