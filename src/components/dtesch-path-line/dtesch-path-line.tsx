import type { FlexProps } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';

import { PathLine } from '../path-line';
import { usePathLineMeasurements } from './dtesch-path-line.hooks';
import { CONTAINER_ID } from './dtesch-path-line.utils';

type DTeschPathLineProps = {
  startPointId: string;
  endPointId: string;
  color?: string;
};

export const DTeschPathLine = ({ color = 'red', endPointId, startPointId }: DTeschPathLineProps) => {
  const boxMeasurements = usePathLineMeasurements({ startPointId, endPointId });

  return (
    <Flex
      pos="absolute"
      top={`${boxMeasurements.containerProps.top}px`}
      left={`${boxMeasurements.containerProps.left}px`}
      w={`${boxMeasurements.containerProps.width}px`}
      h={`${boxMeasurements.containerProps.height}px`}
    >
      <svg width={`${boxMeasurements.containerProps.width}px`} height={`${boxMeasurements.containerProps.height}px`}>
        <PathLine points={boxMeasurements.pathPoints} stroke={color} strokeWidth="2" fill="none" r={10} />
      </svg>
    </Flex>
  );
};

export const DTeschPathLineWrapper = (props: FlexProps) => {
  return <Flex {...props} pos="relative" id={CONTAINER_ID} />;
};
