import type { Meta, StoryObj } from '@storybook/react';
import { TimelineHeader } from './TimelineHeader';

const meta: Meta<typeof TimelineHeader> = {
  title: 'Molecules/TimelineHeader',
  component: TimelineHeader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    minDate: new Date('2024-01-01'),
    maxDate: new Date('2024-12-31'),
    totalDays: 365,
    eventCount: 8,
  },
};

export const FewEvents: Story = {
  args: {
    minDate: new Date('2024-01-15'),
    maxDate: new Date('2024-02-28'),
    totalDays: 44,
    eventCount: 3,
  },
};

export const ManyEvents: Story = {
  args: {
    minDate: new Date('2024-01-01'),
    maxDate: new Date('2025-12-31'),
    totalDays: 730,
    eventCount: 25,
  },
};
