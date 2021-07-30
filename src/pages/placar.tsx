// chakra
import { Box, Flex, Heading } from '@chakra-ui/react';
// componentes
import Popover from '../components/Popover/Popover';

const Placar = () => {
  return (
    <Flex
      w={{ lg: '1300px', md: '100%', sm: '100%' }}
      maxW="100%"
      minH="60vh"
      alignItems="center"
      flexDirection="column"
      py={{ md: '20px', sm: '10px' }}
      m="0 auto"
    >
      <Flex justifyContent="space-between" align="center" w="100%">
        <Flex alignItems="center" w="60%">
          <Heading fontWeight="bold" fontSize={{ md: '32px', sm: '20px' }}>
            Placar
          </Heading>
          <Popover title={`O que é o Placar?`}>
            Aqui é possível gerenciar o placar das partidas, adicionando jogadores e marcando a quantidade de partidas
            jogadas, conforme os jogadores vão ganhando partidas o quadro é atualizado para informar a colocação deles.
            <br /> Pode ser utilizado para pequenos campeonatos.
          </Popover>
        </Flex>
        <Flex alignItems="center" justifyContent="flex-end" w="40%">
          btns
        </Flex>
      </Flex>
      <Flex mt={{ md: '40px', sm: '10px' }} w="100%">
        <Box overflowX="auto" w="100%">
          table
        </Box>
      </Flex>
    </Flex>
  );
};

export default Placar;
