import { ReactNode, createContext, useState, useEffect, useContext, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
// chakra
import {
  Button,
  HStack,
  VStack,
  Text,
  Flex,
  Box,
  useToast,
  useDisclosure,
  Switch,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerFooter,
} from '@chakra-ui/react';
// componentes
import { Table, THeader, THead, TBody, TRow, TColumn, TColumnButtons } from '../../components/Table/Table';
// icones
import { FaSave } from 'react-icons/fa';
import { GiLaurelCrown } from 'react-icons/gi';
// utilitários
import { novaData, formatarData } from '../../utils/formatarData';
// interfaces
import {
  IPlacaresProps,
  IPartidaPlacarProps,
  IPartidaPlacarClassificacaoProps,
  IPartidaPlacarJogadorProps,
} from '../../interfaces/placar';
// context
import { ListagemPlacaresContext } from '../placar/ListagemPlacaresContext';
import { EdicaoPlacarContext } from '../placar/EdicaoPlacarContext';
// service
import Service from './services/placar';

interface IControlePlacarAtivoContextProps {
  listagemPartidasPlacaresData: IPartidaPlacarProps[];
  listagemPartidasPlacarAtivoData: IPartidaPlacarProps[];
  localStorageSetListagemPartidasPlacar: () => void;
  listagemJogadoresClassificao: IPartidaPlacarClassificacaoProps[];
  placarAtivo: IPlacaresProps;
  handleAbrirEdicaoPartida: (object?: IPartidaPlacarProps) => void;
  handleRemoverPartida: (item?: any, nome?: any) => void;
  handleAbrirHistoricoPlacar: (item?: any) => void;
  handleFecharHistoricoPlacar: () => void;
}

interface IControlePlacarAtivoProviderProps {
  children: ReactNode;
}

export const ControlePlacarAtivoContext = createContext({} as IControlePlacarAtivoContextProps);

export function ControlePlacarAtivoProvider({ children }: IControlePlacarAtivoProviderProps) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { listagemPlacaresData } = useContext(ListagemPlacaresContext);
  const { handleAtualizarPartidasPlacarAtivo } = useContext(EdicaoPlacarContext);
  const [placarAtivo, setPlacarAtivo] = useState<any>({});
  const [listagemPartidasPlacaresData, setListagemPartidasPlacaresData] = useState<IPartidaPlacarProps[]>([]);
  const [listagemPartidasPlacarAtivoData, setListagemPartidasPlacarAtivoData] = useState<IPartidaPlacarProps[]>([]);
  const [listagemJogadoresClassificao, setListagemJogadoresClassificao] = useState<IPartidaPlacarClassificacaoProps[]>(
    []
  );

  const [drawerEdicaoPartida, setDrawerEdicaoPartida] = useState(false);
  const [partidaEdicao, setPartidaEdicao] = useState<IPartidaPlacarProps>({
    id_partida: '0',
    id_placar: '0',
    jogadores: [],
    data_partida: novaData(),
  });
  const [vencedorExistente, setVencedorExistente] = useState(false);
  const [modalRemoverPartida, setModalRemoverPartida] = useState(false);
  const [partidaParaRemover, setPartidaParaRemover] = useState<any>({ item: {}, nome: '' });

  useEffect(() => {
    if (!localStorage.getItem('listagemPartidasPlacar') || listagemPartidasPlacaresData === []) {
      Service.buscarListagemPartidasPlacar().then((response) => {
        setListagemPartidasPlacaresData(response.data.content);
      });
    } else {
      let partidasPlacarRecuperados = JSON.parse(localStorage.getItem('listagemPartidasPlacar') || '');
      setListagemPartidasPlacaresData(partidasPlacarRecuperados);
    }
  }, []);

  useEffect(() => {
    let placarAtivo = listagemPlacaresData.find((item) => {
      return item.status === 'Ativo';
    });
    setPlacarAtivo(placarAtivo);
    localStorageSetPlacarAtivo(placarAtivo);
  }, [listagemPlacaresData]);

  useEffect(() => {
    let listagemPartidas: any = [];
    listagemPartidas = listagemPartidasPlacaresData.filter((itensFiltrados: IPartidaPlacarProps) => {
      return itensFiltrados.id_placar === placarAtivo?.id_placar;
    });
    setListagemPartidasPlacarAtivoData(listagemPartidas);
  }, [placarAtivo]);

  useEffect(() => {
    let novosJogadores: any = [];
    listagemPartidasPlacarAtivoData.forEach((item: any) => {
      novosJogadores = novosJogadores.concat(item.jogadores);
    });
    let novosJogadoresFinal: any = Object.values(
      novosJogadores.reduce((acomulado: any, { nome, derrota, vitoria, pontuacao }: any) => {
        acomulado[nome] ??= { nome: nome, derrota: [], vitoria: [], pontuacao: [] };
        if (Array.isArray(derrota) && Array.isArray(vitoria) && Array.isArray(pontuacao)) {
          acomulado[nome].derrota = acomulado[nome].derrota.concat(derrota);
          acomulado[nome].vitoria = acomulado[nome].vitoria.concat(vitoria);
          acomulado[nome].pontuacao = acomulado[nome].pontuacao.concat(pontuacao);
        } else {
          acomulado[nome].derrota.push(derrota);
          acomulado[nome].vitoria.push(vitoria);
          acomulado[nome].pontuacao.push(pontuacao);
        }
        return acomulado;
      }, {})
    );
    setListagemJogadoresClassificao(novosJogadoresFinal);
  }, [listagemPartidasPlacarAtivoData]);

  useEffect(() => {
    localStorageSetListagemPartidasPlacar();
  }, [listagemPartidasPlacaresData]);

  function localStorageSetPlacarAtivo(item: any) {
    localStorage.setItem('placarAtivo', JSON.stringify(item));
  }

  function localStorageSetListagemPartidasPlacar() {
    localStorage.setItem('listagemPartidasPlacar', JSON.stringify(listagemPartidasPlacaresData));
  }

  function handleAbrirEdicaoPartida(item?: IPartidaPlacarProps) {
    onOpen();
    setDrawerEdicaoPartida(true);
    if (item) {
      setPartidaEdicao(item);
    } else {
      let objetoPartidaEdicao = {
        id_partida: '0',
        id_placar: placarAtivo.id_placar,
        data_partida: novaData(),
        jogadores: [],
      };
      let objetosListagemJogadores = placarAtivo.jogadores.map((item: any) => {
        let novoJogador = {
          id_partida: '0',
          id_jogador: uuidv4(),
          id_placar: placarAtivo.id_placar,
          nome: item,
          derrota: 0,
          vitoria: 0,
          pontuacao: 0,
        };
        return novoJogador;
      });
      objetoPartidaEdicao.jogadores = objetosListagemJogadores;
      setPartidaEdicao(objetoPartidaEdicao);
    }
  }

  function handleSalvarPartida() {
    if (vencedorExistente) {
      let partidaId = uuidv4();
      partidaEdicao.id_partida = partidaId;
      partidaEdicao.jogadores.map((jogadorId) => {
        jogadorId.id_partida = partidaId;
        return jogadorId;
      });
      setListagemPartidasPlacaresData([...listagemPartidasPlacaresData, partidaEdicao]);
      setListagemPartidasPlacarAtivoData([...listagemPartidasPlacarAtivoData, partidaEdicao]);
      toast({
        title: `Partida adicionada com sucesso`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      handleFecharDrawer();
    }
    handleAtualizarPartidasPlacarAtivo(placarAtivo.id_placar, listagemPartidasPlacarAtivoData.length + 1);
  }

  function handleFecharDrawer() {
    setDrawerEdicaoPartida(false);
    onClose();
    setPartidaEdicao({
      id_partida: '0',
      id_placar: '0',
      jogadores: [],
      data_partida: novaData(),
    });
  }

  function handleFecharModal() {
    setModalRemoverPartida(false);
  }

  function handleSelecionarVencedor(event: any, item: IPartidaPlacarJogadorProps) {
    let jogadoresAtualizado = [];
    if (event) {
      jogadoresAtualizado = partidaEdicao.jogadores.map((jogador: IPartidaPlacarJogadorProps) => {
        if (jogador.id_jogador === item.id_jogador) {
          jogador.pontuacao = 1;
          jogador.vitoria = 1;
          jogador.derrota = 0;
        } else {
          jogador.pontuacao = 0;
          jogador.vitoria = 0;
          jogador.derrota = 1;
        }
        return jogador;
      });
      setVencedorExistente(true);
    } else {
      jogadoresAtualizado = partidaEdicao.jogadores.map((jogador: IPartidaPlacarJogadorProps) => {
        jogador.pontuacao = 0;
        jogador.vitoria = 0;
        jogador.derrota = 0;
        return jogador;
      });
      setVencedorExistente(false);
    }
    setPartidaEdicao({ ...partidaEdicao, jogadores: jogadoresAtualizado });
  }

  function handleRemoverPartida(item: any, nome: any) {
    setPartidaParaRemover({ item, nome });
    setModalRemoverPartida(true);
    onOpen();
  }

  function handleConfirmarRemocaoPartida() {
    if (partidaParaRemover.item) {
      setListagemPartidasPlacaresData(
        listagemPartidasPlacaresData.filter(
          (itemFiltrado) => itemFiltrado.id_partida !== partidaParaRemover.item.id_partida
        )
      );
      setListagemPartidasPlacarAtivoData(
        listagemPartidasPlacarAtivoData.filter(
          (itemFiltrado) => itemFiltrado.id_partida !== partidaParaRemover.item.id_partida
        )
      );

      toast({
        title: `Partida ${partidaParaRemover.nome} removida!`,
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      handleFecharModal();
    }

    setPartidaParaRemover({ item: {}, nome: '' });
    handleAtualizarPartidasPlacarAtivo(placarAtivo.id_placar, listagemPartidasPlacarAtivoData.length - 1);
  }

  function handleAbrirHistoricoPlacar(item: IPlacaresProps) {
    setPlacarAtivo(item);
  }

  function handleFecharHistoricoPlacar() {
    let placarAtivo = JSON.parse(localStorage.getItem('placarAtivo') || '');
    setPlacarAtivo(placarAtivo);
  }

  const ModalRemoverPartida = () => {
    return (
      <Modal isOpen={isOpen} onClose={handleFecharModal} motionPreset="slideInBottom" isCentered>
        <ModalOverlay
          onClick={() => {
            handleFecharModal;
            onClose();
          }}
        />
        <ModalContent>
          <ModalHeader>Apagar Partida</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Deseja apagar esta partida?</Text>
            <Text fontWeight="bold">{partidaParaRemover.nome}</Text>
          </ModalBody>
          <ModalFooter>
            <HStack w="100%">
              <Button variant="outline" colorScheme="orange" w="50%" onClick={() => handleConfirmarRemocaoPartida()}>
                Confirmar
              </Button>
              <Button colorScheme="blue" w="50%" onClick={() => handleFecharModal()}>
                Cancelar
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  const ListagemAdicionarPartidaJogadores = useMemo(() => {
    return partidaEdicao.jogadores.map((item: IPartidaPlacarJogadorProps) => {
      return (
        <TRow key={item.id_jogador} flexDirection={{ sm: 'initial' }} alignItems={{ sm: 'center' }}>
          <TColumn w="40%">{item.nome}</TColumn>
          <TColumn w="30%" justifyContent="center">
            {item.pontuacao}
          </TColumn>
          <TColumnButtons w="30%">
            <Flex alignItems="center">
              <FormControl display="flex" alignItems="center" gridGap="2">
                <Text fontSize={item.vitoria === 1 ? '20px' : '18px'} color="green.500">
                  <GiLaurelCrown />
                </Text>
                <Switch
                  id={item.id_jogador + ''}
                  size="md"
                  colorScheme="green"
                  isChecked={item.vitoria === 1}
                  onChange={(e) => handleSelecionarVencedor(e.target.checked, item)}
                />
                <FormLabel htmlFor={item.id_jogador + ''} mb="0" cursor="pointer">
                  <Text
                    fontSize="14px"
                    color={item.vitoria === 1 ? 'green.500' : ''}
                    fontWeight={item.vitoria === 1 ? 'bold' : ''}
                  >
                    Vencedor
                  </Text>
                </FormLabel>
              </FormControl>
            </Flex>
          </TColumnButtons>
        </TRow>
      );
    });
  }, [partidaEdicao, partidaEdicao.jogadores]);

  const DrawerEdicaoPartida = () => {
    return (
      <Drawer isOpen={isOpen} onClose={handleFecharDrawer} placement="right" size="lg">
        <DrawerOverlay onClick={handleFecharDrawer} />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{partidaEdicao.id_partida === '0' ? 'Adicionar' : 'Editar'} Partida</DrawerHeader>
          <DrawerBody>
            <VStack spacing={5}>
              <Box w="100%">
                <Text fontSize="14px">Data da partida:</Text>
                <Button size="sm" isDisabled>
                  {formatarData(partidaEdicao.data_partida)}
                </Button>
              </Box>
              <Box w="100%">
                <Table>
                  <THeader justifyContent={{ sm: 'center' }}>
                    <THead w="40%">Jogadores</THead>
                    <THead w="30%" textAlign="center" display={{ md: 'block', sm: 'none' }}>
                      Pontuação
                    </THead>
                    <THead w="30%" textAlign="center" display={{ md: 'block', sm: 'none' }}>
                      Vitória da Partida
                    </THead>
                  </THeader>
                  <TBody>{ListagemAdicionarPartidaJogadores}</TBody>
                </Table>
              </Box>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <HStack w="100%" justifyContent="flex-end">
              <Button colorScheme="green" leftIcon={<FaSave />} onClick={() => handleSalvarPartida()} w="50%">
                Salvar Partida
              </Button>
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  };

  return (
    <ControlePlacarAtivoContext.Provider
      value={{
        listagemPartidasPlacaresData,
        listagemPartidasPlacarAtivoData,
        localStorageSetListagemPartidasPlacar,
        listagemJogadoresClassificao,
        placarAtivo,
        handleAbrirEdicaoPartida,
        handleRemoverPartida,
        handleAbrirHistoricoPlacar,
        handleFecharHistoricoPlacar,
      }}
    >
      {children}
      {modalRemoverPartida && ModalRemoverPartida()}
      {drawerEdicaoPartida && DrawerEdicaoPartida()}
    </ControlePlacarAtivoContext.Provider>
  );
}
