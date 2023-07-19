import { useLayoutEffect, useState } from 'react';
import { getBoxMeasurements, type BoxMeasurements } from './dtesch-path-line.utils';

type UsePathLineMeasurementsParams = {
  startPointId: string;
  endPointId: string;
};

export const usePathLineMeasurements = ({ startPointId, endPointId }: UsePathLineMeasurementsParams) => {
  const [boxMeasurements, setBoxMeasurements] = useState<BoxMeasurements>({
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
    width: 0,
    height: 0,
    pathPoints: [{ x: 0, y: 0 }],
    containerProps: { top: 0, left: 0, width: 0, height: 0 },
  });

  useLayoutEffect(() => {
    function updatePoints() {
      setBoxMeasurements(getBoxMeasurements(startPointId, endPointId));
    }

    updatePoints();

    window.addEventListener('resize', updatePoints);

    return () => window.removeEventListener('resize', updatePoints);
  }, [endPointId, startPointId]);

  return boxMeasurements;
};
