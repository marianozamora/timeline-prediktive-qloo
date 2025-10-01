import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ZoomIn } from 'lucide-react';
import { ZoomButton } from './ZoomButton';

describe('ZoomButton', () => {
  it('renders with correct title and aria-label', () => {
    const mockClick = vi.fn();
    render(<ZoomButton icon={ZoomIn} onClick={mockClick} title="Zoom in" />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('title', 'Zoom in');
    expect(button).toHaveAttribute('aria-label', 'Zoom in');
  });

  it('calls onClick when clicked', () => {
    const mockClick = vi.fn();
    render(<ZoomButton icon={ZoomIn} onClick={mockClick} title="Zoom in" />);

    fireEvent.click(screen.getByRole('button'));
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    const mockClick = vi.fn();
    render(
      <ZoomButton icon={ZoomIn} onClick={mockClick} title="Zoom in" disabled />
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(mockClick).not.toHaveBeenCalled();
  });
});
