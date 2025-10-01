import { Edit2 } from 'lucide-react';
import type { EditButtonProps } from '@/types/components';

export const EditButton = ({ onClick }: EditButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200
                 p-1 hover:bg-white/20 rounded flex-shrink-0 active:scale-90
                 focus:outline-none focus:ring-2 focus:ring-white/50"
      title="Edit event name"
      aria-label="Edit event name"
    >
      <Edit2 className="w-3.5 h-3.5 text-white" />
    </button>
  );
};
