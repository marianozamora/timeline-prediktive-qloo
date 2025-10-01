import type { ParsedTimelineEvent, Lane } from '../types/timeline';

export const getMinWidthForText = (text: string): number => {
  const characterWidth = 8;
  const padding = 24;
  const minWidth = 80;

  return Math.max(minWidth, text.length * characterWidth + padding);
};

export const getEventPixelWidth = (
  event: ParsedTimelineEvent,
  totalDays: number,
  containerWidth: number
): number => {
  const startTime = event.startDate.getTime();
  const endTime = event.endDate.getTime();
  const durationMs = endTime - startTime;
  const durationDays = Math.ceil(durationMs / (1000 * 60 * 60 * 24)) + 1;

  return (durationDays / totalDays) * containerWidth;
};

export const assignEventsToLanes = (
  parsedEvents: ParsedTimelineEvent[],
  totalDays: number
): Lane[] => {
  const sorted = [...parsedEvents].sort((a, b) => {
    const startDiff = a.startDate.getTime() - b.startDate.getTime();
    if (startDiff !== 0) return startDiff;

    const aDuration = a.endDate.getTime() - a.startDate.getTime();
    const bDuration = b.endDate.getTime() - b.startDate.getTime();
    return bDuration - aDuration;
  });

  const lanes: Lane[] = [];
  const containerWidth = 1000;

  for (const event of sorted) {
    const eventStart = event.startDate.getTime();
    const eventEnd = event.endDate.getTime();

    const eventPixelWidth = getEventPixelWidth(
      event,
      totalDays,
      containerWidth
    );
    const minRequiredWidth = getMinWidthForText(event.name);
    const needsExtraSpace = eventPixelWidth < minRequiredWidth;

    const bufferDays = needsExtraSpace ? 2 : 1;
    const bufferMs = bufferDays * 24 * 60 * 60 * 1000;

    let placed = false;
    for (const lane of lanes) {
      const canFit = lane.every(existingEvent => {
        const existingStart = existingEvent.startDate.getTime();
        const existingEnd = existingEvent.endDate.getTime();

        return (
          eventStart > existingEnd + bufferMs ||
          eventEnd + bufferMs < existingStart
        );
      });

      if (canFit) {
        lane.push(event);
        placed = true;
        break;
      }
    }

    if (!placed) {
      lanes.push([event]);
    }
  }

  return lanes;
};
