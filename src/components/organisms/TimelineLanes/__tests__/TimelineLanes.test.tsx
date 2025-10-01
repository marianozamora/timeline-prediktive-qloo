import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

interface Lane {
  id: string;
  name: string;
  height?: number;
  color?: string;
}

interface TimelineLanesProps {
  lanes: Lane[];
  onLaneClick?: (laneId: string) => void;
  selectedLaneId?: string;
  laneHeight?: number;
  showLabels?: boolean;
}

const TimelineLanes = ({
  lanes,
  onLaneClick,
  selectedLaneId,
  laneHeight = 60,
  showLabels = true,
}: TimelineLanesProps) => (
  <div className="timeline-lanes" data-testid="timeline-lanes">
    {lanes.map((lane, index) => (
      <div
        key={lane.id}
        className={`timeline-lane ${selectedLaneId === lane.id ? 'selected' : ''}`}
        style={{
          height: `${lane.height || laneHeight}px`,
          backgroundColor: lane.color || '#f8f9fa',
          top: `${index * laneHeight}px`,
        }}
        onClick={() => onLaneClick?.(lane.id)}
        role={onLaneClick ? 'button' : undefined}
        tabIndex={onLaneClick ? 0 : undefined}
        data-testid={`lane-${lane.id}`}
      >
        {showLabels && (
          <div className="lane-label p-2 text-sm font-medium">{lane.name}</div>
        )}
      </div>
    ))}
  </div>
);

describe('TimelineLanes', () => {
  const mockLanes: Lane[] = [
    { id: 'lane1', name: 'Development' },
    { id: 'lane2', name: 'Testing', color: '#e3f2fd' },
    { id: 'lane3', name: 'Design', height: 80 },
  ];

  it('renders all lanes', () => {
    render(<TimelineLanes lanes={mockLanes} />);

    expect(screen.getByTestId('lane-lane1')).toBeInTheDocument();
    expect(screen.getByTestId('lane-lane2')).toBeInTheDocument();
    expect(screen.getByTestId('lane-lane3')).toBeInTheDocument();
  });

  it('displays lane labels when showLabels is true', () => {
    render(<TimelineLanes lanes={mockLanes} showLabels />);

    expect(screen.getByText('Development')).toBeInTheDocument();
    expect(screen.getByText('Testing')).toBeInTheDocument();
    expect(screen.getByText('Design')).toBeInTheDocument();
  });

  it('hides lane labels when showLabels is false', () => {
    render(<TimelineLanes lanes={mockLanes} showLabels={false} />);

    expect(screen.queryByText('Development')).not.toBeInTheDocument();
    expect(screen.queryByText('Testing')).not.toBeInTheDocument();
  });

  it('applies custom lane height', () => {
    render(<TimelineLanes lanes={mockLanes} laneHeight={100} />);

    const lane1 = screen.getByTestId('lane-lane1');
    expect(lane1).toHaveStyle({ height: '100px' });
  });

  it('applies individual lane height when specified', () => {
    render(<TimelineLanes lanes={mockLanes} />);

    const lane3 = screen.getByTestId('lane-lane3');
    expect(lane3).toHaveStyle({ height: '80px' });
  });

  it('applies custom lane colors', () => {
    render(<TimelineLanes lanes={mockLanes} />);

    const lane2 = screen.getByTestId('lane-lane2');
    expect(lane2).toHaveStyle({ backgroundColor: '#e3f2fd' });
  });

  it('applies correct positioning', () => {
    render(<TimelineLanes lanes={mockLanes} laneHeight={60} />);

    const lane1 = screen.getByTestId('lane-lane1');
    const lane2 = screen.getByTestId('lane-lane2');
    const lane3 = screen.getByTestId('lane-lane3');

    expect(lane1).toHaveStyle({ top: '0px' });
    expect(lane2).toHaveStyle({ top: '60px' });
    expect(lane3).toHaveStyle({ top: '120px' });
  });

  it('calls onLaneClick when lane is clicked', async () => {
    const user = userEvent.setup();
    const handleLaneClick = vi.fn();

    render(<TimelineLanes lanes={mockLanes} onLaneClick={handleLaneClick} />);

    await user.click(screen.getByTestId('lane-lane1'));
    expect(handleLaneClick).toHaveBeenCalledWith('lane1');
  });

  it('applies selected styling to selected lane', () => {
    render(
      <TimelineLanes
        lanes={mockLanes}
        selectedLaneId="lane2"
        onLaneClick={vi.fn()}
      />
    );

    const selectedLane = screen.getByTestId('lane-lane2');
    expect(selectedLane).toHaveClass('selected');
  });

  it('makes lanes clickable when onLaneClick is provided', () => {
    render(<TimelineLanes lanes={mockLanes} onLaneClick={vi.fn()} />);

    const lane1 = screen.getByTestId('lane-lane1');
    expect(lane1).toHaveAttribute('role', 'button');
    expect(lane1).toHaveAttribute('tabIndex', '0');
  });

  it('does not make lanes clickable when onLaneClick is not provided', () => {
    render(<TimelineLanes lanes={mockLanes} />);

    const lane1 = screen.getByTestId('lane-lane1');
    expect(lane1).not.toHaveAttribute('role');
    expect(lane1).not.toHaveAttribute('tabIndex');
  });

  it('handles empty lanes array', () => {
    render(<TimelineLanes lanes={[]} />);

    const container = screen.getByTestId('timeline-lanes');
    expect(container).toBeInTheDocument();
    expect(container.children).toHaveLength(0);
  });

  it('applies default background color when not specified', () => {
    render(<TimelineLanes lanes={[{ id: 'test', name: 'Test Lane' }]} />);

    const lane = screen.getByTestId('lane-test');
    expect(lane).toHaveStyle({ backgroundColor: '#f8f9fa' });
  });
});
