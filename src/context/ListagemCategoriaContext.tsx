import { ReactNode, createContext, useState, useEffect } from 'react';
// interfaces
import { ICategoriasProps } from '../interfaces';
// service
import Service from './services/desafio10x10';

interface IListagemCategoriasContextData {
  listagemCategoriasData: ICategoriasProps[];
}

interface IListagemCategoriasProviderProps {
  children: ReactNode;
}

export const ListagemCategoriasContext = createContext({} as IListagemCategoriasContextData);

export function ListagemCategoriasProvider({ children }: IListagemCategoriasProviderProps) {
  // estado das categorias
  const [listagemCategoriasData, setListagemCategoriasData] = useState<ICategoriasProps[]>([]);

  useEffect(() => {
    Service.buscarListagemCategorias().then((response) => {
      setListagemCategoriasData(response.data.content);
    });
  }, []);

  return (
    <ListagemCategoriasContext.Provider value={{ listagemCategoriasData }}>
      {children}
    </ListagemCategoriasContext.Provider>
  );
}
