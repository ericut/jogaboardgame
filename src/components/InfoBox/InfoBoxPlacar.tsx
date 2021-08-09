import { ReactNode } from 'react';
// chakra
import { Text, Flex, useColorModeValue } from '@chakra-ui/react';

interface IBoxTextProps {
  label: string;
  children: ReactNode;
}

const InfoBoxPlacar = ({ label, children }: IBoxTextProps) => {
  const BorderColor = useColorModeValue('gray.200', 'gray.700');
  const BgColor = useColorModeValue('gray.100', 'gray.900');
  const TitleTextColor = useColorModeValue('gray.400', 'gray.500');

  return (
    <Flex
      w={{ md: '100%', sm: '100%' }}
      flexDirection="column"
      border="1px solid"
      borderColor={BorderColor}
      bg={BgColor}
      p="10px"
      minH="63px"
    >
      <Text fontSize="11px" color={TitleTextColor}>
        {label}
      </Text>
      <Flex>{children}</Flex>
    </Flex>
  );
};

export default InfoBoxPlacar;
