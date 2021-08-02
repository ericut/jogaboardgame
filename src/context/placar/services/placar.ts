// mockapi data
import { placaresData } from '../data/placaresData';
// interfaces
import { IGenericResponseProps } from '../../../interfaces/genericResponse';
import { IPlacaresProps } from '../../../interfaces/placar';

const Service = {
  buscarListagemPlacares: async () => {
    return await Promise.resolve<IGenericResponseProps<IPlacaresProps[]>>({
      status: 200,
      data: { content: placaresData, success: true, error_message: null },
    });
  },
};

export default Service;
