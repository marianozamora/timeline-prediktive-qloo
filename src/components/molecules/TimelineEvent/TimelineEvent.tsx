import { GripVertical } from 'lucide-react';
import { EditButton } from '@/components/atoms/Button/EditButton';
import { InlineInput } from '@/components/atoms/Input/InlineInput';
import { formatDate } from '@/utils/dateUtils';
import { getEventColor } from '@/constants/colors';
import type { TimelineEventProps } from '@/types/components';

export const TimelineEvent = ({
  event,
  style,
  laneHeight,
  isEditing,
  editingName,
  isDragging,
  onDragStart,
  onDrag,
  onDragEnd,
  onStartEdit,
  onEditChange,
  onEditSave,
  onEditCancel,
}: TimelineEventProps) => {
  const color = getEventColor(event.id);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onEditSave();
    if (e.key === 'Escape') onEditCancel();
  };

  return (
    <div
      className={`absolute ${color} rounded-lg shadow-md hover:shadow-xl 
                 transition-all duration-200 cursor-move group 
                 ${isDragging ? 'opacity-50' : ''}`}
      style={{
        ...style,
        top: '8px',
        height: `${laneHeight - 16}px`,
        minWidth: '70px',
        zIndex: isDragging ? 50 : 10,
      }}
      draggable={!isEditing}
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      title={
        isEditing
          ? ''
          : `${event.name}\n${event.start} to ${event.end}\nDrag to reschedule`
      }
    >
      <div className="px-3 py-2 h-full flex items-center gap-2 relative">
        <GripVertical
          className="w-4 h-4 text-white/70 opacity-0 group-hover:opacity-100 
                     transition-opacity duration-200 flex-shrink-0"
          aria-hidden="true"
        />

        {isEditing ? (
          <InlineInput
            value={editingName}
            onChange={onEditChange}
            onBlur={onEditSave}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <>
            <div
              className="flex-1 text-white text-sm font-medium truncate"
              title={event.name}
            >
              {event.name}
            </div>
            <EditButton onClick={onStartEdit} />
          </>
        )}
      </div>

      {!isEditing && (
        <div
          className="absolute bottom-full left-0 mb-2 hidden group-hover:block 
                      bg-gray-900 text-white text-xs rounded-lg px-3 py-2 
                      whitespace-nowrap z-50 shadow-xl animate-fade-in"
        >
          <div className="font-semibold mb-1">{event.name}</div>
          <div className="text-gray-300">
            {formatDate(event.startDate)} - {formatDate(event.endDate)}
          </div>
          <div className="text-gray-400 text-[10px] mt-1">
            Drag to reschedule • Click edit to rename
          </div>
        </div>
      )}
    </div>
  );
};
