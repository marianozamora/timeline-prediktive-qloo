import type { ZoomButtonProps } from '@/types/components';

export const ZoomButton = ({
  icon: Icon,
  onClick,
  disabled,
  title,
}: ZoomButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="p-1.5 hover:bg-gray-100 rounded transition-colors duration-200
                 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label={title}
    >
      <Icon className="w-4 h-4 text-gray-700" />
    </button>
  );
};
