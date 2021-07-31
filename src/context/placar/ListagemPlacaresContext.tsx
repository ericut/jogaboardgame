import { ReactNode, createContext, useState, useEffect } from 'react';
// interfaces
import { IPlacaresProps } from '../../interfaces/placar';
// service
import Service from './services/placar';

interface IListagemPlacaresContextData {
  listagemPlacaresData: IPlacaresProps[];
  setListagemPlacaresData: (object: Array<IPlacaresProps>) => void;
  localStorageSetListagemPlacares: () => void;
}

interface IListagemPlacaresProviderProps {
  children: ReactNode;
}

export const ListagemPlacaresContext = createContext({} as IListagemPlacaresContextData);

export function ListagemPlacaresProvider({ children }: IListagemPlacaresProviderProps) {
  const [listagemPlacaresData, setListagemPlacaresData] = useState<IPlacaresProps[]>([]);

  useEffect(() => {
    if (!localStorage.getItem('listagemPlacares') || listagemPlacaresData === []) {
      Service.buscarListagemPlacares().then((response) => {
        setListagemPlacaresData(response.data.content);
      });
    } else {
      let placaresRecuperados = JSON.parse(localStorage.getItem('listagemPlacares') || '');
      setListagemPlacaresData(placaresRecuperados);
    }
  }, []);

  useEffect(() => {
    localStorageSetListagemPlacares();
  }, [listagemPlacaresData]);

  function localStorageSetListagemPlacares() {
    localStorage.setItem('listagemPlacares', JSON.stringify(listagemPlacaresData));
  }

  return (
    <ListagemPlacaresContext.Provider
      value={{
        listagemPlacaresData,
        setListagemPlacaresData,
        localStorageSetListagemPlacares,
      }}
    >
      {children}
    </ListagemPlacaresContext.Provider>
  );
}
