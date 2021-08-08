// chakra
import { Box, IconButton, Flex, HStack, Select } from '@chakra-ui/react';
// icons
import { FaSortAlphaDown, FaSortAlphaUpAlt } from 'react-icons/fa';

interface IOrdenadorTabelaProps {
  listagemOrdenacao: IOrdernadorPorProps[];
  ordenarPeloValor: string;
  setOrdenarPeloValor: (value: string) => void;
  ordenacaoCrescente: boolean;
  setOrdenacaoCrescente: (value: boolean) => void;
}

interface IOrdernadorPorProps {
  tipo: string;
  label: string;
}

export function useOrdernadorTabela() {
  function ordenarTabela(ordenarPeloValor: string, ordenacaoCrescente: boolean) {
    return function ordenar(itemA: any, itemB: any) {
      let ordernarPor = ordenacaoCrescente === true ? 'asc' : 'desc';
      if (!itemA.hasOwnProperty(ordenarPeloValor) || !itemB.hasOwnProperty(ordenarPeloValor)) {
        return 0;
      }
      const varA =
        typeof itemA[ordenarPeloValor] === 'string' ? itemA[ordenarPeloValor].toUpperCase() : itemA[ordenarPeloValor];
      const varB =
        typeof itemB[ordenarPeloValor] === 'string' ? itemB[ordenarPeloValor].toUpperCase() : itemB[ordenarPeloValor];
      let comparar = 0;
      if (varA > varB) {
        comparar = 1;
      } else if (varA < varB) {
        comparar = -1;
      }
      return ordernarPor === 'desc' ? comparar * -1 : comparar;
    };
  }
  return { ordenarTabela };
}

const OrdenadorTabela = ({
  listagemOrdenacao,
  ordenarPeloValor,
  setOrdenarPeloValor,
  ordenacaoCrescente,
  setOrdenacaoCrescente,
}: IOrdenadorTabelaProps) => {
  return (
    <Flex w="100%" justifyContent="space-between" alignItems="center" flexDirection={{ md: 'initial', sm: 'column' }}>
      <HStack alignItems="center" w={{ md: '20%', sm: '100%' }}>
        <Select
          size="sm"
          value={ordenarPeloValor}
          onChange={(e) => setOrdenarPeloValor(e.target.value)}
          placeholder="Ordenar tabela por"
        >
          {listagemOrdenacao.map((orderBy) => {
            return (
              <option key={orderBy.tipo} value={orderBy.tipo}>
                {orderBy.label}
              </option>
            );
          })}
        </Select>
        <IconButton
          size="sm"
          children={ordenacaoCrescente ? <FaSortAlphaDown /> : <FaSortAlphaUpAlt />}
          aria-label="Ordenação"
          onClick={() => setOrdenacaoCrescente(!ordenacaoCrescente)}
          isDisabled={ordenarPeloValor === ''}
        />
      </HStack>
      <Box></Box>
    </Flex>
  );
};

export default OrdenadorTabela;
