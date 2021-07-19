export interface IJogosProps {
  id: number;
  nome: string;
  partidas: number | string;
  categoria: Array<number>;
}

export interface ICategoriasProps {
  id: number;
  nome: string;
}

export interface IConfiguracoesProps {
  qtdJogos: number;
  qtdPartidas: number;
}
