import { useContext, useMemo, useEffect } from 'react';
// chakra
import { Text, Box, Flex, Heading, Button, HStack, IconButton, Grid, GridItem, Badge } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
// componentes
import {
  Table,
  THeader,
  TFooter,
  THead,
  THeadButtons,
  TBody,
  TRow,
  TColumn,
  TColumnButtons,
} from '../components/Table/Table';
import Popover from '../components/Popover/Popover';
import OrdenadorTabela from '../components/Ordenador/Ordenador';
import InfoBoxPlacar from '../components/InfoBox/InfoBoxPlacar';
// icones
import { FaPlus, FaHistory, FaTrophy, FaEdit, FaCircle } from 'react-icons/fa';
// utilitários
import { formatarData } from '../utils/formatarData';
// context
import { ListagemPlacaresProvider, ListagemPlacaresContext } from '../context/placar/ListagemPlacaresContext';
import { ControlePlacarAtivoProvider, ControlePlacarAtivoContext } from '../context/placar/ControlePlacarAtivoContext';
import { EdicaoPlacarProvider, EdicaoPlacarContext } from '../context/placar/EdicaoPlacarContext';
import { OrdenadorTabelaProvider, OrdenadorTabelaContext } from '../context/OrdenadorTabelaContext';

const Placar = () => {
  const { listagemPlacaresData } = useContext(ListagemPlacaresContext);
  const { placarAtivo, listagemPartidasPlacaresData, listagemPartidasPlacarAtivoData, listagemJogadoresClassificao } =
    useContext(ControlePlacarAtivoContext);
  const { handleAbrirEdicaoPlacar } = useContext(EdicaoPlacarContext);
  const { ordenacaoTabela, ordenarPeloValor, ordenarCrescente } = useContext(OrdenadorTabelaContext);

  const listagemOrdenacao = [
    { tipo: 'nome', label: 'Nome do Placar' },
    { tipo: 'jogo', label: 'Nome do Jogo' },
    { tipo: 'jogadores', label: 'Jogadores' },
    { tipo: 'partidas', label: 'Número de Partidas' },
    { tipo: 'data_inicio', label: 'Data de Início' },
    { tipo: 'data_fim', label: 'Data da Finalização' },
  ];

  const PlacarAtivo = useMemo(() => {
    return placarAtivo ? (
      <Box w="100%">
        <Grid
          templateColumns={{ md: 'repeat(5, 1fr)', sm: '1fr' }}
          templateRows={{ md: 'repeat(2, 1fr)', sm: 'repeat(6, 1fr)' }}
          gap="20px"
          rowGap="10px"
          w="100%"
        >
          <GridItem colSpan={{ md: 2, sm: 0 }}>
            <InfoBoxPlacar label="Jogo">{placarAtivo.jogo}</InfoBoxPlacar>
          </GridItem>
          <GridItem>
            <InfoBoxPlacar label="Data do Placar">{formatarData(placarAtivo.data_inicio)}</InfoBoxPlacar>
          </GridItem>
          <GridItem>
            <InfoBoxPlacar label="Partidas Realizadas">{placarAtivo.partidas}</InfoBoxPlacar>
          </GridItem>
          <GridItem>
            <InfoBoxPlacar label="Status">
              <Flex alignItems="center">
                <Text fontSize="12px" mr="5px" color={placarAtivo.status === 'Ativo' ? 'green.500' : 'orange.500'}>
                  <FaCircle />
                </Text>
                {placarAtivo.status}
              </Flex>
            </InfoBoxPlacar>
          </GridItem>
          <GridItem colSpan={{ md: 3, sm: 0 }}>
            <InfoBoxPlacar label="Jogadores">
              <HStack mt="3px">
                {placarAtivo.jogadores
                  ? placarAtivo.jogadores.map((jogador, index) => {
                      return (
                        <Badge key={index} fontSize="13px">
                          {jogador}
                        </Badge>
                      );
                    })
                  : ''}
              </HStack>
            </InfoBoxPlacar>
          </GridItem>
          <GridItem colSpan={{ md: 2, sm: 0 }}>
            <Button variant="outline" colorScheme="blue" w="100%" h="100%">
              Adicionar Partida
            </Button>
          </GridItem>
        </Grid>
      </Box>
    ) : (
      <Flex w="100%" color="gray.400" fontSize="12px" p="10px">
        Nenhum placar ativo. Clique no botão "Criar Placar" para cadastrar um!
      </Flex>
    );
  }, [placarAtivo]);

  const PartidasPlacarAtivo = useMemo(() => {
    function listagemPlacarAtivo() {
      return listagemPartidasPlacarAtivoData.length !== 0 ? (
        listagemPartidasPlacarAtivoData
          .map((item, index) => {
            return (
              <TRow key={item.id_partida} alignItems="center" pt="0px !important">
                <Table>
                  <THeader display={{ md: 'flex', sm: 'none' }}>
                    <THead w="25%" fontWeight="bold">
                      {placarAtivo?.jogo} - Partida #{index + 1}
                    </THead>
                  </THeader>
                  <TBody>
                    {item.jogadores.map((subItem, index) => {
                      return (
                        <TRow key={index} alignItems="center">
                          <TColumn w="40%">{subItem.nome}</TColumn>
                          <TColumn w="20%" justifyContent="center">
                            {subItem.derrotas}
                          </TColumn>
                          <TColumn w="20%" justifyContent="center">
                            {subItem.vitorias}
                          </TColumn>
                          <TColumn w="20%" justifyContent="center">
                            {subItem.pontuacao}
                          </TColumn>
                        </TRow>
                      );
                    })}
                  </TBody>
                </Table>
              </TRow>
            );
          })
          .sort()
          .reverse()
      ) : (
        <TRow>
          <TColumn w="100%" color="gray.400" fontSize="12px">
            Nenhuma partida realizada. Clique no botão "Criar Partida" para cadastrar!
          </TColumn>
        </TRow>
      );
    }

    function listagemClassificacaoAtivo() {
      return listagemJogadoresClassificao
        .sort((a, b) => {
          if (a.pontuacao > b.pontuacao) {
            return -1;
          } else if (a.pontuacao < b.pontuacao) {
            return 1;
          } else {
            return 0;
          }
        })
        .map((item) => {
          return (
            <TRow key={item.nome}>
              <TColumn w="40%">{item.nome}</TColumn>
              <TColumn w="20%" justifyContent="center">
                {item.derrotas.reduce((acc: number, val: number) => acc + val)}
              </TColumn>
              <TColumn w="20%" justifyContent="center">
                {item.vitorias.reduce((acc: number, val: number) => acc + val)}
              </TColumn>
              <TColumn w="20%" justifyContent="center">
                {item.pontuacao.reduce((acc: number, val: number) => acc + val)}
              </TColumn>
            </TRow>
          );
        });
    }

    return (
      <Grid templateColumns={{ md: 'repeat(5, 1fr)', sm: '1fr' }} gap="20px" w="100%" mt="20px">
        <GridItem colSpan={{ md: 3, sm: 0 }}>
          <Table>
            <THeader display={{ md: 'flex', sm: 'none' }}>
              <THead w="40%">Partidas</THead>
              <THead w="20%" textAlign="center">
                Derrotas
              </THead>
              <THead w="20%" textAlign="center">
                Vitórias
              </THead>
              <THead w="20%" textAlign="center">
                Pontuação
              </THead>
            </THeader>
            <TBody>{listagemPlacarAtivo()}</TBody>
          </Table>
        </GridItem>
        <GridItem colSpan={{ md: 2, sm: 0 }}>
          <Table>
            <THeader display={{ md: 'flex', sm: 'none' }}>
              <THead w="40%">Classificação</THead>
              <THead w="20%" textAlign="center">
                D
              </THead>
              <THead w="20%" textAlign="center">
                V
              </THead>
              <THead w="20%" textAlign="center">
                Pontos
              </THead>
            </THeader>
            <TBody>{listagemClassificacaoAtivo()}</TBody>
          </Table>
        </GridItem>
      </Grid>
    );
  }, [listagemPartidasPlacarAtivoData, listagemJogadoresClassificao]);

  const PlacarHistorico = useMemo(() => {
    const listagemPlacarOrdenados = listagemPlacaresData.sort(ordenacaoTabela());
    return listagemPlacaresData.length !== 0 ? (
      listagemPlacarOrdenados
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
            <TRow
              key={item.id_placar}
              alignItems="center"
              bg={item.status === 'Ativo' ? 'rgba(72, 187, 120, 0.1)' : ''}
            >
              <TColumn w="25%">{item.nome}</TColumn>
              <TColumn w="15%">{item.jogo}</TColumn>
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
  }, [listagemPlacaresData, ordenarPeloValor, ordenarCrescente]);

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
              <Text mr="5px" color="orange.500">
                <FaHistory />
              </Text>
              Histórico de Placares
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel px="0">
              {PlacarAtivo}
              {PartidasPlacarAtivo}
            </TabPanel>
            <TabPanel px="0">
              <Box overflowX="auto" w="100%">
                <Table>
                  <THeader display={{ md: 'flex', sm: 'none' }}>
                    <THead w="25%" ordenarPor="nome">
                      Nome
                    </THead>
                    <THead w="15%" ordenarPor="jogo">
                      Jogo
                    </THead>
                    <THead w="15%" ordenarPor="jogadores">
                      Jogadores
                    </THead>
                    <THead w="10%" ordenarPor="partidas">
                      Partidas
                    </THead>
                    <THead w="10%" ordenarPor="data_inicio">
                      Data Início
                    </THead>
                    <THead w="10%" ordenarPor="data_fim">
                      Data Fim
                    </THead>
                    <THead w="10%">Status</THead>
                    <THeadButtons w="5%">Ações</THeadButtons>
                  </THeader>
                  <TBody>{PlacarHistorico}</TBody>
                  <TFooter>
                    <OrdenadorTabela listagemOrdenacao={listagemOrdenacao} />
                  </TFooter>
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
      <ControlePlacarAtivoProvider>
        <EdicaoPlacarProvider>
          <OrdenadorTabelaProvider>
            <Placar />
          </OrdenadorTabelaProvider>
        </EdicaoPlacarProvider>
      </ControlePlacarAtivoProvider>
    </ListagemPlacaresProvider>
  );
};

export default PlacarProvider;
