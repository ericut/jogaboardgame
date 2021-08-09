import { IPartidaPlacarProps } from '../../../interfaces/placar';

export const partidasPlacarData: IPartidaPlacarProps[] = [
  {
    id: 'partida-id',
    id_placar: 'any-id',
    data_partida: '2021-08-09',
    jogadores: [
      {
        id: '1',
        nome: 'Mr Li',
        derrotas: 0,
        vitorias: 1,
        pontuacao: 1,
      },
      {
        id: '2',
        nome: 'Iranilo',
        derrotas: 0,
        vitorias: 0,
        pontuacao: 0,
      },
      {
        id: '3',
        nome: 'Manin',
        derrotas: 0,
        vitorias: 0,
        pontuacao: 0,
      },
    ],
  },
  {
    id: 'partida-id2',
    id_placar: 'any-id',
    data_partida: '2021-08-09',
    jogadores: [
      {
        id: '1',
        nome: 'Mr Li',
        derrotas: 1,
        vitorias: 0,
        pontuacao: 0,
      },
      {
        id: '2',
        nome: 'Iranilo',
        derrotas: 0,
        vitorias: 1,
        pontuacao: 1,
      },
      {
        id: '3',
        nome: 'Manin',
        derrotas: 1,
        vitorias: 0,
        pontuacao: 1,
      },
    ],
  },
  {
    id: 'partida-id3',
    id_placar: 'outro-any-id',
    data_partida: '2021-08-09',
    jogadores: [
      {
        id: '1',
        nome: 'Mr Li',
        derrotas: 1,
        vitorias: 0,
        pontuacao: 0,
      },
      {
        id: '2',
        nome: 'Iranilo',
        derrotas: 0,
        vitorias: 1,
        pontuacao: 1,
      },
      {
        id: '3',
        nome: 'Manin',
        derrotas: 1,
        vitorias: 0,
        pontuacao: 1,
      },
    ],
  },
];
