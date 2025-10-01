import { useState, useCallback } from 'react';
import type { TimelineItem, ParsedTimelineEvent } from '../types/timeline';
import type { UseInlineEditReturn } from '../types/hooks';

export const useInlineEdit = (
  events: TimelineItem[],
  setEvents: (events: TimelineItem[]) => void
): UseInlineEditReturn => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState<string>('');

  const startEditing = useCallback((event: ParsedTimelineEvent) => {
    setEditingId(event.id);
    setEditingName(event.name);
  }, []);

  const saveEdit = useCallback(() => {
    if (editingId !== null) {
      setEvents(
        events.map(e => (e.id === editingId ? { ...e, name: editingName } : e))
      );
    }
    setEditingId(null);
    setEditingName('');
  }, [editingId, editingName, events, setEvents]);

  const cancelEdit = useCallback(() => {
    setEditingId(null);
    setEditingName('');
  }, []);

  return {
    editingId,
    editingName,
    setEditingName,
    startEditing,
    saveEdit,
    cancelEdit,
  };
};
