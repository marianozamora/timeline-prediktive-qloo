import type { Meta, StoryObj } from '@storybook/react';
import { EditButton } from './EditButton';

const meta: Meta<typeof EditButton> = {
  title: 'Atoms/Button/EditButton',
  component: EditButton,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#374151' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
  decorators: [
    Story => (
      <div className="group p-4 bg-blue-600 rounded">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const AlwaysVisible: Story = {
  args: {},
  decorators: [
    Story => (
      <div className="p-4 bg-blue-600 rounded">
        <div style={{ opacity: 1 }}>
          <Story />
        </div>
      </div>
    ),
  ],
};
