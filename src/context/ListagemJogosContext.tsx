import { ReactNode, createContext, useState, useEffect } from 'react';
// interfaces
import { IJogosProps } from '../interfaces';
// service
import Service from './services/desafio10x10';

interface IListagemJogosContextData {
  listagemJogosData: IJogosProps[];
  setListagemJogosData: (object: Array<IJogosProps>) => void;
  handleAcrescentarPartida: (item: IJogosProps) => void;
  handleRetirarPartida: (item: IJogosProps) => void;
  handleMudarConfiguracoesListagem: (qtdPartidas: number) => void;
  localStorageSetListagem: () => void;
}

interface IListagemProviderProps {
  children: ReactNode;
}

export const ListagemJogosContext = createContext({} as IListagemJogosContextData);

export function ListagemJogosProvider({ children }: IListagemProviderProps) {
  const [listagemJogosData, setListagemJogosData] = useState<IJogosProps[]>([]);

  useEffect(() => {
    if (!localStorage.getItem('listagemJogos') || listagemJogosData === []) {
      Service.buscarListagemJogos().then((response) => {
        setListagemJogosData(response.data.content);
      });
    } else {
      let jogosRecuperados = JSON.parse(localStorage.getItem('listagemJogos') || '');
      setListagemJogosData(jogosRecuperados);
    }
  }, []);

  useEffect(() => {
    localStorageSetListagem();
  }, [listagemJogosData]);

  function localStorageSetListagem() {
    localStorage.setItem('listagemJogos', JSON.stringify(listagemJogosData));
  }

  function handleAcrescentarPartida(item: IJogosProps) {
    let jogoAddPartida: IJogosProps | any = listagemJogosData.find((findItem) => findItem.id === item.id);
    if (jogoAddPartida.partidas < 10) {
      jogoAddPartida.partidas = +jogoAddPartida.partidas;
      jogoAddPartida.partidas += 1;
      setListagemJogosData(
        listagemJogosData.map((itemAdded) => {
          if (itemAdded.id === jogoAddPartida.id) {
            itemAdded.id = jogoAddPartida.id;
            itemAdded.nome = jogoAddPartida.nome;
            itemAdded.partidas = jogoAddPartida.partidas;
            itemAdded.categoria = jogoAddPartida.categoria;
          }
          return itemAdded;
        })
      );
    }
    localStorageSetListagem();
  }

  function handleRetirarPartida(item: IJogosProps) {
    let jogoAddPartida: IJogosProps | any = listagemJogosData.find((findItem) => findItem.id === item.id);
    if (jogoAddPartida.partidas > 0) {
      // mutation + decrement
      jogoAddPartida.partidas = +jogoAddPartida.partidas;
      jogoAddPartida.partidas -= 1;
      setListagemJogosData(
        listagemJogosData.map((itemAdded) => {
          if (itemAdded.id === jogoAddPartida.id) {
            itemAdded.id = jogoAddPartida.id;
            itemAdded.nome = jogoAddPartida.nome;
            itemAdded.partidas = jogoAddPartida.partidas;
            itemAdded.categoria = jogoAddPartida.categoria;
          }
          return itemAdded;
        })
      );
      localStorageSetListagem();
    }
  }

  function handleMudarConfiguracoesListagem(qtdPartidas: number) {
    setListagemJogosData(
      listagemJogosData.map((item) => {
        if (item.partidas >= qtdPartidas) {
          item.partidas = qtdPartidas;
        }
        return item;
      })
    );
  }

  return (
    <ListagemJogosContext.Provider
      value={{
        listagemJogosData,
        setListagemJogosData,
        handleAcrescentarPartida,
        handleRetirarPartida,
        handleMudarConfiguracoesListagem,
        localStorageSetListagem,
      }}
    >
      {children}
    </ListagemJogosContext.Provider>
  );
}
