import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

type TimelineEventProps = {
  title: string;
  description?: string;
  timestamp: string;
  type?: 'default' | 'success' | 'warning' | 'error';
  onClick?: () => void;
  isSelected?: boolean;
};

const TimelineEvent = ({
  title,
  description,
  timestamp,
  type = 'default',
  onClick,
  isSelected,
}: TimelineEventProps) => (
  <div
    className={`p-4 border-l-4 ${type === 'success' ? 'border-green-500' : type === 'warning' ? 'border-yellow-500' : type === 'error' ? 'border-red-500' : 'border-blue-500'} ${isSelected ? 'bg-blue-50' : 'bg-white'} cursor-pointer`}
    onClick={onClick}
    role={onClick ? 'button' : undefined}
  >
    <h3 className="font-semibold">{title}</h3>
    {description && <p className="text-gray-600 mt-1">{description}</p>}
    <time className="text-sm text-gray-500 mt-2 block">{timestamp}</time>
  </div>
);

describe('TimelineEvent', () => {
  it('renders with title and timestamp', () => {
    render(<TimelineEvent title="Event Title" timestamp="2023-01-01" />);

    expect(screen.getByText('Event Title')).toBeInTheDocument();
    expect(screen.getByText('2023-01-01')).toBeInTheDocument();
  });

  it('renders with description when provided', () => {
    render(
      <TimelineEvent
        title="Event"
        description="Event description"
        timestamp="2023-01-01"
      />
    );

    expect(screen.getByText('Event description')).toBeInTheDocument();
  });

  it('applies correct border color for event types', () => {
    const { container, rerender } = render(
      <TimelineEvent
        title="Success Event"
        timestamp="2023-01-01"
        type="success"
        onClick={vi.fn()}
      />
    );

    expect(container.firstChild).toHaveClass('border-green-500');

    rerender(
      <TimelineEvent
        title="Warning Event"
        timestamp="2023-01-01"
        type="warning"
        onClick={vi.fn()}
      />
    );
    expect(container.firstChild).toHaveClass('border-yellow-500');

    rerender(
      <TimelineEvent
        title="Error Event"
        timestamp="2023-01-01"
        type="error"
        onClick={vi.fn()}
      />
    );
    expect(container.firstChild).toHaveClass('border-red-500');
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <TimelineEvent
        title="Event"
        timestamp="2023-01-01"
        onClick={handleClick}
      />
    );

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies selected styling when isSelected is true', () => {
    const { container } = render(
      <TimelineEvent
        title="Event"
        timestamp="2023-01-01"
        isSelected
        onClick={vi.fn()}
      />
    );

    expect(container.firstChild).toHaveClass('bg-blue-50');
  });
});
