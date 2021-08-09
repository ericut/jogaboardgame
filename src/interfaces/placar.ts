export interface IPlacaresProps {
  id: string | number;
  nome: string;
  jogo: string;
  jogadores: string[];
  status: string;
  partidas: string | number;
  data_inicio: string;
  data_fim: string;
}

export interface IPartidaPlacarProps {
  id: string | number;
  id_placar: string | number;
  jogadores: IPartidaPlacarJogadorProps[];
  data_partida: string;
}

export interface IPartidaPlacarJogadorProps {
  id: string | number;
  nome: string;
  vitorias: number;
  derrotas: number;
  pontuacao: number;
}
