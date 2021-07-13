import { useMemo, useRef, useState, useEffect } from "react";
import {
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  ButtonGroup,
  Button,
  IconButton,
  Box,
  Flex,
  Heading,
  Badge,
  HStack,
  VStack,
  Input,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Checkbox,
  Stack,
} from "@chakra-ui/react";
import { GiMeeple } from "react-icons/gi";
import { FaEdit, FaSave, FaPlus, FaMinus } from "react-icons/fa";

import { IJogosProps } from "../interfaces";

const Desafio10x10 = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const [jogosListados, setJogosListados] = useState<IJogosProps[] | undefined>(
    [{ id: 1, nome: "Castle of Burgundy", partidas: 1, categoria: [1, 2] }]
  );

  const [jogoEdicao, setJogoEdicao] = useState<IJogosProps | undefined>({
    id: 0,
    nome: "",
    partidas: "",
    categoria: [],
  });

  const [categoriaListagem] = useState([
    { id: 1, nome: "Colocação de peças" },
    { id: 2, nome: "Colecionar componentes" },
    { id: 3, nome: "Rolagem de dados" },
  ]);

  useEffect(() => {
    console.log(jogoEdicao);
  }, [jogoEdicao]);

  function handleAbrirEdicaoJogo(item?) {
    onOpen();
    if (item) {
      setJogoEdicao(item);
    } else {
      return;
    }
  }

  function handleCloseDrawer() {
    onClose();
    setJogoEdicao({
      id: 0,
      nome: "",
      partidas: "",
      categoria: [],
    });
  }

  function handleEditarCategorias(event) {
    let value = +event.target.value;
    let checked = event.target.checked;
    let categorias = jogoEdicao.categoria;
    if (checked) {
      setJogoEdicao({ ...jogoEdicao, categoria: categorias.concat([value]) });
    } else {
      setJogoEdicao({
        ...jogoEdicao,
        categoria: categorias.filter((item) => item !== value),
      });
    }
  }

  function handleAcrescentarPartida(item) {
    let jogoAddPartida = jogosListados.find(
      (findItem) => findItem.id === item.id
    );
    if (jogoAddPartida.partidas < 10) {
      // mutation + increment
      jogoAddPartida.partidas = +jogoAddPartida.partidas;
      jogoAddPartida.partidas += 1;
      setJogosListados(
        jogosListados.map((itemAdded) => {
          if (itemAdded.id === jogoAddPartida.id) {
            itemAdded.id = jogoAddPartida.id;
            itemAdded.nome = jogoAddPartida.nome;
            itemAdded.partidas = jogoAddPartida.partidas;
            itemAdded.categoria = jogoAddPartida.categoria;
          }
          return itemAdded;
        })
      );
    }
  }

  function handleRetirarPartida(item) {
    let jogoAddPartida = jogosListados.find(
      (findItem) => findItem.id === item.id
    );
    if (jogoAddPartida.partidas > 0) {
      // mutation + decrement
      jogoAddPartida.partidas = +jogoAddPartida.partidas;
      jogoAddPartida.partidas -= 1;
      setJogosListados(
        jogosListados.map((itemAdded) => {
          if (itemAdded.id === jogoAddPartida.id) {
            itemAdded.id = jogoAddPartida.id;
            itemAdded.nome = jogoAddPartida.nome;
            itemAdded.partidas = jogoAddPartida.partidas;
            itemAdded.categoria = jogoAddPartida.categoria;
          }
          return itemAdded;
        })
      );
    }
  }

  function handleSalvarJogo() {
    let jogoExistente = jogosListados.find((item) => item.id === jogoEdicao.id);
    if (jogoExistente) {
      setJogosListados(
        jogosListados.map((item) => {
          if (item.id === jogoEdicao.id) {
            item.id = jogoEdicao.id;
            item.nome = jogoEdicao.nome;
            item.partidas = jogoEdicao.partidas;
            item.categoria = jogoEdicao.categoria;
          }
          return item;
        })
      );
    } else {
      if (jogoEdicao.nome !== "") {
        jogoEdicao.id = jogosListados.length + 1;
        jogoEdicao.partidas = jogoEdicao.partidas ? jogoEdicao.partidas : 0;
        setJogosListados([...jogosListados, jogoEdicao]);
      }
    }
    handleCloseDrawer();
  }

  function handleRemoverJogo() {
    setJogosListados(jogosListados.filter((item) => item.id !== jogoEdicao.id));
    handleCloseDrawer();
  }

  const ListagemJogos = useMemo(() => {
    return jogosListados.length !== 0 ? (
      jogosListados.map((item) => {
        return (
          <Tr key={item.id}>
            <Td w="30%">
              <Text
                fontSize="22px"
                fontWeight="bold"
                letterSpacing="-0.7px"
                pb="5px"
              >
                {item.nome}
              </Text>
              <HStack>
                {item.categoria.map((subItem) => {
                  return <Badge fontSize="9px">{subItem}</Badge>;
                })}
              </HStack>
            </Td>
            <Td w="60%">
              <Flex fontSize="34px">
                {item.partidas}
                <GiMeeple />
              </Flex>
            </Td>
            <Td w="10%">
              <ButtonGroup size="md" isAttached>
                <IconButton
                  aria-label="Acrescentar Jogada"
                  colorScheme="green"
                  icon={<FaPlus />}
                  onClick={() => handleAcrescentarPartida(item)}
                />
                <IconButton
                  aria-label="Retirar Jogada"
                  colorScheme="orange"
                  icon={<FaMinus />}
                  onClick={() => handleRetirarPartida(item)}
                />
              </ButtonGroup>
            </Td>
            <Td w="10%">
              <Flex justifyContent="center">
                <IconButton
                  colorScheme="blue"
                  aria-label="Editar Jogo"
                  icon={<FaEdit />}
                  onClick={() => handleAbrirEdicaoJogo(item)}
                />
              </Flex>
            </Td>
          </Tr>
        );
      })
    ) : (
      <Tr>
        <Td w="100%" colSpan={4} color="gray.400" fontSize="12px">
          Nenhum jogo encontrado. Clique no botão "Adicionar Jogo" para
          cadastrar!
        </Td>
      </Tr>
    );
  }, [jogosListados]);

  const EdicaoJogo = useMemo(() => {
    return (
      <VStack>
        <Input
          placeholder="Nome do Jogo"
          value={jogoEdicao.nome}
          onChange={(event) =>
            setJogoEdicao({ ...jogoEdicao, nome: event.target.value })
          }
        />
        <NumberInput
          w="100%"
          value={jogoEdicao.partidas}
          min={0}
          max={10}
          onChange={(value) =>
            setJogoEdicao({ ...jogoEdicao, partidas: +value })
          }
        >
          <NumberInputField placeholder="Número de Partidas Iniciais" />
        </NumberInput>
        <Stack w="100%">
          <Text>Categoria:</Text>
          {categoriaListagem.map((item) => {
            return (
              <Checkbox
                key={item.id}
                value={item.id}
                isChecked={jogoEdicao.categoria.includes(item.id)}
                onChange={(event) => handleEditarCategorias(event)}
              >
                {item.nome}
              </Checkbox>
            );
          })}
        </Stack>
        <HStack w="100%" pt="30px">
          <Button
            colorScheme="green"
            leftIcon={<FaSave />}
            onClick={() => handleSalvarJogo()}
            w="50%"
          >
            Salvar Jogo
          </Button>
          <Button
            colorScheme="orange"
            leftIcon={<FaSave />}
            onClick={() => handleRemoverJogo()}
            w="50%"
            isDisabled={jogoEdicao.id === 0}
          >
            Remover Jogo
          </Button>
        </HStack>
      </VStack>
    );
  }, [jogoEdicao]);

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={handleCloseDrawer}
        finalFocusRef={btnRef}
        size="lg"
      >
        <DrawerOverlay onClick={handleCloseDrawer} />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {jogoEdicao.id === 0 ? "Adicionar" : "Editar"} Jogo
          </DrawerHeader>
          <DrawerBody>{EdicaoJogo}</DrawerBody>
        </DrawerContent>
      </Drawer>
      <Flex
        w={{ lg: "1300px", md: "100%", sm: "100%" }}
        maxW="100%"
        minH="60vh"
        alignItems="center"
        flexDirection="column"
        py="20px"
        m="0 auto"
      >
        <Flex justifyContent="space-between" align="center" w="100%">
          <Heading fontSize={{ md: "32px", sm: "22px" }}>Desafio 10x10</Heading>
          <Flex alignItems="center" justifyContent="flex-end" w="50%">
            <ButtonGroup>
              <Button
                display={{ md: "block", sm: "none" }}
                size="sm"
                isDisabled
              >
                {jogosListados.length}/10
              </Button>
              <Button
                leftIcon={<FaPlus />}
                colorScheme="blue"
                size="sm"
                ref={btnRef}
                onClick={() => handleAbrirEdicaoJogo()}
                isDisabled={jogosListados.length >= 10}
              >
                Adicionar Jogo
              </Button>
            </ButtonGroup>
          </Flex>
        </Flex>
        <Flex mt="40px" w="100%">
          <Table>
            <Thead>
              <Tr>
                <Th w="30%">Jogo</Th>
                <Th w="50%">Partidas</Th>
                <Th w="10%"></Th>
                <Th w="10%">
                  <Flex justifyContent="center">Ações</Flex>
                </Th>
              </Tr>
            </Thead>
            <Tbody>{ListagemJogos}</Tbody>
          </Table>
        </Flex>
      </Flex>
    </>
  );
};

export default Desafio10x10;
