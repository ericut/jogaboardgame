import { ReactNode, createContext, useState } from 'react';

interface IOrdenadorTabelaContextProps {
  ordenacaoTabela: any;
  ordenarPeloValor: string;
  ordenarCrescente: string;
  handleOrdenarPeloValor: (value: string) => void;
  handleOrdenarCrescente: (value: string) => void;
}

interface IOrdenadorTabelaProviderProps {
  children: ReactNode;
}

export const OrdenadorTabelaContext = createContext({} as IOrdenadorTabelaContextProps);

export function OrdenadorTabelaProvider({ children }: IOrdenadorTabelaProviderProps) {
  const [ordenarPeloValor, setOrdenarPeloValor] = useState('');
  const [ordenarCrescente, setOrdenarCrescente] = useState('asc');

  function handleOrdenarPeloValor(value: string) {
    setOrdenarPeloValor(value);
  }

  function handleOrdenarCrescente(value: string) {
    if (!value) {
      if (ordenarCrescente === 'desc') {
        setOrdenarCrescente('asc');
      } else if (ordenarCrescente === 'asc') {
        setOrdenarCrescente('desc');
      }
    } else {
      setOrdenarCrescente(value);
    }
  }

  function ordenacaoTabela() {
    return function ordenar(itemA: any, itemB: any) {
      if (!itemA.hasOwnProperty(ordenarPeloValor) || !itemB.hasOwnProperty(ordenarPeloValor)) {
        return 0;
      }
      const varA =
        typeof itemA[ordenarPeloValor] === 'string' ? itemA[ordenarPeloValor].toUpperCase() : itemA[ordenarPeloValor];
      const varB =
        typeof itemB[ordenarPeloValor] === 'string' ? itemB[ordenarPeloValor].toUpperCase() : itemB[ordenarPeloValor];
      let comparar = 0;
      if (varA > varB) {
        comparar = 1;
      } else if (varA < varB) {
        comparar = -1;
      }
      return ordenarCrescente === 'desc' ? comparar * -1 : comparar;
    };
  }

  return (
    <OrdenadorTabelaContext.Provider
      value={{ ordenacaoTabela, ordenarPeloValor, ordenarCrescente, handleOrdenarPeloValor, handleOrdenarCrescente }}
    >
      {children}
    </OrdenadorTabelaContext.Provider>
  );
}
