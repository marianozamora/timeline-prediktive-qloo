import type { InlineInputProps } from '@/types/components';

export const InlineInput = ({
  value,
  onChange,
  onBlur,
  onKeyDown,
  autoFocus = true,
}: InlineInputProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      className="flex-1 bg-white text-gray-900 text-sm font-medium px-2 py-1 
                 rounded border-2 border-blue-400 focus:outline-none focus:ring-2 
                 focus:ring-blue-500 focus:border-transparent transition-all"
      autoFocus={autoFocus}
      onClick={e => e.stopPropagation()}
      aria-label="Edit event name"
    />
  );
};
