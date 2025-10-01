import { ZoomIn, ZoomOut } from 'lucide-react';
import { ZoomButton } from '@/components/atoms/Button/ZoomButton';
import type { ZoomControlsProps } from '@/types/components';

export const ZoomControls = ({
  zoomLevel,
  onZoomIn,
  onZoomOut,
}: ZoomControlsProps) => {
  return (
    <div
      className="flex items-center gap-2 bg-white rounded-lg shadow-sm 
                    border border-gray-200 px-3 py-2"
    >
      <ZoomButton
        icon={ZoomOut}
        onClick={onZoomOut}
        disabled={zoomLevel <= 0.5}
        title="Zoom out"
      />
      <span className="text-sm font-medium text-gray-700 min-w-[60px] text-center">
        {Math.round(zoomLevel * 100)}%
      </span>
      <ZoomButton
        icon={ZoomIn}
        onClick={onZoomIn}
        disabled={zoomLevel >= 2}
        title="Zoom in"
      />
    </div>
  );
};
