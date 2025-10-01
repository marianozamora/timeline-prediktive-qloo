import { Calendar } from 'lucide-react';
import { formatDate } from '@/utils/dateUtils';
import type { TimelineHeaderProps } from '@/types/components';

export const TimelineHeader = ({
  minDate,
  maxDate,
  totalDays,
  eventCount,
}: TimelineHeaderProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 bg-blue-600 rounded-lg shadow-md">
        <Calendar className="w-6 h-6 text-white" />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Project Timeline</h1>
        <p className="text-sm text-gray-600 mt-1">
          {formatDate(minDate)} - {formatDate(maxDate)} • {totalDays} days •{' '}
          {eventCount} events
        </p>
      </div>
    </div>
  );
};
