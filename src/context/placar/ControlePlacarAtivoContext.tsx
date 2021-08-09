import { ReactNode, createContext, useState, useEffect, useContext } from 'react';
// interfaces
import { IPlacaresProps, IPartidaPlacarProps } from '../../interfaces/placar';
// context
import { ListagemPlacaresContext } from '../placar/ListagemPlacaresContext';
// service
import Service from './services/placar';

interface IControlePlacarAtivoContextProps {
  placarAtivo: IPlacaresProps | undefined;
  listagemPartidasPlacaresData: IPartidaPlacarProps[];
  listagemPartidasPlacarAtivoData: IPartidaPlacarProps[];
  localStorageSetListagemPartidasPlacar: () => void;
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
        return itensFiltrados.id_placar === placarAtivo?.id;
      })
    );
  }, [placarAtivo]);

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
      }}
    >
      {children}
    </ControlePlacarAtivoContext.Provider>
  );
}
