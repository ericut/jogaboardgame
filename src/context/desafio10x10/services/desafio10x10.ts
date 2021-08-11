// mockapi data
import { jogosData } from '../data/jogosData';
import { categoriasData } from '../data/categoriasData';
import { configuracoesData } from '../data/configuracoesData';
// interfaces
import { IGenericResponseProps } from '../../../interfaces/genericResponse';
import { IJogosProps, ICategoriasProps, IConfiguracoesProps } from '../../../interfaces/desafio10x10';

const Service = {
  buscarListagemJogos: async () => {
    return await Promise.resolve<IGenericResponseProps<IJogosProps[]>>({
      status: 200,
      data: { content: jogosData, success: true, error_message: null },
    });
  },
  buscarListagemCategorias: async () => {
    return await Promise.resolve<IGenericResponseProps<ICategoriasProps[]>>({
      status: 200,
      data: { content: categoriasData, success: true, error_message: null },
    });
  },
  buscarConfiguracoes: async () => {
    return await Promise.resolve<IGenericResponseProps<IConfiguracoesProps>>({
      status: 200,
      data: { content: configuracoesData, success: true, error_message: null },
    });
  },
};

export default Service;
