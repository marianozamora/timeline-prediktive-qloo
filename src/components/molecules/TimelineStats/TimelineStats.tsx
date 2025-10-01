import type { TimelineStatsProps } from '@/types/components';

export const TimelineStats = ({
  eventCount,
  laneCount,
}: TimelineStatsProps) => {
  const efficiency = (eventCount / laneCount).toFixed(2);

  return (
    <div
      className="px-6 py-4 bg-gray-50 border-t border-gray-200 
                    flex flex-wrap gap-6 text-sm"
    >
      <div className="flex items-center gap-2">
        <span className="font-semibold text-gray-700">Total Events:</span>
        <span className="text-gray-600">{eventCount}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-semibold text-gray-700">Lanes Used:</span>
        <span className="text-gray-600">{laneCount}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-semibold text-gray-700">Efficiency:</span>
        <span className="text-gray-600">{efficiency}x compression</span>
      </div>
      <div className="flex items-center gap-2 text-gray-500 italic">
        💡 Drag events to reschedule • Click edit icon to rename
      </div>
    </div>
  );
};
