import { ReactNode, createContext, useState, useEffect, useContext } from 'react';
// interfaces
import {
  IPlacaresProps,
  IPartidaPlacarProps,
  IPartidaPlacarJogadorProps,
  IPartidaPlacarClassificacaoProps,
} from '../../interfaces/placar';
// context
import { ListagemPlacaresContext } from '../placar/ListagemPlacaresContext';
// service
import Service from './services/placar';

interface IControlePlacarAtivoContextProps {
  placarAtivo: IPlacaresProps | undefined;
  listagemPartidasPlacaresData: IPartidaPlacarProps[];
  listagemPartidasPlacarAtivoData: IPartidaPlacarProps[];
  localStorageSetListagemPartidasPlacar: () => void;
  listagemJogadoresClassificao: IPartidaPlacarClassificacaoProps[];
}

interface IControlePlacarAtivoProviderProps {
  children: ReactNode;
}

export const ControlePlacarAtivoContext = createContext({} as IControlePlacarAtivoContextProps);

export function ControlePlacarAtivoProvider({ children }: IControlePlacarAtivoProviderProps) {
  const { listagemPlacaresData } = useContext(ListagemPlacaresContext);

  const [placarAtivo, setPlacarAtivo] = useState<IPlacaresProps>();
  const [listagemPartidasPlacaresData, setListagemPartidasPlacaresData] = useState<IPartidaPlacarProps[]>([]);
  const [listagemPartidasPlacarAtivoData, setListagemPartidasPlacarAtivoData] = useState<IPartidaPlacarProps[]>([]);
  const [listagemJogadoresClassificao, setListagemJogadoresClassificao] = useState<IPartidaPlacarClassificacaoProps[]>(
    []
  );

  useEffect(() => {
    setPlacarAtivo(
      listagemPlacaresData.find((item) => {
        return item.status === 'Ativo';
      })
    );
  }, [listagemPlacaresData]);

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
    setListagemPartidasPlacarAtivoData(
      listagemPartidasPlacaresData.filter((itensFiltrados: IPartidaPlacarProps) => {
        return itensFiltrados.id_placar === placarAtivo?.id_placar;
      })
    );
  }, [placarAtivo]);

  useEffect(() => {
    let novosJogadores: any = [];
    listagemPartidasPlacarAtivoData.forEach((item) => {
      novosJogadores = novosJogadores.concat(item.jogadores);
    });
    let arrayNovosJogadores: any = novosJogadores.map((item: IPartidaPlacarJogadorProps) => {
      item.id = `${item.id_jogador}-${item.id_placar}-${item.id_partida}`;
      return item;
    });

    console.log(arrayNovosJogadores);

    let novosJogadoresFinal: any = Object.values(
      arrayNovosJogadores.reduce((acomulado: any, { nome, derrotas, vitorias, pontuacao }: any) => {
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

  function localStorageSetListagemPartidasPlacar() {
    localStorage.setItem('listagemPartidasPlacar', JSON.stringify(listagemPartidasPlacaresData));
  }

  return (
    <ControlePlacarAtivoContext.Provider
      value={{
        placarAtivo,
        listagemPartidasPlacaresData,
        listagemPartidasPlacarAtivoData,
        localStorageSetListagemPartidasPlacar,
        listagemJogadoresClassificao,
      }}
    >
      {children}
    </ControlePlacarAtivoContext.Provider>
  );
}
