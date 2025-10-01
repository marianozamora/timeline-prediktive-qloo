import { DateLabel } from '@/components/atoms/Text/DateLabel';
import type { TimelineMarkerProps } from '@/types/components';

export const TimelineMarker = ({ markers }: TimelineMarkerProps) => {
  return (
    <div className="relative h-12 mb-4 border-b-2 border-gray-200">
      {markers.map((marker, idx) => (
        <DateLabel key={idx} date={marker.date} position={marker.position} />
      ))}
    </div>
  );
};
