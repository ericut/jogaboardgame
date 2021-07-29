import { ReactNode, createContext, useState, useEffect, useContext } from 'react';
// interfaces
import { IConfiguracoesProps } from '../interfaces';
// service
import Service from './services/desafio10x10';
// context
import { ListagemJogosContext } from './ListagemJogosContext';

interface IConfiguracoesContextData {
  configuracoesDesafio: IConfiguracoesProps;
  jogosTotais: number;
  partidasTotais: number;
}

interface IConfiguracoesProviderProps {
  children: ReactNode;
}

export const ConfiguracoesContext = createContext({} as IConfiguracoesContextData);

export function ConfiguracoesProvider({ children }: IConfiguracoesProviderProps) {
  // contexts
  const { handleMudarConfiguracoesListagem } = useContext(ListagemJogosContext);

  const [configuracoesDesafio, setConfiguracoesDesafio] = useState<IConfiguracoesProps>({
    qtdJogos: 10,
    qtdPartidas: 10,
  });
  const [jogosTotais, setJogosTotais] = useState<number>(configuracoesDesafio.qtdJogos);
  const [partidasTotais, setPartidasTotais] = useState<number>(configuracoesDesafio.qtdPartidas);

  useEffect(() => {
    if (localStorage.getItem('configuracoesDesafio')) {
      let configuracoesRecuperadas = JSON.parse(localStorage.getItem('configuracoesDesafio') || '');
      setConfiguracoesDesafio(configuracoesRecuperadas);
      setJogosTotais(configuracoesRecuperadas.qtdJogos);
      setPartidasTotais(configuracoesRecuperadas.qtdPartidas);
    } else {
      Service.buscarConfiguracoes().then((response) => {
        setConfiguracoesDesafio(response.data.content);
      });
    }
  }, []);

  function handleSalvarConfiguracoes() {
    handleMudarConfiguracoesListagem(configuracoesDesafio.qtdPartidas);
    localStorage.setItem('configuracoesDesafio', JSON.stringify(configuracoesDesafio));
    setJogosTotais(configuracoesDesafio.qtdJogos);
    setPartidasTotais(configuracoesDesafio.qtdPartidas);
  }

  return (
    <ConfiguracoesContext.Provider value={{ configuracoesDesafio, jogosTotais, partidasTotais }}>
      {children}
    </ConfiguracoesContext.Provider>
  );
}
