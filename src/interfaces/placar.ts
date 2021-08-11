export interface IPlacaresProps {
  id_placar: string | number;
  nome: string;
  jogo: string;
  jogadores: string[];
  status: 'Ativo' | 'Finalizado' | 'Incompleto';
  partidas: string | number;
  data_inicio: string;
  data_fim: string;
}

export interface IPartidaPlacarProps {
  id_partida: string | number;
  id_placar: string | number;
  data_partida: string;
  jogadores: IPartidaPlacarJogadorProps[];
}

export interface IPartidaPlacarJogadorProps {
  id?: string | number;
  id_jogador: string | number;
  id_placar: string | number;
  id_partida: string | number;
  nome: string;
  vitoria: string | number;
  derrota: string | number;
  pontuacao: string | number;
}

export interface IPartidaPlacarClassificacaoProps {
  nome: string;
  vitoria: number[];
  derrota: number[];
  pontuacao: number[];
}
