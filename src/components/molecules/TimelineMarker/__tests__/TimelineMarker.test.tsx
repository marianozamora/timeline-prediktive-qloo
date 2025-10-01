import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

interface TimelineMarkerProps {
  timestamp: string;
  isActive?: boolean;
  onClick?: () => void;
  position: number;
  type?: 'major' | 'minor';
}

const TimelineMarker = ({
  timestamp,
  isActive,
  onClick,
  position,
  type = 'minor',
}: TimelineMarkerProps) => (
  <div
    className={`absolute flex flex-col items-center cursor-pointer ${isActive ? 'z-10' : ''}`}
    style={{ left: `${position}%` }}
    onClick={onClick}
    role={onClick ? 'button' : undefined}
  >
    <div
      className={`w-2 h-2 rounded-full ${isActive ? 'bg-blue-600 scale-125' : 'bg-gray-400'} ${type === 'major' ? 'w-3 h-3' : ''} transition-all`}
    />
    <span
      className={`text-xs mt-1 ${isActive ? 'font-semibold text-blue-600' : 'text-gray-500'}`}
    >
      {timestamp}
    </span>
  </div>
);

describe('TimelineMarker', () => {
  it('renders with timestamp', () => {
    render(<TimelineMarker timestamp="12:00" position={50} />);

    expect(screen.getByText('12:00')).toBeInTheDocument();
  });

  it('applies correct position style', () => {
    const { container } = render(
      <TimelineMarker timestamp="12:00" position={75} onClick={vi.fn()} />
    );

    const marker = container.firstChild as HTMLElement;
    expect(marker).toHaveStyle({ left: '75%' });
  });

  it('applies active styling when isActive is true', () => {
    const { container } = render(
      <TimelineMarker
        timestamp="12:00"
        position={50}
        isActive
        onClick={vi.fn()}
      />
    );

    const marker = container.firstChild as HTMLElement;
    const dot = marker.querySelector('div');
    const text = screen.getByText('12:00');

    expect(dot).toHaveClass('bg-blue-600', 'scale-125');
    expect(text).toHaveClass('font-semibold', 'text-blue-600');
  });

  it('applies major type styling', () => {
    const { container } = render(
      <TimelineMarker
        timestamp="12:00"
        position={50}
        type="major"
        onClick={vi.fn()}
      />
    );

    const marker = container.firstChild as HTMLElement;
    const dot = marker.querySelector('div');
    expect(dot).toHaveClass('w-3', 'h-3');
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <TimelineMarker timestamp="12:00" position={50} onClick={handleClick} />
    );

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct default styling for minor markers', () => {
    const { container } = render(
      <TimelineMarker timestamp="12:00" position={50} onClick={vi.fn()} />
    );

    const marker = container.firstChild as HTMLElement;
    const dot = marker.querySelector('div');
    expect(dot).toHaveClass('w-2', 'h-2', 'bg-gray-400');
  });
});
