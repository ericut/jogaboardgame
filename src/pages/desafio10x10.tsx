import {
  Flex,
  Heading,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
} from "@chakra-ui/react";
import { GiMeeple } from "react-icons/gi";
import { FaEdit } from "react-icons/fa";

const Desafio10x10 = () => {
  return (
    <Flex
      w={{ lg: "1300px", md: "100%", sm: "100%" }}
      maxW="100%"
      alignItems="center"
      flexDirection="column"
      height="60vh"
      py="20px"
      m="0 auto"
    >
      <Heading size="lg">Desafio 10x10</Heading>
      <Flex mt="60px" w="100%">
        <Table>
          <Thead>
            <Tr>
              <Th w="20%">Jogo</Th>
              <Th w="70%">Partidas</Th>
              <Th w="10%">
                <Flex justifyContent="center">Ações</Flex>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td w="20%">
                <Text fontSize="22px" fontWeight="bold" letterSpacing="-0.7px">
                  Nome
                </Text>
              </Td>
              <Td w="70%">
                <Flex fontSize="34px">
                  <GiMeeple />
                  <GiMeeple />
                  <GiMeeple />
                </Flex>
              </Td>
              <Td w="10%">
                <Flex justifyContent="center">
                  <FaEdit />
                </Flex>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Flex>
    </Flex>
  );
};

export default Desafio10x10;
