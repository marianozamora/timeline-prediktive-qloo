import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders timeline without crashing', () => {
    render(<App />);
    expect(screen.getByText(/Project Timeline/i)).toBeInTheDocument();
  });

  it('renders zoom controls', () => {
    render(<App />);
    expect(screen.getByLabelText('Zoom in')).toBeInTheDocument();
    expect(screen.getByLabelText('Zoom out')).toBeInTheDocument();
  });
});
