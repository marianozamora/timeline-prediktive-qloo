import { formatDate } from '@/utils/dateUtils';
import type { DateLabelProps } from '@/types/components';

export const DateLabel = ({ date, position }: DateLabelProps) => {
  return (
    <div className="absolute top-0" style={{ left: `${position}%` }}>
      <div className="relative">
        <div
          className="absolute w-px h-3 bg-gray-400"
          style={{ left: '0' }}
          aria-hidden="true"
        />
        <time
          className="absolute whitespace-nowrap text-xs font-medium text-gray-600"
          style={{ left: '-30px', top: '6px' }}
          dateTime={date.toISOString()}
        >
          {formatDate(date)}
        </time>
      </div>
    </div>
  );
};
