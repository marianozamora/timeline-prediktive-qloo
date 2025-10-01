import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

interface TextProps {
  children: React.ReactNode;
  variant?: string;
  size?: string;
  className?: string;
  'data-testid'?: string;
}

const Text = ({
  children,
  variant = 'body',
  size = 'medium',
  className,
  ...props
}: TextProps) => (
  <span
    className={`text-${variant} text-${size} ${className || ''}`}
    {...props}
  >
    {children}
  </span>
);

describe('Text', () => {
  it('renders text content', () => {
    render(<Text>Hello World</Text>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    render(<Text variant="heading">Heading Text</Text>);
    const text = screen.getByText('Heading Text');
    expect(text).toHaveClass('text-heading');
  });

  it('applies size classes correctly', () => {
    render(<Text size="large">Large Text</Text>);
    const text = screen.getByText('Large Text');
    expect(text).toHaveClass('text-large');
  });

  it('applies custom className', () => {
    render(<Text className="custom-class">Custom Text</Text>);
    const text = screen.getByText('Custom Text');
    expect(text).toHaveClass('custom-class');
  });

  it('renders with default props', () => {
    render(<Text>Default Text</Text>);
    const text = screen.getByText('Default Text');
    expect(text).toHaveClass('text-body', 'text-medium');
  });

  it('passes through additional props', () => {
    render(<Text data-testid="text-element">Test</Text>);
    expect(screen.getByTestId('text-element')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(
      <Text variant="heading" size="large">
        Snapshot Text
      </Text>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
