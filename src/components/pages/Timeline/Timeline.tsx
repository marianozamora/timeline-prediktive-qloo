import { useState, useRef } from 'react';
import { TimelineHeader } from '@/components/molecules/TimelineHeader/TimelineHeader';
import { ZoomControls } from '@/components/molecules/ZoomControls/ZoomControls';
import { TimelineMarker } from '@/components/molecules/TimelineMarker/TimelineMarker';
import { TimelineLanes } from '@/components/organisms/TimelineLanes/TimelineLanes';
import { TimelineStats } from '@/components/molecules/TimelineStats/TimelineStats';
import { useTimelineLayout } from '@/hooks/useTimelineLayout';
import { useInlineEdit } from '@/hooks/useInlineEdit';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import timelineItems from '@/data/timelineItems';
import type { TimelineProps } from '@/types/components';

export const Timeline = ({ initialEvents = timelineItems }: TimelineProps) => {
  const [events, setEvents] = useState(initialEvents);
  const [zoomLevel, setZoomLevel] = useState(1);
  const timelineRef = useRef<HTMLDivElement>(null);

  const {
    minDate,
    maxDate,
    totalDays,
    lanesWithEvents,
    getEventStyle,
    timelineMarkers,
  } = useTimelineLayout(events);

  const {
    editingId,
    editingName,
    setEditingName,
    startEditing,
    saveEdit,
    cancelEdit,
  } = useInlineEdit(events, setEvents);

  const { draggedEvent, handleDragStart, handleDrag, handleDragEnd } =
    useDragAndDrop(events, setEvents, new Date(minDate), totalDays);

  const handleZoomIn = () => setZoomLevel(Math.min(2, zoomLevel + 0.25));
  const handleZoomOut = () => setZoomLevel(Math.max(0.5, zoomLevel - 0.25));

  const laneHeight = 56 * zoomLevel;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <TimelineHeader
            minDate={minDate}
            maxDate={maxDate}
            totalDays={totalDays}
            eventCount={events.length}
          />

          <ZoomControls
            zoomLevel={zoomLevel}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6">
            <TimelineMarker markers={timelineMarkers} />
            <TimelineLanes
              timelineRef={timelineRef}
              lanesWithEvents={lanesWithEvents}
              laneHeight={laneHeight}
              getEventStyle={getEventStyle}
              editingId={editingId}
              editingName={editingName}
              draggedEvent={draggedEvent}
              onEditChange={e => setEditingName(e.target.value)}
              onStartEdit={startEditing}
              onEditSave={saveEdit}
              onEditCancel={cancelEdit}
              onDragStart={handleDragStart}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
            />
          </div>

          <TimelineStats
            eventCount={events.length}
            laneCount={lanesWithEvents.length}
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
