import type { Meta, StoryObj } from '@storybook/react';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { ZoomButton } from './ZoomButton';

const meta: Meta<typeof ZoomButton> = {
  title: 'Atoms/Button/ZoomButton',
  component: ZoomButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ZoomInButton: Story = {
  args: {
    icon: ZoomIn,
    title: 'Zoom in',
    disabled: false,
  },
};

export const ZoomOutButton: Story = {
  args: {
    icon: ZoomOut,
    title: 'Zoom out',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    icon: ZoomIn,
    title: 'Zoom in (disabled)',
    disabled: true,
  },
};
