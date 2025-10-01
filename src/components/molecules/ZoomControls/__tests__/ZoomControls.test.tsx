import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

type ZoomControlsProps = {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  zoomLevel?: number;
  minZoom?: number;
  maxZoom?: number;
  disabled?: boolean;
};

const ZoomControls = ({
  onZoomIn,
  onZoomOut,
  onReset,
  zoomLevel = 100,
  minZoom = 25,
  maxZoom = 400,
  disabled = false,
}: ZoomControlsProps) => (
  <div className="flex items-center gap-2 p-2 bg-white border rounded-lg shadow-sm">
    <button
      onClick={onZoomOut}
      disabled={disabled || zoomLevel <= minZoom}
      className="p-2 hover:bg-gray-100 rounded disabled:opacity-50"
      aria-label="Zoom out"
    >
      <ZoomOut className="w-4 h-4" />
    </button>

    <span className="text-sm font-medium min-w-12 text-center">
      {zoomLevel}%
    </span>

    <button
      onClick={onZoomIn}
      disabled={disabled || zoomLevel >= maxZoom}
      className="p-2 hover:bg-gray-100 rounded disabled:opacity-50"
      aria-label="Zoom in"
    >
      <ZoomIn className="w-4 h-4" />
    </button>

    <div className="w-px h-6 bg-gray-300 mx-1" />

    <button
      onClick={onReset}
      disabled={disabled}
      className="p-2 hover:bg-gray-100 rounded disabled:opacity-50"
      aria-label="Reset zoom"
    >
      <RotateCcw className="w-4 h-4" />
    </button>
  </div>
);

describe('ZoomControls', () => {
  const mockHandlers = {
    onZoomIn: vi.fn(),
    onZoomOut: vi.fn(),
    onReset: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all control buttons', () => {
    render(<ZoomControls {...mockHandlers} />);

    expect(screen.getByLabelText('Zoom in')).toBeInTheDocument();
    expect(screen.getByLabelText('Zoom out')).toBeInTheDocument();
    expect(screen.getByLabelText('Reset zoom')).toBeInTheDocument();
  });

  it('displays current zoom level', () => {
    render(<ZoomControls {...mockHandlers} zoomLevel={150} />);

    expect(screen.getByText('150%')).toBeInTheDocument();
  });

  it('calls onZoomIn when zoom in button is clicked', async () => {
    const user = userEvent.setup();
    render(<ZoomControls {...mockHandlers} />);

    await user.click(screen.getByLabelText('Zoom in'));
    expect(mockHandlers.onZoomIn).toHaveBeenCalledTimes(1);
  });

  it('calls onZoomOut when zoom out button is clicked', async () => {
    const user = userEvent.setup();
    render(<ZoomControls {...mockHandlers} />);

    await user.click(screen.getByLabelText('Zoom out'));
    expect(mockHandlers.onZoomOut).toHaveBeenCalledTimes(1);
  });

  it('calls onReset when reset button is clicked', async () => {
    const user = userEvent.setup();
    render(<ZoomControls {...mockHandlers} />);

    await user.click(screen.getByLabelText('Reset zoom'));
    expect(mockHandlers.onReset).toHaveBeenCalledTimes(1);
  });

  it('disables zoom out button at minimum zoom', () => {
    render(<ZoomControls {...mockHandlers} zoomLevel={25} minZoom={25} />);

    expect(screen.getByLabelText('Zoom out')).toBeDisabled();
  });

  it('disables zoom in button at maximum zoom', () => {
    render(<ZoomControls {...mockHandlers} zoomLevel={400} maxZoom={400} />);

    expect(screen.getByLabelText('Zoom in')).toBeDisabled();
  });

  it('disables all buttons when disabled prop is true', () => {
    render(<ZoomControls {...mockHandlers} disabled />);

    expect(screen.getByLabelText('Zoom in')).toBeDisabled();
    expect(screen.getByLabelText('Zoom out')).toBeDisabled();
    expect(screen.getByLabelText('Reset zoom')).toBeDisabled();
  });
});
