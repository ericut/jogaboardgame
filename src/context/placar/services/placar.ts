// mockapi data
import { placaresData } from '../data/placaresData';
import { partidasPlacarData } from '../data/partidasPlacarData';
// interfaces
import { IGenericResponseProps } from '../../../interfaces/genericResponse';
import { IPlacaresProps, IPartidaPlacarProps } from '../../../interfaces/placar';

const Service = {
  buscarListagemPlacares: async () => {
    return await Promise.resolve<IGenericResponseProps<IPlacaresProps[]>>({
      status: 200,
      data: { content: placaresData, success: true, error_message: null },
    });
  },
  buscarListagemPartidasPlacar: async () => {
    return await Promise.resolve<IGenericResponseProps<IPartidaPlacarProps[]>>({
      status: 200,
      data: { content: partidasPlacarData, success: true, error_message: null },
    });
  },
};

export default Service;
