import { ReactNode, useContext } from 'react';
// chakra
import { Flex, Box, HStack, useColorModeValue, BoxProps, FlexProps, StackProps } from '@chakra-ui/react';
// icones
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
// context
import { OrdenadorTabelaContext } from '../../context/OrdenadorTabelaContext';

// interfaces
interface ITableProps extends BoxProps, FlexProps {
  w?: string;
  children: ReactNode;
}

interface ITableStackProps extends StackProps {
  w?: string;
  children: ReactNode;
}

interface ITableHeadProps extends ITableProps {
  ordenarPor?: string;
}

type ITableWidthOmited = Omit<ITableProps, 'w'>;

export function Table({ children, ...rest }: ITableProps) {
  return (
    <Box w="100%" {...rest}>
      {children}
    </Box>
  );
}

export function THeader({ children, ...rest }: ITableWidthOmited) {
  const TextColor = useColorModeValue('gray.400', 'gray.400');
  return (
    <Flex
      color={TextColor}
      minH="38px"
      fontSize="11px"
      textTransform="uppercase"
      style={{ zIndex: 1 }}
      fontWeight="bold"
      letterSpacing="1px"
      flexDirection={{ md: 'initial', sm: 'column' }}
      alignItems={{ md: 'center', sm: 'flex-start' }}
      justifyContent={{ md: 'initial', sm: 'flex-start' }}
      {...rest}
    >
      {children}
    </Flex>
  );
}

export function TFooter({ children, ...rest }: ITableWidthOmited) {
  const TextColor = useColorModeValue('gray.400', 'gray.400');
  return (
    <Flex
      color={TextColor}
      minH="38px"
      fontSize="11px"
      p="10px 10px"
      textTransform="uppercase"
      style={{ zIndex: 1 }}
      fontWeight="bold"
      letterSpacing="1px"
      flexDirection={{ md: 'initial', sm: 'column' }}
      alignItems={{ md: 'center', sm: 'flex-start' }}
      justifyContent={{ md: 'initial', sm: 'flex-start' }}
      {...rest}
    >
      {children}
    </Flex>
  );
}

export function THead({ children, w, ordenarPor, ...rest }: ITableHeadProps) {
  const { ordenarPeloValor, ordenarCrescente, handleOrdenarPeloValor, handleOrdenarCrescente } =
    useContext(OrdenadorTabelaContext);

  function ordernacaoMudarIcones() {
    if (ordenarPeloValor === ordenarPor) {
      if (ordenarCrescente === 'desc') {
        return <FaSortUp />;
      } else if (ordenarCrescente === 'asc') {
        return <FaSortDown />;
      }
    } else {
      return <FaSort />;
    }
  }

  function mudarOrdenacaoColuna() {
    if (ordenarCrescente === 'desc') {
      handleOrdenarCrescente('asc');
    } else if (ordenarCrescente === 'asc') {
      handleOrdenarCrescente('desc');
    }
    handleOrdenarPeloValor(ordenarPor ? ordenarPor : '');
  }

  return (
    <Box p="0px 10px" w={{ md: w ? w : '100%', sm: '100%' }} {...rest}>
      {ordenarPor ? (
        <Flex
          w="100%"
          alignItems="center"
          transition="0.2s all"
          _hover={{ cursor: 'pointer', color: 'blue.300' }}
          onClick={() => {
            mudarOrdenacaoColuna();
          }}
        >
          {children}
          {ordernacaoMudarIcones()}
        </Flex>
      ) : (
        children
      )}
    </Box>
  );
}

export function THeadButtons({ children, w, ...rest }: ITableProps) {
  return (
    <Flex
      display={{ md: 'flex', sm: 'none' }}
      p="0 10px"
      justifyContent={{ md: 'center', sm: 'flex-start' }}
      w={{ md: w ? w : '100%', sm: '100%' }}
      {...rest}
    >
      <Box textAlign="center">{children}</Box>
    </Flex>
  );
}

export function TBody({ children, ...rest }: ITableWidthOmited) {
  const BorderColor = useColorModeValue('gray.400', 'gray.600');
  return (
    <Box
      borderBottom="2px solid"
      borderTop="2px solid"
      borderTopColor={BorderColor}
      borderBottomColor={BorderColor}
      {...rest}
    >
      {children}
    </Box>
  );
}

export function TRow({ children, ...rest }: ITableWidthOmited) {
  const BorderColor = useColorModeValue('gray.400', 'gray.600');
  const HoverBgColor = useColorModeValue('gray.100', 'gray.700');
  return (
    <Flex
      borderBottom="1px solid"
      borderBottomColor={BorderColor}
      minH="40px"
      fontSize="14px"
      transition="0.5s all"
      padding={{ md: '10px 0', sm: '2px 0' }}
      flexDirection={{ md: 'initial', sm: 'column' }}
      alignItems={{ md: 'stretch', sm: 'flex-start' }}
      justifyContent={{ md: 'initial', sm: 'flex-start' }}
      _hover={{
        backgroundColor: HoverBgColor,
      }}
      {...rest}
    >
      {children}
    </Flex>
  );
}

export function TColumn({ children, w, ...rest }: ITableProps) {
  return (
    <Flex p="0 10px" w={{ md: w ? w : '100%', sm: '100%' }} _hover={{ color: 'primary.900' }} {...rest}>
      {children}
    </Flex>
  );
}

export function TColumnButtons({ children, w, ...rest }: ITableStackProps) {
  return (
    <HStack
      p="0 10px"
      alignItems="stretch"
      justifyContent={{ md: 'center', sm: 'flex-start' }}
      w={{ md: w ? w : '100%', sm: '100%' }}
      {...rest}
    >
      {children}
    </HStack>
  );
}
