import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useDragAndDrop } from '../useDragAndDrop';
import { mockTimelineItems } from '../../mocks/timelineData';

vi.mock('../../utils/dateUtils', () => ({
  formatDateForInput: vi.fn((date: Date) => date.toISOString().split('T')[0]),
}));

describe('useDragAndDrop', () => {
  const mockSetEvents = vi.fn();
  const minDate = new Date('2024-01-01');
  const totalDays = 74;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with null draggedEvent', () => {
    const { result } = renderHook(() =>
      useDragAndDrop(mockTimelineItems, mockSetEvents, minDate, totalDays)
    );

    expect(result.current.draggedEvent).toBeNull();
  });

  it('returns correct handlers', () => {
    const { result } = renderHook(() =>
      useDragAndDrop(mockTimelineItems, mockSetEvents, minDate, totalDays)
    );

    expect(typeof result.current.handleDragStart).toBe('function');
    expect(typeof result.current.handleDrag).toBe('function');
    expect(typeof result.current.handleDragEnd).toBe('function');
  });

  it('handles drag start correctly', () => {
    const { result } = renderHook(() =>
      useDragAndDrop(mockTimelineItems, mockSetEvents, minDate, totalDays)
    );

    const mockEvent = {
      stopPropagation: vi.fn(),
      clientX: 100,
    } as unknown as React.DragEvent<HTMLDivElement>;

    const mockTimelineRef = {
      current: {
        getBoundingClientRect: () => ({ left: 50, width: 500 }),
      },
    } as React.RefObject<HTMLDivElement>;

    const parsedEvent = {
      id: 1,
      name: 'Project Planning',
      start: '2024-01-01',
      end: '2024-01-15',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-15'),
      lane: 'development',
    };

    act(() => {
      result.current.handleDragStart(mockEvent, parsedEvent, mockTimelineRef);
    });

    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(result.current.draggedEvent).toEqual({
      ...parsedEvent,
      offsetX: 50,
      startX: 0,
    });
  });

  it('does not start drag if timelineRef is null', () => {
    const { result } = renderHook(() =>
      useDragAndDrop(mockTimelineItems, mockSetEvents, minDate, totalDays)
    );

    const mockEvent = {
      stopPropagation: vi.fn(),
      clientX: 100,
    } as unknown as React.DragEvent<HTMLDivElement>;

    const mockTimelineRef = {
      current: null,
    } as React.RefObject<HTMLDivElement>;

    const parsedEvent = {
      id: 1,
      name: 'Project Planning',
      start: '2024-01-01',
      end: '2024-01-15',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-15'),
      lane: 'development',
    };

    act(() => {
      result.current.handleDragStart(mockEvent, parsedEvent, mockTimelineRef);
    });

    expect(result.current.draggedEvent).toBeNull();
  });

  it('prevents default during drag when event is being dragged', () => {
    const { result } = renderHook(() =>
      useDragAndDrop(mockTimelineItems, mockSetEvents, minDate, totalDays)
    );

    const mockStartEvent = {
      stopPropagation: vi.fn(),
      clientX: 100,
    } as unknown as React.DragEvent<HTMLDivElement>;

    const mockTimelineRef = {
      current: {
        getBoundingClientRect: () => ({ left: 50, width: 500 }),
      },
    } as React.RefObject<HTMLDivElement>;

    const parsedEvent = {
      id: 1,
      name: 'Project Planning',
      start: '2024-01-01',
      end: '2024-01-15',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-15'),
      lane: 'development',
    };

    act(() => {
      result.current.handleDragStart(
        mockStartEvent,
        parsedEvent,
        mockTimelineRef
      );
    });

    const mockDragEvent = {
      preventDefault: vi.fn(),
    } as unknown as React.DragEvent<HTMLDivElement>;

    act(() => {
      result.current.handleDrag(mockDragEvent);
    });

    expect(mockDragEvent.preventDefault).toHaveBeenCalled();
  });

  it('does not prevent default during drag when no event is being dragged', () => {
    const { result } = renderHook(() =>
      useDragAndDrop(mockTimelineItems, mockSetEvents, minDate, totalDays)
    );

    const mockDragEvent = {
      preventDefault: vi.fn(),
    } as unknown as React.DragEvent<HTMLDivElement>;

    act(() => {
      result.current.handleDrag(mockDragEvent);
    });

    expect(mockDragEvent.preventDefault).not.toHaveBeenCalled();
  });

  it('updates event dates on drag end with movement', () => {
    const { result } = renderHook(() =>
      useDragAndDrop(mockTimelineItems, mockSetEvents, minDate, totalDays)
    );

    const mockStartEvent = {
      stopPropagation: vi.fn(),
      clientX: 100,
    } as unknown as React.DragEvent<HTMLDivElement>;

    const mockTimelineRef = {
      current: {
        getBoundingClientRect: () => ({ left: 50, width: 500 }),
      },
    } as React.RefObject<HTMLDivElement>;

    const parsedEvent = {
      id: 1,
      name: 'Project Planning',
      start: '2024-01-01',
      end: '2024-01-15',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-15'),
      lane: 'development',
    };

    act(() => {
      result.current.handleDragStart(
        mockStartEvent,
        parsedEvent,
        mockTimelineRef
      );
    });
    const mockEndEvent = {
      clientX: 200,
    } as unknown as React.DragEvent<HTMLDivElement>;

    act(() => {
      result.current.handleDragEnd(mockEndEvent, mockTimelineRef);
    });

    expect(mockSetEvents).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          start: expect.any(String),
          end: expect.any(String),
        }),
      ])
    );
    expect(result.current.draggedEvent).toBeNull();
  });

  it('does not update events if there is no movement', () => {
    const { result } = renderHook(() =>
      useDragAndDrop(mockTimelineItems, mockSetEvents, minDate, totalDays)
    );

    const mockStartEvent = {
      stopPropagation: vi.fn(),
      clientX: 100,
    } as unknown as React.DragEvent<HTMLDivElement>;

    const mockTimelineRef = {
      current: {
        getBoundingClientRect: () => ({ left: 50, width: 500 }),
      },
    } as React.RefObject<HTMLDivElement>;

    const parsedEvent = {
      id: 1,
      name: 'Project Planning',
      start: '2024-01-01',
      end: '2024-01-15',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-15'),
      lane: 'development',
    };

    act(() => {
      result.current.handleDragStart(
        mockStartEvent,
        parsedEvent,
        mockTimelineRef
      );
    });
    const mockEndEvent = {
      clientX: 100,
    } as unknown as React.DragEvent<HTMLDivElement>;

    act(() => {
      result.current.handleDragEnd(mockEndEvent, mockTimelineRef);
    });

    expect(mockSetEvents).not.toHaveBeenCalled();
    expect(result.current.draggedEvent).toBeNull();
  });

  it('does not update events if no event is being dragged', () => {
    const { result } = renderHook(() =>
      useDragAndDrop(mockTimelineItems, mockSetEvents, minDate, totalDays)
    );

    const mockTimelineRef = {
      current: {
        getBoundingClientRect: () => ({ left: 50, width: 500 }),
      },
    } as React.RefObject<HTMLDivElement>;

    const mockEndEvent = {
      clientX: 200,
    } as unknown as React.DragEvent<HTMLDivElement>;

    act(() => {
      result.current.handleDragEnd(mockEndEvent, mockTimelineRef);
    });

    expect(mockSetEvents).not.toHaveBeenCalled();
  });

  it('does not update events if timelineRef is null on drag end', () => {
    const { result } = renderHook(() =>
      useDragAndDrop(mockTimelineItems, mockSetEvents, minDate, totalDays)
    );

    const mockStartEvent = {
      stopPropagation: vi.fn(),
      clientX: 100,
    } as unknown as React.DragEvent<HTMLDivElement>;

    const mockTimelineRef = {
      current: {
        getBoundingClientRect: () => ({ left: 50, width: 500 }),
      },
    } as React.RefObject<HTMLDivElement>;

    const parsedEvent = {
      id: 1,
      name: 'Project Planning',
      start: '2024-01-01',
      end: '2024-01-15',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-15'),
      lane: 'development',
    };

    act(() => {
      result.current.handleDragStart(
        mockStartEvent,
        parsedEvent,
        mockTimelineRef
      );
    });

    const nullTimelineRef = {
      current: null,
    } as React.RefObject<HTMLDivElement>;

    const mockEndEvent = {
      clientX: 200,
    } as unknown as React.DragEvent<HTMLDivElement>;

    act(() => {
      result.current.handleDragEnd(mockEndEvent, nullTimelineRef);
    });

    expect(mockSetEvents).not.toHaveBeenCalled();
  });
});
