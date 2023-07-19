export const LOOSE_OFFSET = 10;

type Coord = { x: number; y: number };

export type LineCoords = { start: Coord; end: Coord };

export type ElementCoords = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type LineDirection = 'right-bottom' | 'right-top' | 'left-bottom' | 'left-top' | 'straight';

export type GetContainerParams = {
  lineCoords: LineCoords;
  width: number;
  height: number;
};

function getElementCoords(id: string): ElementCoords {
  try {
    const startElement = document.getElementById(id);

    if (!startElement) throw new Error('Element not found');

    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    const { left: x, bottom: y, width, height } = startElement.getBoundingClientRect();

    return { x: x + scrollX, y: y + scrollY, width, height };
  } catch (error) {
    console.log(error);
    return { x: 0, y: 0, width: 0, height: 0 };
  }
}

function getLineStartingPoint(coords: ElementCoords, direction: LineDirection) {
  const { x, y, width, height } = coords;

  const isToLeft = direction.includes('left');

  const elementHalfHeight = height / 2;

  const yCenter = y - elementHalfHeight;
  const xCenter = isToLeft ? x : x + width;

  return {
    x: xCenter,
    y: yCenter,
  };
}

function getLineEndingPoint(coords: ElementCoords, direction: LineDirection) {
  const { x, y, width, height } = coords;

  const isToLeft = direction.includes('left');

  const elementHalfHeight = height / 2;

  const yCenter = y - elementHalfHeight;
  const xCenter = isToLeft ? x + width : x;

  return {
    x: xCenter,
    y: yCenter,
  };
}

function getLineStartEndCoords(startPointId: string, endPointId: string): LineCoords {
  const [startElement, endElement] = [getElementCoords(startPointId), getElementCoords(endPointId)];

  const direction = getLineDirection({ start: startElement, end: endElement });

  const start = getLineStartingPoint(startElement, direction);
  const end = getLineEndingPoint(endElement, direction);

  return { start, end };
}

function getLineDirection(lineCoords: LineCoords): LineDirection {
  const { start, end } = lineCoords;

  switch (true) {
    case start.x < end.x && start.y < end.y:
      return 'right-bottom';

    case start.x < end.x && start.y > end.y:
      return 'right-top';

    case start.x > end.x && start.y < end.y:
      return 'left-bottom';

    case start.x > end.x && start.y > end.y:
      return 'left-top';

    default:
      return 'straight';
  }
}

function diff(a: number, b: number) {
  return Math.abs(a - b);
}

function getPathPoints(lineCoords: LineCoords) {
  const { start, end } = lineCoords;

  const direction = getLineDirection(lineCoords);

  const boxWidth = diff(end.x, start.x);
  const boxHeight = diff(end.y, start.y);

  const boxWidthHalf = boxWidth / 2;
  const yStartWithOffsetHalf = LOOSE_OFFSET / 2;
  const boxHeightWithOffset = boxHeight + yStartWithOffsetHalf;

  const pathPoints: { [key in LineDirection]: Array<{ x: number; y: number }> } = {
    'right-bottom': [
      { x: 0, y: yStartWithOffsetHalf },
      { x: boxWidthHalf, y: yStartWithOffsetHalf },
      { x: boxWidthHalf, y: boxHeightWithOffset },
      { x: boxWidth, y: boxHeightWithOffset },
    ],
    'right-top': [
      { x: 0, y: boxHeightWithOffset },
      { x: boxWidthHalf, y: boxHeightWithOffset },
      { x: boxWidthHalf, y: yStartWithOffsetHalf },
      { x: boxWidth, y: yStartWithOffsetHalf },
    ],
    'left-bottom': [
      { x: boxWidth, y: yStartWithOffsetHalf },
      { x: boxWidthHalf, y: yStartWithOffsetHalf },
      { x: boxWidthHalf, y: boxHeightWithOffset },
      { x: 0, y: boxHeightWithOffset },
    ],
    'left-top': [
      { x: boxWidth, y: boxHeightWithOffset },
      { x: boxWidthHalf, y: boxHeightWithOffset },
      { x: boxWidthHalf, y: yStartWithOffsetHalf },
      { x: 0, y: yStartWithOffsetHalf },
    ],
    straight: [
      { x: 0, y: yStartWithOffsetHalf },
      { x: boxWidth, y: yStartWithOffsetHalf },
    ],
  };

  return pathPoints[direction];
}

function getContainerProps(params: GetContainerParams) {
  const { start, end } = params.lineCoords;
  const { width, height } = params;
  const yDirection = getLineDirection(params.lineCoords);

  const heightWithOffset = height + LOOSE_OFFSET;

  const props: { [key in LineDirection]: { top: number; left: number; width: number; height: number } } = {
    'left-bottom': {
      top: start.y - LOOSE_OFFSET / 2,
      left: end.x,
      width,
      height: heightWithOffset,
    },
    'left-top': {
      top: end.y - LOOSE_OFFSET / 2,
      left: end.x,
      width,
      height: heightWithOffset,
    },
    'right-bottom': {
      top: start.y - LOOSE_OFFSET / 2,
      left: start.x,
      width,
      height: heightWithOffset,
    },
    'right-top': {
      top: end.y - LOOSE_OFFSET / 2,
      left: start.x,
      width,
      height: heightWithOffset,
    },
    straight: {
      top: start.y - LOOSE_OFFSET / 2,
      left: start.x,
      width,
      height: heightWithOffset,
    },
  };

  return props[yDirection];
}

export function getBoxMeasurements(startPointId: string, endPointId: string) {
  const { start, end } = getLineStartEndCoords(startPointId, endPointId);
  const pathPoints = getPathPoints({ start, end });

  const [width, height] = [diff(end.x, start.x), diff(end.y, start.y)];

  const containerProps = getContainerProps({ lineCoords: { start, end }, width, height });

  return {
    start,
    end,
    width,
    height,
    pathPoints,
    containerProps,
  };
}

export type BoxMeasurements = ReturnType<typeof getBoxMeasurements>;
