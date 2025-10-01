import type { TimelineItem, ParsedTimelineEvent } from '../types/timeline';

type LaneType = 'development' | 'design' | 'testing' | 'deployment';

export const mockTimelineItems = [
  {
    id: 1,
    name: 'Project Planning',
    start: '2024-01-01',
    end: '2024-01-15',
    lane: 'development' as LaneType,
  },
  {
    id: 2,
    name: 'Design Phase',
    start: '2024-01-16',
    end: '2024-02-05',
    lane: 'design' as LaneType,
  },
  {
    id: 3,
    name: 'Development Sprint 1',
    start: '2024-02-06',
    end: '2024-02-20',
    lane: 'development' as LaneType,
  },
  {
    id: 4,
    name: 'Testing Phase',
    start: '2024-02-15',
    end: '2024-02-25',
    lane: 'testing' as LaneType,
  },
  {
    id: 5,
    name: 'Code Review',
    start: '2024-02-21',
    end: '2024-02-23',
    lane: 'development' as LaneType,
  },
  {
    id: 6,
    name: 'Bug Fixes',
    start: '2024-02-24',
    end: '2024-03-05',
    lane: 'development' as LaneType,
  },
  {
    id: 7,
    name: 'Deployment',
    start: '2024-02-26',
    end: '2024-02-28',
    lane: 'deployment' as LaneType,
  },
  {
    id: 8,
    name: 'Performance Optimization',
    start: '2024-03-01',
    end: '2024-03-15',
    lane: 'development' as LaneType,
  },
] satisfies TimelineItem[];

export const mockParsedEvents = [
  {
    id: 1,
    name: 'Project Planning',
    start: '2024-01-01',
    end: '2024-01-15',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-15'),
    lane: 'development' as LaneType,
  },
  {
    id: 2,
    name: 'Design Phase',
    start: '2024-01-16',
    end: '2024-02-05',
    startDate: new Date('2024-01-16'),
    endDate: new Date('2024-02-05'),
    lane: 'design' as LaneType,
  },
  {
    id: 3,
    name: 'Development Sprint 1',
    start: '2024-02-06',
    end: '2024-02-20',
    startDate: new Date('2024-02-06'),
    endDate: new Date('2024-02-20'),
    lane: 'development' as LaneType,
  },
] satisfies ParsedTimelineEvent[];

export const mockLanes = [
  { id: 'development' as LaneType, name: 'Development', color: '#3b82f6' },
  { id: 'design' as LaneType, name: 'Design', color: '#8b5cf6' },
  { id: 'testing' as LaneType, name: 'Testing', color: '#10b981' },
  { id: 'deployment' as LaneType, name: 'Deployment', color: '#f59e0b' },
] as const;

export const mockTimelineMarkers = [
  { date: '2024-01-01', position: 0, label: 'Jan 1' },
  { date: '2024-01-15', position: 20, label: 'Jan 15' },
  { date: '2024-02-01', position: 40, label: 'Feb 1' },
  { date: '2024-02-15', position: 60, label: 'Feb 15' },
  { date: '2024-03-01', position: 80, label: 'Mar 1' },
  { date: '2024-03-15', position: 100, label: 'Mar 15' },
];

export const mockEventStyles = {
  default: {
    left: '10%',
    width: '20%',
    top: '10px',
    height: '40px',
  },
  active: {
    left: '10%',
    width: '20%',
    top: '10px',
    height: '40px',
    zIndex: 10,
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  },
};
