import type { Meta, StoryObj } from '@storybook/react';
import { Timeline } from './Timeline';

const meta: Meta<typeof Timeline> = {
  title: 'Pages/Timeline',
  component: Timeline,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCustomTitle: Story = {
  args: {},
  decorators: [
    Story => (
      <div>
        <h1 style={{ padding: '1rem', margin: 0, backgroundColor: '#f3f4f6' }}>
          Custom Project Timeline
        </h1>
        <Story />
      </div>
    ),
  ],
};
