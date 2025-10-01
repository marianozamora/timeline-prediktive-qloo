import type { Meta, StoryObj } from '@storybook/react';
import { ZoomControls } from './ZoomControls';

const meta: Meta<typeof ZoomControls> = {
  title: 'Molecules/ZoomControls',
  component: ZoomControls,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onZoomIn: { action: 'zoom in' },
    onZoomOut: { action: 'zoom out' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCustomHandlers: Story = {
  args: {
    onZoomIn: () => console.log('Zooming in...'),
    onZoomOut: () => console.log('Zooming out...'),
  },
};
