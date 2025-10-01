import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  'data-testid'?: string;
}

const Input = ({
  placeholder,
  value,
  onChange,
  disabled,
  ...props
}: InputProps) => (
  <input
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    disabled={disabled}
    {...props}
  />
);

describe('Input', () => {
  it('renders with placeholder text', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('displays the correct value', () => {
    render(<Input value="test value" onChange={() => {}} />);
    expect(screen.getByDisplayValue('test value')).toBeInTheDocument();
  });

  it('calls onChange when user types', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Input onChange={handleChange} />);
    const input = screen.getByRole('textbox');

    await user.type(input, 'hello');
    expect(handleChange).toHaveBeenCalled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('focuses when clicked', async () => {
    const user = userEvent.setup();
    render(<Input />);
    const input = screen.getByRole('textbox');

    await user.click(input);
    expect(input).toHaveFocus();
  });

  it('matches snapshot', () => {
    const { container } = render(<Input placeholder="Test input" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
