import { ReactNode, createContext, useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
// chakra
import { useToast } from '@chakra-ui/react';
// interfaces
import { IJogosProps } from '../interfaces';
// context
import { ListagemJogosContext } from './ListagemJogosContext';

interface IEdicaoJogoContextData {
  jogoEdicao: IJogosProps;
  setJogoEdicao: (object: IJogosProps) => void;
  handleSalvarJogo: () => void;
  handleRemoverJogo: () => void;
}

interface IEdicaoJogoProviderProps {
  children: ReactNode;
}

export const EdicaoJogoContext = createContext({} as IEdicaoJogoContextData);

export function EdicaoJogoProvider({ children }: IEdicaoJogoProviderProps) {
  // chakra
  const toast = useToast();
  // contexts
  const { listagemJogosData, setListagemJogosData, localStorageSetListagem } = useContext(ListagemJogosContext);

  const [jogoEdicao, setJogoEdicao] = useState<IJogosProps>({
    id: 0,
    nome: '',
    partidas: '',
    categoria: [],
  });

  useEffect(() => {}, []);

  function handleSalvarJogo() {
    let jogoExistente = listagemJogosData.find((item) => item.id === jogoEdicao.id);
    if (jogoExistente) {
      setListagemJogosData(
        listagemJogosData.map((item) => {
          if (item.id === jogoEdicao.id) {
            item.id = jogoEdicao.id;
            item.nome = jogoEdicao.nome;
            item.partidas = jogoEdicao.partidas;
            item.categoria = jogoEdicao.categoria;
          }
          return item;
        })
      );
      toast({
        title: `Jogo atualizado: ${jogoEdicao.nome}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      if (jogoEdicao.nome !== '') {
        jogoEdicao.id = uuidv4();
        jogoEdicao.partidas = jogoEdicao.partidas ? jogoEdicao.partidas : 0;
        setListagemJogosData([...listagemJogosData, jogoEdicao]);
        toast({
          title: `Jogo adicionado: ${jogoEdicao.nome}`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Insira o nome do jogo para salvar!',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
      }
    }
    localStorageSetListagem();
  }

  function handleRemoverJogo() {
    setListagemJogosData(listagemJogosData.filter((item) => item.id !== jogoEdicao.id));
    localStorageSetListagem();
  }

  return (
    <EdicaoJogoContext.Provider value={{ jogoEdicao, setJogoEdicao, handleSalvarJogo, handleRemoverJogo }}>
      {children}
    </EdicaoJogoContext.Provider>
  );
}
