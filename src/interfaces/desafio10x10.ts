export interface IJogosProps {
  id: string | number;
  nome: string;
  partidas: string | number;
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
