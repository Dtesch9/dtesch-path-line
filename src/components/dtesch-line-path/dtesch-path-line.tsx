import { Flex } from '@chakra-ui/react';
import { PathLine } from '../path-line';
import { usePathLineMeasurements } from './dtesch-path-line.hooks';

type DTeschPathLineProps = {
  startPointId: string;
  endPointId: string;
  color?: string;
};

export const DTeschPathLine = ({ startPointId, endPointId, color = 'red' }: DTeschPathLineProps) => {
  const boxMeasurements = usePathLineMeasurements({ startPointId, endPointId });

  return (
    <Flex
      pos="absolute"
      top={boxMeasurements.containerProps.top}
      left={boxMeasurements.containerProps.left}
      w={`${boxMeasurements.containerProps.width}px`}
      h={`${boxMeasurements.containerProps.height}px`}
    >
      <svg width={`${boxMeasurements.containerProps.width}px`} height={`${boxMeasurements.containerProps.height}px`}>
        <PathLine points={boxMeasurements.pathPoints} stroke={color} strokeWidth="2" fill="none" r={10} />
      </svg>
    </Flex>
  );
};
