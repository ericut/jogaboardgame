import { useState } from 'react';
// chakra
import { Text, Flex, Select, Button, HStack } from '@chakra-ui/react';

interface IPaginacaoProps {
  paginaAtual: number;
  itensPorPagina: number;
  totalItens: number;
  mudarPaginaAtual: (value: number) => void;
  mudarQtdItensPorPagina: (value: number) => void;
}

export function usePaginacao() {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina, setItensPorPagina] = useState(5);
  const ultimaPagina = paginaAtual * itensPorPagina;
  const primeiraPagina = ultimaPagina - itensPorPagina;

  return { paginaAtual, itensPorPagina, setPaginaAtual, setItensPorPagina, primeiraPagina, ultimaPagina };
}

const Paginacao = ({
  paginaAtual,
  itensPorPagina,
  totalItens,
  mudarPaginaAtual,
  mudarQtdItensPorPagina,
}: IPaginacaoProps) => {
  let paginasListadas = [];
  for (let i = 1; i <= Math.ceil(totalItens / itensPorPagina); i++) {
    paginasListadas.push(i);
  }
  function mudarPaginacao(pagina: number) {
    mudarPaginaAtual(pagina);
  }
  function mudarItensPorPagina(qtd: number) {
    mudarQtdItensPorPagina(qtd);
    mudarPaginaAtual(1);
  }

  return (
    <Flex w="100%" justifyContent="space-between" alignItems="center" flexDirection={{ md: 'initial', sm: 'column' }}>
      <Flex alignItems="center" mb="10px" w={{ md: '30%', sm: '100%' }}>
        <Text textTransform="uppercase" fontSize="9px" color="gray.400" w={{ md: '', sm: '50%' }}>
          Itens por Página
        </Text>
        <Select value={itensPorPagina} ml="5px" size="sm" onChange={(e) => mudarItensPorPagina(+e.target.value)}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </Select>
      </Flex>
      <HStack mb="10px">
        {paginasListadas.map((pagina) => {
          return (
            <Button
              key={pagina}
              p="5px"
              colorScheme={pagina === paginaAtual ? 'blue' : 'gray'}
              isDisabled={pagina === paginaAtual}
              onClick={() => mudarPaginacao(pagina)}
            >
              {pagina}
            </Button>
          );
        })}
      </HStack>
    </Flex>
  );
};

export default Paginacao;
