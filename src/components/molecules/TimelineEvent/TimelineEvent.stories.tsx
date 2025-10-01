import type { Meta, StoryObj } from '@storybook/react';
import { TimelineEvent } from './TimelineEvent';

const meta: Meta<typeof TimelineEvent> = {
  title: 'Molecules/TimelineEvent',
  component: TimelineEvent,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onStartEdit: { action: 'start edit' },
    onEditChange: { action: 'edit change' },
    onEditSave: { action: 'edit save' },
    onEditCancel: { action: 'edit cancel' },
    onDragStart: { action: 'drag start' },
    onDrag: { action: 'drag' },
    onDragEnd: { action: 'drag end' },
  },
  decorators: [
    Story => (
      <div
        style={{
          height: '60px',
          position: 'relative',
          backgroundColor: '#f3f4f6',
          padding: '10px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockEvent = {
  id: 1,
  name: 'Project Kickoff',
  start: '2024-01-15',
  end: '2024-01-17',
  lane: 'development' as const,
  startDate: new Date('2024-01-15'),
  endDate: new Date('2024-01-17'),
};

export const Default: Story = {
  args: {
    event: mockEvent,
    style: { left: '10%', width: '15%' },
    laneHeight: 40,
    isEditing: false,
    editingName: '',
    isDragging: false,
  },
};

export const LongEvent: Story = {
  args: {
    event: {
      ...mockEvent,
      name: 'Very Long Project Name That Might Need Truncation',
    },
    style: { left: '20%', width: '40%' },
    laneHeight: 40,
    isEditing: false,
    editingName: '',
    isDragging: false,
  },
};

export const ShortEvent: Story = {
  args: {
    event: {
      ...mockEvent,
      name: 'Sprint',
    },
    style: { left: '5%', width: '8%' },
    laneHeight: 40,
    isEditing: false,
    editingName: '',
    isDragging: false,
  },
};

export const EditingEvent: Story = {
  args: {
    event: {
      ...mockEvent,
      name: 'Critical Deadline',
    },
    style: { left: '30%', width: '25%' },
    laneHeight: 40,
    isEditing: true,
    editingName: 'Critical Deadline',
    isDragging: false,
  },
};
