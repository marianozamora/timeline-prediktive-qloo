import type { Meta, StoryObj } from '@storybook/react';
import { InlineInput } from './InlineInput';

const meta: Meta<typeof InlineInput> = {
  title: 'Atoms/Input/InlineInput',
  component: InlineInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
    onBlur: { action: 'blurred' },
    onKeyDown: { action: 'key pressed' },
    autoFocus: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'Edit this text',
    autoFocus: true,
  },
};

export const LongText: Story = {
  args: {
    value:
      'This is a very long event name that should demonstrate truncation behavior',
    autoFocus: false,
  },
};

export const Empty: Story = {
  args: {
    value: '',
    autoFocus: true,
  },
};
