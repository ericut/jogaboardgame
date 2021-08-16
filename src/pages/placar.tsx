import { useContext, useMemo } from 'react';
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
import Paginacao, { usePaginacao } from '../components/Paginacao/Paginacao';
// icones
import { FaPlus, FaTrophy, FaEdit, FaCircle, FaCogs, FaTrash } from 'react-icons/fa';
// utilitários
import { formatarData } from '../utils/formatarData';
// context
import { ListagemPlacaresProvider, ListagemPlacaresContext } from '../context/placar/ListagemPlacaresContext';
import { ControlePlacarAtivoProvider, ControlePlacarAtivoContext } from '../context/placar/ControlePlacarAtivoContext';
import { EdicaoPlacarProvider, EdicaoPlacarContext } from '../context/placar/EdicaoPlacarContext';
import { OrdenadorTabelaProvider, OrdenadorTabelaContext } from '../context/OrdenadorTabelaContext';

const Placar = () => {
  const { listagemPlacaresData } = useContext(ListagemPlacaresContext);
  const {
    placarAtivo,
    listagemPartidasPlacarAtivoData,
    listagemJogadoresClassificao,
    handleAbrirEdicaoPartida,
    handleRemoverPartida,
  } = useContext(ControlePlacarAtivoContext);
  const { handleAbrirEdicaoPlacar } = useContext(EdicaoPlacarContext);
  const { ordenacaoTabela, ordenarPeloValor, ordenarCrescente } = useContext(OrdenadorTabelaContext);
  const listagemOrdenacao = [
    { tipo: 'nome', label: 'Nome do Placar' },
    { tipo: 'jogo', label: 'Nome do Jogo' },
    { tipo: 'jogadores', label: 'Jogadores' },
    { tipo: 'partidas', label: 'Número de Partidas' },
    { tipo: 'data_inicio', label: 'Data de Início' },
    { tipo: 'data_fim', label: 'Data da Finalização' },
    { tipo: 'status', label: 'Status' },
  ];
  const { paginaAtual, itensPorPagina, setPaginaAtual, setItensPorPagina, primeiraPagina, ultimaPagina } =
    usePaginacao();

  //
  //
  //
  const PlacarAtivo = useMemo(() => {
    return placarAtivo ? (
      <Box w="100%">
        <Grid
          templateColumns={{ md: 'repeat(5, 1fr)', sm: 'repeat(2, 1fr)' }}
          templateRows={{ md: 'repeat(2, 1fr)', sm: 'auto' }}
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
          <GridItem colSpan={{ md: 3, sm: 2 }}>
            <InfoBoxPlacar label="Jogadores">
              <Box mt="3px" maxW="100%">
                {placarAtivo.jogadores
                  ? placarAtivo.jogadores.map((jogador, index) => {
                      return (
                        <Badge key={index} fontSize="13px" mr="10px">
                          {jogador}
                        </Badge>
                      );
                    })
                  : ''}
              </Box>
            </InfoBoxPlacar>
          </GridItem>
          <GridItem colSpan={{ md: 2, sm: 2 }}>
            <Button
              variant="outline"
              colorScheme="green"
              w={{ md: '100%', sm: '100%' }}
              h={{ md: '100%', sm: '56px' }}
              onClick={() => handleAbrirEdicaoPartida()}
            >
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
  }, [placarAtivo, placarAtivo?.jogadores, listagemPlacaresData]);
  //
  //
  //
  const PartidasPlacarAtivo = useMemo(() => {
    function listagemPlacarAtivo() {
      return listagemPartidasPlacarAtivoData.length !== 0 ? (
        listagemPartidasPlacarAtivoData
          .map((item, index) => {
            return (
              <TRow
                key={item.id_partida}
                pt="0px !important"
                flexDirection={{ sm: 'initial' }}
                alignItems={{ sm: 'center' }}
              >
                <Table>
                  <THeader justifyContent={{ md: 'space-between', sm: 'center' }}>
                    <THead fontWeight="bold" textAlign={{ md: 'left', sm: 'center' }}>
                      {placarAtivo?.jogo} - Partida #{index + 1}
                    </THead>
                    <THead textAlign="right">
                      <IconButton
                        size="sm"
                        variant="ghost"
                        color="gray.500"
                        aria-label="Excluir Partida"
                        icon={<FaTrash />}
                        onClick={() => handleRemoverPartida(item, `${placarAtivo?.jogo} - Partida #${index + 1}`)}
                        _hover={{
                          color: 'red.300',
                        }}
                      />
                    </THead>
                  </THeader>
                  <TBody>
                    {item.jogadores.map((subItem, index) => {
                      return (
                        <TRow key={index} flexDirection={{ sm: 'initial' }} alignItems={{ sm: 'center' }}>
                          <TColumn w="40%">{subItem.nome}</TColumn>
                          <TColumn w="20%" justifyContent="center">
                            {subItem.derrota}
                          </TColumn>
                          <TColumn w="20%" justifyContent="center">
                            {subItem.vitoria}
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
          .slice(primeiraPagina, ultimaPagina)
      ) : (
        <TRow>
          <TColumn w="100%" color="gray.400" fontSize="12px">
            Nenhuma partida realizada. Clique no botão "Adicionar Partida" para cadastrar!
          </TColumn>
        </TRow>
      );
    }
    function listagemClassificacaoAtivo() {
      return listagemJogadoresClassificao.length !== 0 ? (
        listagemJogadoresClassificao
          .sort((a, b) => {
            let itemA = a.pontuacao.reduce((acc: number, val: number) => acc + val);
            let itemB = b.pontuacao.reduce((acc: number, val: number) => acc + val);
            if (itemA > itemB) {
              return -1;
            } else if (itemA < itemB) {
              return 1;
            } else {
              return 0;
            }
          })
          .map((item) => {
            return (
              <TRow
                key={item.nome}
                _even={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                flexDirection={{ sm: 'initial' }}
                alignItems={{ sm: 'center' }}
              >
                <TColumn w="40%">{item.nome}</TColumn>
                <TColumn w="15%" justifyContent="center">
                  {item.derrota.reduce((acc: number, val: number) => acc + val)}
                </TColumn>
                <TColumn w="15%" justifyContent="center">
                  {item.vitoria.reduce((acc: number, val: number) => acc + val)}
                </TColumn>
                <TColumn w="15%" justifyContent="center">
                  {item.pontuacao.length}
                </TColumn>
                <TColumn w="15%" justifyContent="center">
                  {item.pontuacao.reduce((acc: number, val: number) => acc + val)}
                </TColumn>
              </TRow>
            );
          })
      ) : (
        <TRow>
          <TColumn w="100%" color="gray.400" fontSize="12px">
            Adicione uma partida para obter a classificação deste placar.
          </TColumn>
        </TRow>
      );
    }
    return (
      <Grid
        autoFlow="revert"
        templateColumns={{ md: 'repeat(5, 1fr)', sm: '1fr' }}
        templateRows={{ md: '1fr', sm: '1fr' }}
        gap="20px"
        w="100%"
        mt="20px"
      >
        <GridItem colSpan={{ md: 3, sm: 0 }} gridRow={{ md: '1', sm: '0' }}>
          <Table>
            <THeader>
              <THead w="40%" textAlign={{ md: 'left', sm: 'center' }}>
                Histórico de Partidas
              </THead>
              <THead w="60%" textAlign="center" display={{ md: 'none', sm: 'block' }}>
                Derrotas | Vitórias | Pontos
              </THead>
              <THead w="20%" textAlign="center" display={{ md: 'block', sm: 'none' }}>
                Derrotas
              </THead>
              <THead w="20%" textAlign="center" display={{ md: 'block', sm: 'none' }}>
                Vitórias
              </THead>
              <THead w="20%" textAlign="center" display={{ md: 'block', sm: 'none' }}>
                Pontuação
              </THead>
            </THeader>
            <TBody>{listagemPlacarAtivo()}</TBody>
            <TFooter>
              <Paginacao
                paginaAtual={paginaAtual}
                itensPorPagina={itensPorPagina}
                totalItens={listagemPartidasPlacarAtivoData.length}
                mudarPaginaAtual={setPaginaAtual}
                mudarQtdItensPorPagina={setItensPorPagina}
              />
            </TFooter>
          </Table>
        </GridItem>
        <GridItem colSpan={{ md: 2, sm: 0 }} gridRow={{ md: '0', sm: '1' }}>
          <Table>
            <THeader>
              <THead w="40%" textAlign={{ md: 'left', sm: 'center' }}>
                Classificação
              </THead>
              <THead w="60%" textAlign="center" display={{ md: 'none', sm: 'block' }}>
                Derrotas | Vitórias | Jogos | Pontos
              </THead>
              <THead w="15%" textAlign="center" display={{ md: 'block', sm: 'none' }}>
                D
              </THead>
              <THead w="15%" textAlign="center" display={{ md: 'block', sm: 'none' }}>
                V
              </THead>
              <THead w="15%" textAlign="center" display={{ md: 'block', sm: 'none' }}>
                Jogos
              </THead>
              <THead w="15%" textAlign="center" display={{ md: 'block', sm: 'none' }}>
                Pontos
              </THead>
            </THeader>
            <TBody>{listagemClassificacaoAtivo()}</TBody>
          </Table>
          <Box
            w="100%"
            display={{ md: 'none', sm: 'block' }}
            borderBottom="5px dashed"
            borderBottomColor="gray.500"
            mt="30px"
            bg="gray.600"
          />
        </GridItem>
      </Grid>
    );
  }, [listagemPartidasPlacarAtivoData, listagemJogadoresClassificao, primeiraPagina, ultimaPagina]);
  //
  //
  //
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
              <TColumn w="15%">{item.nome}</TColumn>
              <TColumn w="15%">{item.jogo}</TColumn>
              <TColumn w="25%">
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
                <Text
                  fontSize="12px"
                  mr="5px"
                  color={
                    item.status === 'Ativo' ? 'green.500' : item.status === 'Finalizado' ? 'orange.500' : 'red.500'
                  }
                >
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
  //
  //
  //
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
          <IconButton
            display={{ md: 'none', sm: 'flex' }}
            aria-label="Criar Placar"
            icon={<FaPlus />}
            colorScheme="blue"
            size="sm"
            onClick={() => handleAbrirEdicaoPlacar()}
          />
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
          <TabList>
            <Tab>
              <Text mr="5px" color="green.500">
                <FaTrophy />
              </Text>
              Placar Ativo
            </Tab>
            <Tab>
              <Text mr="5px" color="orange.500">
                <FaCogs />
              </Text>
              Controle dos Placares
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
                    <THead w="15%" ordenarPor="nome">
                      Nome
                    </THead>
                    <THead w="15%" ordenarPor="jogo">
                      Jogo
                    </THead>
                    <THead w="25%" ordenarPor="jogadores">
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
                    <THead w="10%" ordenarPor="status">
                      Status
                    </THead>
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
      <EdicaoPlacarProvider>
        <ControlePlacarAtivoProvider>
          <OrdenadorTabelaProvider>
            <Placar />
          </OrdenadorTabelaProvider>
        </ControlePlacarAtivoProvider>
      </EdicaoPlacarProvider>
    </ListagemPlacaresProvider>
  );
};

export default PlacarProvider;
