export interface IPlacaresProps {
  id: string | number;
  nome: string;
  jogos: string[];
  jogadores: string[];
  status: string;
  partidas: string | number;
  data_inicio: string;
  data_fim: string;
}
