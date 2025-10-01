import type { Meta, StoryObj } from '@storybook/react';
import { TimelineMarker } from './TimelineMarker';

const meta: Meta<typeof TimelineMarker> = {
  title: 'Molecules/TimelineMarker',
  component: TimelineMarker,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div
        style={{
          height: '100px',
          position: 'relative',
          border: '1px solid #ccc',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    markers: [
      { date: new Date('2024-01-15'), position: 25 },
      { date: new Date('2024-06-15'), position: 50 },
      { date: new Date('2024-12-15'), position: 85 },
    ],
  },
};

export const StartOfTimeline: Story = {
  args: {
    markers: [
      { date: new Date('2024-01-01'), position: 0 },
      { date: new Date('2024-03-01'), position: 25 },
      { date: new Date('2024-06-01'), position: 50 },
    ],
  },
};

export const EndOfTimeline: Story = {
  args: {
    markers: [
      { date: new Date('2024-06-30'), position: 50 },
      { date: new Date('2024-09-30'), position: 75 },
      { date: new Date('2024-12-31'), position: 100 },
    ],
  },
};

export const SingleMarker: Story = {
  args: {
    markers: [{ date: new Date('2024-06-15'), position: 50 }],
  },
};
