import { ReactNode, createContext, useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
// chakra
import { Button, HStack, VStack, Text, Flex, Box, useToast, Input, IconButton, useDisclosure } from '@chakra-ui/react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerFooter,
} from '@chakra-ui/react';
// icones
import { FaSave, FaTrash } from 'react-icons/fa';
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
// service
import Service from './services/placar';

interface IControlePlacarAtivoContextProps {
  listagemPartidasPlacaresData: IPartidaPlacarProps[];
  listagemPartidasPlacarAtivoData: IPartidaPlacarProps[];
  localStorageSetListagemPartidasPlacar: () => void;
  listagemJogadoresClassificao: IPartidaPlacarClassificacaoProps[];
  placarAtivo: IPlacaresProps;
  handleAbrirEdicaoPartida: (object?: IPartidaPlacarProps) => void;
}

interface IControlePlacarAtivoProviderProps {
  children: ReactNode;
}

export const ControlePlacarAtivoContext = createContext({} as IControlePlacarAtivoContextProps);

export function ControlePlacarAtivoProvider({ children }: IControlePlacarAtivoProviderProps) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { listagemPlacaresData } = useContext(ListagemPlacaresContext);
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
    setPlacarAtivo(
      listagemPlacaresData.find((item) => {
        return item.status === 'Ativo';
      })
    );
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
      novosJogadores.reduce((acomulado: any, { nome, derrotas, vitorias, pontuacao }: any) => {
        acomulado[nome] ??= { nome: nome, derrotas: [], vitorias: [], pontuacao: [] };
        if (Array.isArray(derrotas) && Array.isArray(vitorias) && Array.isArray(pontuacao)) {
          acomulado[nome].derrotas = acomulado[nome].derrotas.concat(derrotas);
          acomulado[nome].vitorias = acomulado[nome].vitorias.concat(vitorias);
          acomulado[nome].pontuacao = acomulado[nome].pontuacao.concat(pontuacao);
        } else {
          acomulado[nome].derrotas.push(derrotas);
          acomulado[nome].vitorias.push(vitorias);
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

  useEffect(() => {
    console.table(partidaEdicao);
  }, [partidaEdicao]);

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
          derrotas: 0,
          vitorias: 0,
          pontuacao: 0,
        };
        return novoJogador;
      });
      objetoPartidaEdicao.jogadores = objetosListagemJogadores;
      setPartidaEdicao(objetoPartidaEdicao);
    }
  }

  function handleSalvarPartida() {
    console.log('salvar');
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

  function handleConfirmarRemocaoPartida() {
    handleFecharDrawer();
  }

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
                {partidaEdicao.jogadores.map((item: IPartidaPlacarJogadorProps) => {
                  return <Text key={item.id_jogador}>{item.nome}</Text>;
                })}
              </Box>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <HStack w="100%" justifyContent="flex-end">
              <Button
                colorScheme="orange"
                leftIcon={<FaTrash />}
                onClick={() => handleConfirmarRemocaoPartida()}
                w="50%"
                isDisabled={partidaEdicao.id_partida === '0'}
              >
                Apagar Partida
              </Button>
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
      }}
    >
      {children}
      {drawerEdicaoPartida && DrawerEdicaoPartida()}
    </ControlePlacarAtivoContext.Provider>
  );
}
