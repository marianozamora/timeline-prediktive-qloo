import type { Meta, StoryObj } from '@storybook/react';
import { DateLabel } from './DateLabel';

const meta: Meta<typeof DateLabel> = {
  title: 'Atoms/Text/DateLabel',
  component: DateLabel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="relative w-96 h-20 bg-gray-50 border rounded">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    date: new Date('2024-01-15'),
    position: 25,
  },
};

export const StartPosition: Story = {
  args: {
    date: new Date('2024-01-01'),
    position: 0,
  },
};

export const EndPosition: Story = {
  args: {
    date: new Date('2024-12-31'),
    position: 100,
  },
};

export const MidYear: Story = {
  args: {
    date: new Date('2024-06-15'),
    position: 50,
  },
};
