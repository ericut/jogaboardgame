import { useState, useEffect, useContext, useMemo } from 'react';
// chakra
import { Text, Box, Flex, Heading, Button, HStack, IconButton } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
// componentes
import { Table, THeader, THead, THeadButtons, TBody, TRow, TColumn, TColumnButtons } from '../components/Table/Table';
import Popover from '../components/Popover/Popover';
// icones
import { FaPlus, FaHistory, FaTrophy, FaEdit, FaCircle } from 'react-icons/fa';
// utilitários
import { formatarData } from '../utils/formatarData';
// interfaces
import { IPlacaresProps } from '../interfaces/placar';
// context
import { ListagemPlacaresProvider, ListagemPlacaresContext } from '../context/placar/ListagemPlacaresContext';
import { EdicaoPlacarProvider, EdicaoPlacarContext } from '../context/placar/EdicaoPlacarContext';

const Placar = () => {
  const { listagemPlacaresData } = useContext(ListagemPlacaresContext);
  const { handleAbrirEdicaoPlacar } = useContext(EdicaoPlacarContext);
  const [placarAtivo, setPlacarAtivo] = useState<IPlacaresProps | undefined>(undefined);

  useEffect(() => {
    setPlacarAtivo(
      listagemPlacaresData.find((item) => {
        return item.status === 'Ativo';
      })
    );
    console.log('listinha', listagemPlacaresData);
  }, [listagemPlacaresData]);

  const PlacarAtivo = useMemo(() => {
    return <Flex w="100%">{placarAtivo?.nome}</Flex>;
  }, [placarAtivo]);

  const PlacarHistorico = useMemo(() => {
    return listagemPlacaresData.length !== 0 ? (
      listagemPlacaresData
        .sort((a, b) => {
          if (a.status > b.status) {
            return 1;
          } else if (a.status < b.status) {
            return -1;
          } else {
            return 0;
          }
        })
        .map((item) => {
          return (
            <TRow key={item.id} alignItems="center">
              <TColumn w="25%">{item.nome}</TColumn>
              <TColumn w="15%">
                {item.jogos
                  .map((jogos) => {
                    return jogos;
                  })
                  .join(', ')}
              </TColumn>
              <TColumn w="15%">
                {item.jogadores
                  .map((jogadores) => {
                    return jogadores;
                  })
                  .join(', ')}
              </TColumn>
              <TColumn w="10%">{item.partidas}</TColumn>
              <TColumn w="10%">{formatarData(item.data_inicio)}</TColumn>
              <TColumn w="10%">{item.data_fim ? formatarData(item.data_fim) : '-'}</TColumn>
              <TColumn w="10%" alignItems="center">
                <Text fontSize="12px" mr="5px" color={item.status === 'Ativo' ? 'green.500' : 'orange.500'}>
                  <FaCircle />
                </Text>
                {item.status}
              </TColumn>
              <TColumnButtons w="5%">
                <HStack
                  pt={{ md: '0px', sm: '5px' }}
                  spacing="20px"
                  justifyContent={{ md: 'center', sm: 'space-between' }}
                  w="100%"
                >
                  <IconButton
                    size="sm"
                    colorScheme="blue"
                    variant="ghost"
                    aria-label="Editar Jogo"
                    icon={<FaEdit />}
                    onClick={() => handleAbrirEdicaoPlacar(item)}
                  />
                </HStack>
              </TColumnButtons>
            </TRow>
          );
        })
    ) : (
      <TRow>
        <TColumn w="100%" color="gray.400" fontSize="12px">
          Nenhum placar encontrado. Clique no botão "Criar Placar" para cadastrar!
        </TColumn>
      </TRow>
    );
  }, [listagemPlacaresData]);

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
          <Button
            display={{ md: 'flex', sm: 'none' }}
            leftIcon={<FaPlus />}
            colorScheme="blue"
            size="sm"
            onClick={() => handleAbrirEdicaoPlacar()}
          >
            Criar Placar
          </Button>
        </Flex>
      </Flex>
      <Flex mt={{ md: '40px', sm: '10px' }} w="100%">
        <Tabs w="100%" variant="enclosed-colored">
          <TabList justifyContent="space-between">
            <Tab>
              <Text mr="5px" color="yellow.500">
                <FaTrophy />
              </Text>
              Placar Ativo
            </Tab>
            <Tab>
              <Text mr="5px" color="green.500">
                <FaHistory />
              </Text>
              Histórico de Placares
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>{PlacarAtivo}</TabPanel>
            <TabPanel>
              <Box overflowX="auto" w="100%">
                <Table>
                  <THeader display={{ md: 'flex', sm: 'none' }}>
                    <THead w="25%">Nome</THead>
                    <THead w="15%">Jogos</THead>
                    <THead w="15%">Jogadores</THead>
                    <THead w="10%">Partidas</THead>
                    <THead w="10%">Data Início</THead>
                    <THead w="10%">Data Fim</THead>
                    <THead w="10%">Status</THead>
                    <THeadButtons w="5%">Ações</THeadButtons>
                  </THeader>
                  <TBody>{PlacarHistorico}</TBody>
                </Table>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};

const PlacarProvider = () => {
  return (
    <ListagemPlacaresProvider>
      <EdicaoPlacarProvider>
        <Placar />
      </EdicaoPlacarProvider>
    </ListagemPlacaresProvider>
  );
};

export default PlacarProvider;
