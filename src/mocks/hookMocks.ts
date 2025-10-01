import type {
  UseDragAndDropReturn,
  UseInlineEditReturn,
  UseTimelineLayoutReturn,
} from '../types/hooks';
import { mockParsedEvents, mockTimelineMarkers } from './timelineData';
import { vi } from 'vitest';

export const mockUseDragAndDrop: UseDragAndDropReturn = {
  draggedEvent: null,
  handleDragStart: vi.fn(),
  handleDrag: vi.fn(),
  handleDragEnd: vi.fn(),
};

export const mockUseInlineEdit: UseInlineEditReturn = {
  editingId: null,
  editingName: '',
  setEditingName: vi.fn(),
  startEditing: vi.fn(),
  saveEdit: vi.fn(),
  cancelEdit: vi.fn(),
};

export const mockUseTimelineLayout: UseTimelineLayoutReturn = {
  minDate: new Date('2024-01-01'),
  maxDate: new Date('2024-03-15'),
  totalDays: 74,
  lanesWithEvents: [
    mockParsedEvents.filter(e => e.lane === 'development'),
    mockParsedEvents.filter(e => e.lane === 'design'),
  ],
  getEventStyle: vi.fn(() => ({
    left: '10%',
    width: '20%',
    top: '10px',
    height: '40px',
  })),
  timelineMarkers: mockTimelineMarkers.map(marker => ({
    ...marker,
    date: new Date(marker.date),
  })),
  parsedEvents: mockParsedEvents,
};
