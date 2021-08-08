import { useContext } from 'react';
// chakra
import { IconButton, Flex, HStack, Select } from '@chakra-ui/react';
// icons
import { FaSortAlphaDown, FaSortAlphaUpAlt } from 'react-icons/fa';
import { useMemo } from 'react';
// context
import { OrdenadorTabelaContext } from '../../context/OrdenadorTabelaContext';

interface IOrdenadorTabelaProps {
  listagemOrdenacao: IOrdernadorPorProps[];
}

interface IOrdernadorPorProps {
  tipo: string;
  label: string;
}

const OrdenadorTabela = ({ listagemOrdenacao }: IOrdenadorTabelaProps) => {
  const { ordenarPeloValor, ordenarCrescente, handleOrdenarPeloValor, handleOrdenarCrescente } =
    useContext(OrdenadorTabelaContext);
  const ordenadorTabela = useMemo(() => {
    return (
      <Flex w="100%" justifyContent="space-between" alignItems="center" flexDirection={{ md: 'initial', sm: 'column' }}>
        <HStack alignItems="center" w={{ md: '20%', sm: '100%' }}>
          <Select
            size="sm"
            value={ordenarPeloValor}
            onChange={(e) => handleOrdenarPeloValor(e.target.value)}
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
            children={ordenarCrescente === 'desc' ? <FaSortAlphaDown /> : <FaSortAlphaUpAlt />}
            aria-label="Ordenação"
            onClick={() => handleOrdenarCrescente()}
            isDisabled={ordenarPeloValor === ''}
          />
        </HStack>
      </Flex>
    );
  }, [ordenarPeloValor, ordenarCrescente]);
  return ordenadorTabela;
};

export default OrdenadorTabela;
