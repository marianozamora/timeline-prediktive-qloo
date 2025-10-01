import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

type TimelineStatsProps = {
  totalEvents: number;
  selectedPeriod: string;
  avgEventsPerDay?: number;
  mostActiveDay?: string;
};

const TimelineStats = ({
  totalEvents,
  selectedPeriod,
  avgEventsPerDay,
  mostActiveDay,
}: TimelineStatsProps) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h3 className="text-lg font-semibold mb-3">Timeline Statistics</h3>
    <div className="grid grid-cols-2 gap-4">
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-600">{totalEvents}</div>
        <div className="text-sm text-gray-600">Total Events</div>
      </div>
      <div className="text-center">
        <div className="text-lg font-semibold">{selectedPeriod}</div>
        <div className="text-sm text-gray-600">Selected Period</div>
      </div>
      {avgEventsPerDay && (
        <div className="text-center">
          <div className="text-lg font-semibold">
            {avgEventsPerDay.toFixed(1)}
          </div>
          <div className="text-sm text-gray-600">Avg Events/Day</div>
        </div>
      )}
      {mostActiveDay && (
        <div className="text-center">
          <div className="text-lg font-semibold">{mostActiveDay}</div>
          <div className="text-sm text-gray-600">Most Active Day</div>
        </div>
      )}
    </div>
  </div>
);

describe('TimelineStats', () => {
  it('renders with total events and selected period', () => {
    render(<TimelineStats totalEvents={25} selectedPeriod="This Week" />);

    expect(screen.getByText('Timeline Statistics')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('Total Events')).toBeInTheDocument();
    expect(screen.getByText('This Week')).toBeInTheDocument();
    expect(screen.getByText('Selected Period')).toBeInTheDocument();
  });

  it('renders average events per day when provided', () => {
    render(
      <TimelineStats
        totalEvents={35}
        selectedPeriod="This Month"
        avgEventsPerDay={2.5}
      />
    );

    expect(screen.getByText('2.5')).toBeInTheDocument();
    expect(screen.getByText('Avg Events/Day')).toBeInTheDocument();
  });

  it('renders most active day when provided', () => {
    render(
      <TimelineStats
        totalEvents={20}
        selectedPeriod="This Week"
        mostActiveDay="Monday"
      />
    );

    expect(screen.getByText('Monday')).toBeInTheDocument();
    expect(screen.getByText('Most Active Day')).toBeInTheDocument();
  });

  it('renders all stats when all props are provided', () => {
    render(
      <TimelineStats
        totalEvents={50}
        selectedPeriod="This Month"
        avgEventsPerDay={1.67}
        mostActiveDay="Friday"
      />
    );

    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('This Month')).toBeInTheDocument();
    expect(screen.getByText('1.7')).toBeInTheDocument();
    expect(screen.getByText('Friday')).toBeInTheDocument();
  });

  it('does not render optional stats when not provided', () => {
    render(<TimelineStats totalEvents={10} selectedPeriod="Today" />);

    expect(screen.queryByText('Avg Events/Day')).not.toBeInTheDocument();
    expect(screen.queryByText('Most Active Day')).not.toBeInTheDocument();
  });
});
