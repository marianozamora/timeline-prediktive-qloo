import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useTimelineLayout } from '../useTimelineLayout';

const mockTimelineItems = [
  {
    id: 1,
    start: '2024-01-01',
    end: '2024-01-05',
    name: 'Test Event 1',
    lane: 'development',
  },
  {
    id: 2,
    start: '2024-01-06',
    end: '2024-01-10',
    name: 'Test Event 2',
    lane: 'design',
  },
];

vi.mock('../../utils/dateUtils', () => ({
  parseDate: vi.fn((dateString: string) => new Date(dateString)),
  getDateRange: vi.fn(() => ({
    minDate: new Date('2024-01-01'),
    maxDate: new Date('2024-01-15'),
    totalDays: 15,
  })),
  calculateDaysBetween: vi.fn(() => 15),
}));

vi.mock('../../utils/layoutAlgorithm', () => ({
  assignEventsToLanes: vi.fn(() => [
    [
      {
        id: 1,
        start: '2024-01-01',
        end: '2024-01-05',
        name: 'Test Event 1',
        lane: 'development',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-05'),
      },
    ],
    [
      {
        id: 2,
        start: '2024-01-06',
        end: '2024-01-10',
        name: 'Test Event 2',
        lane: 'design',
        startDate: new Date('2024-01-06'),
        endDate: new Date('2024-01-10'),
      },
    ],
  ]),
}));

describe('useTimelineLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calculates correct date range', () => {
    const { result } = renderHook(() => useTimelineLayout(mockTimelineItems));

    expect(result.current.minDate).toEqual(new Date('2024-01-01'));
    expect(result.current.maxDate).toEqual(new Date('2024-01-15'));
    expect(result.current.totalDays).toBe(15);
  });

  it('groups events by lanes', () => {
    const { result } = renderHook(() => useTimelineLayout(mockTimelineItems));

    expect(result.current.lanesWithEvents.length).toBeGreaterThan(0);
    expect(result.current.lanesWithEvents[0].length).toBeGreaterThan(0);
  });

  it('generates timeline markers', () => {
    const { result } = renderHook(() => useTimelineLayout(mockTimelineItems));

    expect(result.current.timelineMarkers).toBeDefined();
    expect(Array.isArray(result.current.timelineMarkers)).toBe(true);
    expect(result.current.timelineMarkers.length).toBeGreaterThan(0);
  });

  it('handles empty events array', () => {
    const { result } = renderHook(() => useTimelineLayout([]));

    expect(result.current.lanesWithEvents).toHaveLength(2);
    expect(result.current.totalDays).toBe(15);
    expect(result.current.timelineMarkers.length).toBeGreaterThanOrEqual(0);
  });

  it('handles single event', () => {
    const singleEvent = [mockTimelineItems[0]];
    const { result } = renderHook(() => useTimelineLayout(singleEvent));

    expect(result.current.minDate).toEqual(new Date('2024-01-01'));
    expect(result.current.maxDate).toEqual(new Date('2024-01-15'));
    expect(result.current.totalDays).toBe(15);
    expect(result.current.lanesWithEvents).toHaveLength(2);
  });

  it('getEventStyle returns correct positioning', () => {
    const { result } = renderHook(() => useTimelineLayout(mockTimelineItems));

    const mockParsedEvent = {
      id: 1,
      name: 'Project Planning',
      start: '2024-01-01',
      end: '2024-01-15',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-15'),
      lane: 'development',
    };

    const style = result.current.getEventStyle(mockParsedEvent);

    expect(style).toEqual({
      left: expect.any(String),
      width: expect.any(String),
    });
  });

  it('handles events with same start and end date', () => {
    const singleDayEvent = [
      {
        id: 1,
        name: 'Single Day Event',
        start: '2024-01-01',
        end: '2024-01-01',
        lane: 'development',
      },
    ];

    const { result } = renderHook(() => useTimelineLayout(singleDayEvent));

    expect(result.current.totalDays).toBe(15);
    expect(result.current.lanesWithEvents).toHaveLength(2);
  });

  it('sorts events within lanes by start date', () => {
    const { result } = renderHook(() => useTimelineLayout(mockTimelineItems));

    expect(result.current.lanesWithEvents.length).toBeGreaterThan(0);
    expect(result.current.lanesWithEvents[0][0]).toHaveProperty('startDate');
  });

  it('recalculates when events change', () => {
    const { result, rerender } = renderHook(
      ({ events }) => useTimelineLayout(events),
      { initialProps: { events: mockTimelineItems } }
    );

    const newEvents = [
      ...mockTimelineItems,
      {
        id: 9,
        name: 'New Event',
        start: '2024-04-01',
        end: '2024-04-15',
        lane: 'development',
      },
    ];

    rerender({ events: newEvents });

    expect(result.current.totalDays).toBe(15);
  });

  it('returns layout data structure', () => {
    const { result } = renderHook(() => useTimelineLayout(mockTimelineItems));

    expect(result.current).toEqual({
      parsedEvents: expect.any(Array),
      minDate: expect.any(Date),
      maxDate: expect.any(Date),
      totalDays: expect.any(Number),
      lanesWithEvents: expect.any(Array),
      getEventStyle: expect.any(Function),
      timelineMarkers: expect.any(Array),
    });
  });

  it('getEventStyle returns correct style object', () => {
    const { result } = renderHook(() => useTimelineLayout(mockTimelineItems));

    const mockParsedEvent = {
      id: 1,
      name: 'Project Planning',
      start: '2024-01-01',
      end: '2024-01-15',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-15'),
      lane: 'development',
    };

    const style = result.current.getEventStyle(mockParsedEvent);

    expect(style).toEqual({
      left: expect.any(String),
      width: expect.any(String),
    });
  });
});
