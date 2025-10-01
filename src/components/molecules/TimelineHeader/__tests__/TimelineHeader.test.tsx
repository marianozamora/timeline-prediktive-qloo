import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Filter, Search } from 'lucide-react';

interface TimelineHeaderProps {
  title: string;
  subtitle?: string;
  onSearch?: (query: string) => void;
  onFilter?: () => void;
  searchValue?: string;
  showSearch?: boolean;
  showFilter?: boolean;
}

const TimelineHeader = ({
  title,
  subtitle,
  onSearch,
  onFilter,
  searchValue,
  showSearch = true,
  showFilter = true,
}: TimelineHeaderProps) => (
  <div className="flex flex-col gap-4 p-4 border-b">
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
      </div>
      <div className="flex gap-2">
        {showFilter && (
          <button
            onClick={onFilter}
            className="p-2 border rounded"
            aria-label="Filter timeline"
          >
            <Filter className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
    {showSearch && (
      <div className="flex items-center gap-2 p-2 border rounded">
        <Search className="w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search events..."
          value={searchValue}
          onChange={e => onSearch?.(e.target.value)}
          className="flex-1 outline-none"
        />
      </div>
    )}
  </div>
);

describe('TimelineHeader', () => {
  it('renders title', () => {
    render(<TimelineHeader title="Timeline Title" />);

    expect(screen.getByText('Timeline Title')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(<TimelineHeader title="Title" subtitle="Timeline subtitle" />);

    expect(screen.getByText('Timeline subtitle')).toBeInTheDocument();
  });

  it('renders search input when showSearch is true', () => {
    render(<TimelineHeader title="Title" showSearch />);

    expect(screen.getByPlaceholderText('Search events...')).toBeInTheDocument();
  });

  it('does not render search input when showSearch is false', () => {
    render(<TimelineHeader title="Title" showSearch={false} />);

    expect(
      screen.queryByPlaceholderText('Search events...')
    ).not.toBeInTheDocument();
  });

  it('renders filter button when showFilter is true', () => {
    render(<TimelineHeader title="Title" showFilter />);

    expect(screen.getByLabelText('Filter timeline')).toBeInTheDocument();
  });

  it('calls onSearch when typing in search input', async () => {
    const user = userEvent.setup();
    const handleSearch = vi.fn();

    render(<TimelineHeader title="Title" onSearch={handleSearch} />);

    await user.type(screen.getByPlaceholderText('Search events...'), 'test');
    expect(handleSearch).toHaveBeenCalledWith('t');
  });

  it('calls onFilter when filter button is clicked', async () => {
    const user = userEvent.setup();
    const handleFilter = vi.fn();

    render(<TimelineHeader title="Title" onFilter={handleFilter} />);

    await user.click(screen.getByLabelText('Filter timeline'));
    expect(handleFilter).toHaveBeenCalledTimes(1);
  });
});
