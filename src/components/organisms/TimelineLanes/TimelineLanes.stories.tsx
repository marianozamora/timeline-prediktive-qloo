import type { Meta, StoryObj } from '@storybook/react';
import { TimelineLanes } from './TimelineLanes';

const meta: Meta<typeof TimelineLanes> = {
  title: 'Organisms/TimelineLanes',
  component: TimelineLanes,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Complex timeline lanes component - see Timeline page for full implementation',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Documentation: Story = {
  render: () => (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">TimelineLanes Component</h2>
      <p className="text-gray-600 mb-4">
        This is a complex organism component that manages event lanes and
        drag/drop functionality.
      </p>
      <p className="text-gray-600">
        For a complete example, see the Timeline page story which shows the full
        implementation.
      </p>
    </div>
  ),
};
