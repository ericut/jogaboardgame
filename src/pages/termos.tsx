import { Flex, Heading, Text, Box } from '@chakra-ui/react';

const TermosDeUso = () => {
  return (
    <Flex
      w={{ lg: '1300px', md: '100%', sm: '100%' }}
      maxW="100%"
      minH="60vh"
      flexDirection="column"
      py={{ md: '20px', sm: '10px' }}
      m="0 auto"
      textAlign="left"
    >
      <Flex justifyContent="space-between" align="center" w="100%">
        <Flex alignItems="center" w="60%">
          <Heading fontWeight="bold" fontSize={{ md: '32px', sm: '20px' }}>
            Termos de Uso
          </Heading>
        </Flex>
      </Flex>
      <Flex mt={{ md: '40px', sm: '10px' }} w="100%" flexDirection="column">
        <Heading size="md" fontWeight="bold" mb="20px">
          Joga BG {'<3'}
        </Heading>
        <Box mb="10px">
          <Text>A utilização deste site é gratuíta e livre de licença.</Text>
        </Box>
        <Box mb="10px">
          <Flex>
            <Text>
              O Joga BG utiliza "localStorage" do navegador para armazenar todos os dados cadastrados nas aplicações.
            </Text>
          </Flex>
          <Flex mb="10px">
            <Text fontWeight="bold" color="red.500" mr="5px">
              Atenção:
            </Text>
            Estes dados podem ser perdidos caso o usuário limpe o cache ou o armazenamento local do navegador.
          </Flex>
          <Box mb="10px">
            <Text fontWeight="bold" mr="5px">
              Chaves de armazenamento no navegador:
            </Text>
            <Flex>
              <Text color="blue.200" mr="5px">
                configuracoesDesafio
              </Text>
              Armazena a configuração de quantidade de jogos e partidas para aplicar o desafio customizado na página do
              Desafio 10x10.
            </Flex>
            <Flex>
              <Text color="blue.200" mr="5px">
                listagemJogos
              </Text>
              Armazena a listagem completa dos jogos cadastrados no Desafio 10x10.
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default TermosDeUso;
