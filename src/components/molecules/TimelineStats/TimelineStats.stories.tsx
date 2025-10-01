import type { Meta, StoryObj } from '@storybook/react';
import { TimelineStats } from './TimelineStats';

const meta: Meta<typeof TimelineStats> = {
  title: 'Molecules/TimelineStats',
  component: TimelineStats,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    eventCount: 8,
    laneCount: 3,
  },
};

export const HighEfficiency: Story = {
  args: {
    eventCount: 15,
    laneCount: 3,
  },
};

export const LowEfficiency: Story = {
  args: {
    eventCount: 10,
    laneCount: 8,
  },
};

export const SingleLane: Story = {
  args: {
    eventCount: 5,
    laneCount: 1,
  },
};
