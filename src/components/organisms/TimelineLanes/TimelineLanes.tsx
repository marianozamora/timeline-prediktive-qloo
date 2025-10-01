import { TimelineEvent } from '@/components/molecules/TimelineEvent/TimelineEvent';
import type { TimelineLanesProps } from '@/types/components';

export const TimelineLanes = ({
  timelineRef,
  lanesWithEvents,
  laneHeight,
  getEventStyle,
  editingId,
  editingName,
  draggedEvent,
  onEditChange,
  onStartEdit,
  onEditSave,
  onEditCancel,
  onDragStart,
  onDrag,
  onDragEnd,
}: TimelineLanesProps) => {
  return (
    <div
      ref={timelineRef}
      className="relative select-none"
      style={{
        minHeight: `${Math.max(lanesWithEvents.length * laneHeight, 200)}px`,
        height: `${lanesWithEvents.length * laneHeight}px`,
      }}
    >
      {lanesWithEvents.map((lane, laneIdx) => (
        <div
          key={laneIdx}
          className="absolute w-full"
          style={{
            top: `${laneIdx * laneHeight}px`,
            height: `${laneHeight}px`,
          }}
        >
          <div
            className={`absolute inset-0 ${
              laneIdx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
            } border-b border-gray-200`}
          />

          {lane.map(event => {
            const style = getEventStyle(event);
            const isEditing = editingId === event.id;
            const isDragging = draggedEvent?.id === event.id;

            return (
              <TimelineEvent
                key={event.id}
                event={event}
                style={style}
                laneHeight={laneHeight}
                isEditing={isEditing}
                editingName={editingName}
                isDragging={isDragging}
                onDragStart={e =>
                  onDragStart(
                    e as React.DragEvent<HTMLDivElement>,
                    event,
                    timelineRef
                  )
                }
                onDrag={e => onDrag(e as React.DragEvent<HTMLDivElement>)}
                onDragEnd={e =>
                  onDragEnd(e as React.DragEvent<HTMLDivElement>, timelineRef)
                }
                onStartEdit={() => onStartEdit(event)}
                onEditChange={onEditChange}
                onEditSave={onEditSave}
                onEditCancel={onEditCancel}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
