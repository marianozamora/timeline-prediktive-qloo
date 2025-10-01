import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useInlineEdit } from '../useInlineEdit';
import { mockTimelineItems } from '../../mocks/timelineData';
import type { TimelineItem } from '../../types/timeline';

describe('useInlineEdit', () => {
  const mockSetEvents = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() =>
      useInlineEdit(mockTimelineItems, mockSetEvents)
    );

    expect(result.current.editingId).toBeNull();
    expect(result.current.editingName).toBe('');
  });

  it('starts editing correctly', () => {
    const { result } = renderHook(() =>
      useInlineEdit(mockTimelineItems, mockSetEvents)
    );
    const eventToEdit = {
      id: 1,
      name: 'Project Planning',
      start: '2024-01-01',
      end: '2024-01-15',
      lane: 'development',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-15'),
    };

    act(() => {
      result.current.startEditing(eventToEdit);
    });

    expect(result.current.editingId).toBe(1);
    expect(result.current.editingName).toBe('Project Planning');
  });

  it('does not start editing for non-existent event', () => {
    const { result } = renderHook(() =>
      useInlineEdit(mockTimelineItems, mockSetEvents)
    );

    const nonExistentEvent = {
      id: 999,
      name: 'Non-existent Event',
      start: '2024-01-01',
      end: '2024-01-02',
      lane: 'testing',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-02'),
    };

    act(() => {
      result.current.startEditing(nonExistentEvent);
    });

    expect(result.current.editingId).toBe(999);
    expect(result.current.editingName).toBe('Non-existent Event');
  });

  it('updates editing name', () => {
    const { result } = renderHook(() =>
      useInlineEdit(mockTimelineItems, mockSetEvents)
    );

    const eventToEdit = {
      id: 1,
      name: 'Project Planning',
      start: '2024-01-01',
      end: '2024-01-15',
      lane: 'development',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-15'),
    };

    act(() => {
      result.current.startEditing(eventToEdit);
    });

    act(() => {
      result.current.setEditingName('Updated Project Planning');
    });

    expect(result.current.editingName).toBe('Updated Project Planning');
  });

  it('saves edit correctly', () => {
    const { result } = renderHook(() =>
      useInlineEdit(mockTimelineItems, mockSetEvents)
    );

    const eventToEdit = {
      id: 1,
      name: 'Project Planning',
      start: '2024-01-01',
      end: '2024-01-15',
      lane: 'development',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-15'),
    };

    act(() => {
      result.current.startEditing(eventToEdit);
    });

    act(() => {
      result.current.setEditingName('Updated Project Planning');
    });

    act(() => {
      result.current.saveEdit();
    });

    expect(mockSetEvents).toHaveBeenCalledWith([
      {
        id: 1,
        name: 'Updated Project Planning',
        start: '2024-01-01',
        end: '2024-01-15',
        lane: 'development',
      },
      ...mockTimelineItems.slice(1),
    ]);
    expect(result.current.editingId).toBeNull();
    expect(result.current.editingName).toBe('');
  });

  it('does not save if not editing', () => {
    const { result } = renderHook(() =>
      useInlineEdit(mockTimelineItems, mockSetEvents)
    );

    act(() => {
      result.current.saveEdit();
    });

    expect(mockSetEvents).not.toHaveBeenCalled();
  });

  it('cancels edit correctly', () => {
    const { result } = renderHook(() =>
      useInlineEdit(mockTimelineItems, mockSetEvents)
    );

    const eventToEdit = {
      id: 1,
      name: 'Project Planning',
      start: '2024-01-01',
      end: '2024-01-15',
      lane: 'development',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-15'),
    };

    act(() => {
      result.current.startEditing(eventToEdit);
    });

    act(() => {
      result.current.setEditingName('Updated Project Planning');
    });

    act(() => {
      result.current.cancelEdit();
    });

    expect(mockSetEvents).not.toHaveBeenCalled();
    expect(result.current.editingId).toBeNull();
    expect(result.current.editingName).toBe('');
  });

  it('handles empty event name gracefully', () => {
    const { result } = renderHook(() =>
      useInlineEdit(mockTimelineItems, mockSetEvents)
    );

    const eventToEdit = {
      id: 1,
      name: 'Project Planning',
      start: '2024-01-01',
      end: '2024-01-15',
      lane: 'development',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-15'),
    };

    act(() => {
      result.current.startEditing(eventToEdit);
    });

    act(() => {
      result.current.setEditingName('');
    });

    act(() => {
      result.current.saveEdit();
    });

    expect(mockSetEvents).toHaveBeenCalledWith([
      {
        id: 1,
        name: '',
        start: '2024-01-01',
        end: '2024-01-15',
        lane: 'development',
      },
      ...mockTimelineItems.slice(1),
    ]);
  });

  it('preserves other event properties when saving', () => {
    const eventsWithExtraProps: TimelineItem[] = [
      {
        id: 1,
        name: 'Event 1',
        start: '2024-01-01',
        end: '2024-01-05',
        lane: 'development',
      },
    ];

    const { result } = renderHook(() =>
      useInlineEdit(eventsWithExtraProps, mockSetEvents)
    );

    const eventToEdit = {
      id: 1,
      name: 'Event 1',
      start: '2024-01-01',
      end: '2024-01-05',
      lane: 'development',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-05'),
    };

    act(() => {
      result.current.startEditing(eventToEdit);
    });

    act(() => {
      result.current.setEditingName('Updated Name');
    });

    act(() => {
      result.current.saveEdit();
    });

    expect(mockSetEvents).toHaveBeenCalledWith([
      {
        id: 1,
        name: 'Updated Name',
        start: '2024-01-01',
        end: '2024-01-05',
        lane: 'development',
      },
    ]);
  });
});
