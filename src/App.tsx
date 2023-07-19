import { Box, Flex, VStack } from '@chakra-ui/react';
import { DTeschPathLine } from './components/dtesch-line-path';

const BoxesSameYAxis = () => {
  const startId = 'same-y-axis-box-one';
  const endId = 'same-y-axis-box-two';

  return (
    <Flex w="full" h="100px" justify="space-between">
      <Box id={startId} boxSize="10" bg="cyan.600" />

      <DTeschPathLine startPointId={startId} endPointId={endId} color="purple" />

      <Box id={endId} boxSize="10" bg="cyan.600" />
    </Flex>
  );
};

const BoxesDifferentYAxis = () => {
  const startId = 'different-y-axis-box-one';
  const endId = 'different-y-axis-box-two';

  return (
    <Flex w="full" h="300px" justify="space-between">
      <Box id={startId} boxSize="10" bg="cyan.600" alignSelf="self-end" />

      <DTeschPathLine startPointId={startId} endPointId={endId} color="purple" />

      <Box id={endId} boxSize="10" bg="cyan.600" alignSelf="self-start" />
    </Flex>
  );
};

const BoxesDifferentYAxisReverse = () => {
  const startId = 'different-y-axis-box-one-reverse';
  const endId = 'different-y-axis-box-two-reverse';

  return (
    <Flex w="full" h="300px" justify="space-between">
      <Box id={startId} boxSize="10" bg="cyan.600" alignSelf="self-start" />

      <DTeschPathLine startPointId={startId} endPointId={endId} color="purple" />

      <Box id={endId} boxSize="10" bg="cyan.600" alignSelf="self-end" />
    </Flex>
  );
};

export const App = () => {
  return (
    <Flex as="main" direction="column" w="full" minH="100vh" p="4" justify="center" align="center">
      <VStack spacing="14" w="400px">
        <BoxesSameYAxis />

        <BoxesDifferentYAxis />

        <BoxesDifferentYAxisReverse />
      </VStack>
    </Flex>
  );
};
