// mockapi data
import { placaresData } from '../data/placaresData';
import { partidasPlacarData } from '../data/partidasPlacarData';
import { jogadoresPartidasPlacarData } from '../data/jogadoresPartidasPlacarData';
// interfaces
import { IGenericResponseProps } from '../../../interfaces/genericResponse';
import { IPlacaresProps, IPartidaPlacarProps, IPartidaPlacarJogadorProps } from '../../../interfaces/placar';

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
  buscarListagemJogadoresPartida: async () => {
    return await Promise.resolve<IGenericResponseProps<IPartidaPlacarJogadorProps[]>>({
      status: 200,
      data: { content: jogadoresPartidasPlacarData, success: true, error_message: null },
    });
  },
};

export default Service;
