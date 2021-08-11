import { IPlacaresProps } from '../../../interfaces/placar';

export const placaresData: IPlacaresProps[] = [
  {
    id_placar: 'any-id',
    nome: 'Jogatina Coup (Exemplo)',
    jogo: 'Coup',
    jogadores: ['Mr Li', 'Iranilo', 'Manin'],
    status: 'Ativo',
    partidas: 2,
    data_inicio: '2021-07-29',
    data_fim: '',
  },
  {
    id_placar: 'outro-any-id',
    nome: 'Jogatina Saboteur (Exemplo)',
    jogo: 'Saboteur',
    jogadores: ['Mr Li', 'Iranilo', 'Manin'],
    status: 'Finalizado',
    partidas: 1,
    data_inicio: '2021-07-29',
    data_fim: '',
  },
];
