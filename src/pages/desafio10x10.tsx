import { useMemo, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
//chakra
import {
  Text,
  Box,
  ButtonGroup,
  Button,
  IconButton,
  Flex,
  Heading,
  Badge,
  HStack,
  VStack,
  Input,
  NumberInput,
  NumberInputField,
  Checkbox,
  Stack,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
//componentes
import {
  Table,
  THeader,
  THead,
  THeadButtons,
  TBody,
  TRow,
  TColumn,
  TColumnButtons,
} from "../components/Table/Table";
//icones
import { GiMeeple } from "react-icons/gi";
import {
  FaEdit,
  FaSave,
  FaPlus,
  FaMinus,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { AiTwotoneCrown } from "react-icons/ai";
import { MdHelp } from "react-icons/md";
//props
import { IJogosProps, ICategoriasProps } from "../interfaces";
//data
import { jogosData } from "../data/jogosData";
import { categoriasData } from "../data/categoriasData";

const Desafio10x10 = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [drawerEdicaoJogo, setDrawerEdicaoJogo] = useState(false);
  const [modalEdicaoJogo, setModalEdicaoJogo] = useState(false);
  const [showHUD, setShowHUD] = useState(true);

  const [jogosListados, setJogosListados] = useState<IJogosProps[] | undefined>(
    jogosData
  );
  const [jogoEdicao, setJogoEdicao] = useState<IJogosProps | undefined>({
    id: 0,
    nome: "",
    partidas: "",
    categoria: [],
  });
  const [categoriaListagem] = useState<ICategoriasProps[] | undefined>(
    categoriasData
  );

  useEffect(() => {
    if (localStorage.getItem("listagemJogos")) {
      let jogosRecuperados = JSON.parse(localStorage.getItem("listagemJogos"));
      setJogosListados(jogosRecuperados);
    } else {
      setJogosListados(jogosData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("listagemJogos", JSON.stringify(jogosListados));
  }, [jogosListados]);

  function handleAbrirEdicaoJogo(item?) {
    onOpen();
    setDrawerEdicaoJogo(true);
    if (item) {
      setJogoEdicao(item);
    } else {
      return;
    }
  }

  function handleFecharDrawer() {
    onClose();
    setTimeout(() => {
      setDrawerEdicaoJogo(false);
    }, 100);
    setJogoEdicao({
      id: 0,
      nome: "",
      partidas: "",
      categoria: [],
    });
  }

  function handleFecharModal() {
    setModalEdicaoJogo(false);
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
      toast({
        title: `Jogo atualizado: ${jogoEdicao.nome}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      handleFecharDrawer();
    } else {
      if (jogoEdicao.nome !== "") {
        jogoEdicao.id = uuidv4();
        jogoEdicao.partidas = jogoEdicao.partidas ? jogoEdicao.partidas : 0;
        setJogosListados([...jogosListados, jogoEdicao]);
        toast({
          title: `Jogo adicionado: ${jogoEdicao.nome}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        handleFecharDrawer();
      } else {
        toast({
          title: "Insira um nome para o jogo!",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  }

  function handleConfirmarRemocaoJogo() {
    setModalEdicaoJogo(true);
  }

  function handleRemoverJogo() {
    setJogosListados(jogosListados.filter((item) => item.id !== jogoEdicao.id));
    handleFecharModal();
    handleFecharDrawer();
  }

  const NumeroPartidas = (partidas) => {
    let partidasTotais = Array.from({ length: 10 }, (v, k) => k + 1);
    let partidasJogadas = partidasTotais.map((item, index) => {
      return (
        <Text
          color={index + 1 <= partidas ? "green.500" : "gray.500"}
          key={item}
        >
          <GiMeeple />
        </Text>
      );
    });
    return <>{partidasJogadas}</>;
  };

  const ListagemJogos = useMemo(() => {
    const ListagemCategorias = (categoria) => {
      function corPorCategoria(item) {
        if (item === "Cooperativo") {
          return "green";
        } else if (item === "Duelo") {
          return "red";
        }
      }
      return (
        <>
          {categoriaListagem
            .filter((item) => categoria.indexOf(item.id) > -1)
            .map((item) => {
              return (
                <Badge
                  key={item.nome}
                  fontSize="9px"
                  mr="5px"
                  colorScheme={corPorCategoria(item.nome)}
                >
                  {item.nome}
                </Badge>
              );
            })}
        </>
      );
    };

    return jogosListados.length !== 0 ? (
      jogosListados.map((item) => {
        return (
          <TRow key={item.id}>
            <TColumn w="30%" flexDirection="column" justifyContent="center">
              <Text
                fontSize={{ md: "22px", sm: "16px" }}
                fontWeight="bold"
                letterSpacing="-0.7px"
              >
                {item.nome}
              </Text>
              <Stack
                display={{ md: "flex", sm: "none" }}
                shouldWrapChildren={true}
              >
                {showHUD ? ListagemCategorias(item.categoria) : ""}
              </Stack>
            </TColumn>
            <TColumn w="50%" alignItems="center">
              <Flex fontSize={{ md: "34px", sm: "22px" }} alignItems="center">
                {NumeroPartidas(item.partidas)}
                {item.partidas === 10 ? (
                  <Flex color="yellow.500" ml="10px" alignItems="center">
                    <AiTwotoneCrown />
                    <Text
                      display={{ md: "flex", sm: "none" }}
                      fontSize="10px"
                      textTransform="uppercase"
                    >
                      Finalizado!
                    </Text>
                  </Flex>
                ) : (
                  <></>
                )}
              </Flex>
            </TColumn>
            <TColumnButtons w="20%" alignItems="center">
              {showHUD ? (
                <HStack
                  pt={{ md: "0px", sm: "5px" }}
                  spacing="20px"
                  justifyContent={{ md: "center", sm: "space-between" }}
                  w="100%"
                >
                  <Flex>
                    <ButtonGroup size="sm" isAttached>
                      <IconButton
                        aria-label="Retirar Jogada"
                        colorScheme="orange"
                        variant="ghost"
                        icon={<FaMinus />}
                        onClick={() => handleRetirarPartida(item)}
                        isDisabled={item.partidas === 0}
                      />
                      <Button w="52px" isDisabled>
                        {item.partidas}
                      </Button>
                      <IconButton
                        aria-label="Acrescentar Jogada"
                        colorScheme="green"
                        variant="ghost"
                        icon={<FaPlus />}
                        onClick={() => handleAcrescentarPartida(item)}
                        isDisabled={item.partidas === 10}
                      />
                    </ButtonGroup>
                  </Flex>
                  <Flex>
                    <IconButton
                      size="sm"
                      colorScheme="blue"
                      variant="ghost"
                      aria-label="Editar Jogo"
                      icon={<FaEdit />}
                      onClick={() => handleAbrirEdicaoJogo(item)}
                    />
                  </Flex>
                </HStack>
              ) : (
                ""
              )}
            </TColumnButtons>
          </TRow>
        );
      })
    ) : (
      <TRow>
        <TColumn w="100%" color="gray.400" fontSize="12px">
          Nenhum jogo encontrado. Clique no botão "Adicionar Jogo" para
          cadastrar!
        </TColumn>
      </TRow>
    );
  }, [jogosListados, categoriaListagem, showHUD]);

  const EdicaoJogo = useMemo(() => {
    return (
      <>
        <DrawerCloseButton />
        <DrawerHeader>
          {jogoEdicao.id === 0 ? "Adicionar" : "Editar"} Jogo
        </DrawerHeader>
        <DrawerBody>
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
            <Stack w="100%" shouldWrapChildren={true}>
              <Text mt="10px">Categorias:</Text>
              <>
                {categoriaListagem.map((item) => {
                  return (
                    <Checkbox
                      w="50%"
                      key={item.id}
                      value={item.id}
                      isChecked={jogoEdicao.categoria.includes(item.id)}
                      onChange={(event) => handleEditarCategorias(event)}
                      mb="5px"
                    >
                      {item.nome}
                    </Checkbox>
                  );
                })}
              </>
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
                onClick={() => handleConfirmarRemocaoJogo()}
                w="50%"
                isDisabled={jogoEdicao.id === 0}
              >
                Remover Jogo
              </Button>
            </HStack>
          </VStack>
        </DrawerBody>
      </>
    );
  }, [jogoEdicao]);

  const RemoverJogo = () => {
    return (
      <>
        <ModalHeader>Remover Jogo da Lista</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Deseja remover este jogo da sua lista?</Text>
          <Text fontWeight="bold">{jogoEdicao.nome}</Text>
        </ModalBody>
        <ModalFooter>
          <HStack w="100%">
            <Button
              variant="outline"
              colorScheme="orange"
              w="50%"
              onClick={() => handleRemoverJogo()}
            >
              Remover Jogo
            </Button>
            <Button
              colorScheme="blue"
              w="50%"
              onClick={() => handleFecharModal()}
            >
              Cancelar
            </Button>
          </HStack>
        </ModalFooter>
      </>
    );
  };

  const Informacoes = (tipo) => {
    let informacao = <></>;
    if (tipo === "desafio10x10") {
      informacao = (
        <>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader fontWeight="bold">
            O que é o Desafio 10x10?
          </PopoverHeader>
          <PopoverBody>
            Escolha de 10 jogos e jogue cada um 10 vezes, o período padrão para
            as 100 sessões é de um ano, e avança na trilha conforme finaliza
            cada sessão.
            <br />O desafio pode ser feito de forma leve, podendo mudar qualquer
            um dos jogos, ou de forma pesada onde não poderá alterar a lista dos
            jogos no período.
          </PopoverBody>
        </>
      );
    }
    return (
      <>
        <PopoverTrigger>
          <Text
            fontSize="16px"
            px="10px"
            cursor="pointer"
            position="relative"
            color="blue.200"
          >
            <MdHelp />
          </Text>
        </PopoverTrigger>
        <PopoverContent>{informacao}</PopoverContent>
      </>
    );
  };

  return (
    <>
      {modalEdicaoJogo ? (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          motionPreset="slideInBottom"
          isCentered
        >
          <ModalOverlay />
          <ModalContent>{RemoverJogo()}</ModalContent>
        </Modal>
      ) : (
        ""
      )}

      {drawerEdicaoJogo ? (
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={handleFecharDrawer}
          size="lg"
        >
          <DrawerOverlay onClick={handleFecharDrawer} />
          <DrawerContent>{EdicaoJogo}</DrawerContent>
        </Drawer>
      ) : (
        ""
      )}

      <Flex
        w={{ lg: "1300px", md: "100%", sm: "100%" }}
        maxW="100%"
        minH="60vh"
        alignItems="center"
        flexDirection="column"
        py={{ md: "20px", sm: "10px" }}
        m="0 auto"
      >
        <Flex justifyContent="space-between" align="center" w="100%">
          <Flex alignItems="center" w="60%">
            <Heading fontWeight="bold" fontSize={{ md: "32px", sm: "20px" }}>
              Desafio 10x10
            </Heading>
            <Popover placement="bottom">{Informacoes("desafio10x10")}</Popover>
          </Flex>
          <Flex alignItems="center" justifyContent="flex-end" w="40%">
            <ButtonGroup>
              <IconButton
                aria-label="Adicionar Jogo"
                icon={showHUD ? <FaEyeSlash /> : <FaEye />}
                colorScheme="gray"
                variant="ghost"
                size="sm"
                onClick={() => setShowHUD(!showHUD)}
              />
              <Button
                display={{ md: "block", sm: "none" }}
                size="sm"
                isDisabled
              >
                {jogosListados.length}/10
              </Button>
              <Button
                display={{ md: "flex", sm: "none" }}
                leftIcon={<FaPlus />}
                colorScheme="blue"
                size="sm"
                onClick={() => handleAbrirEdicaoJogo()}
                isDisabled={jogosListados.length >= 10}
              >
                Adicionar Jogo
              </Button>
              <IconButton
                display={{ md: "none", sm: "flex" }}
                aria-label="Adicionar Jogo"
                icon={<FaPlus />}
                colorScheme="blue"
                size="sm"
                onClick={() => handleAbrirEdicaoJogo()}
                isDisabled={jogosListados.length >= 10}
              />
            </ButtonGroup>
          </Flex>
        </Flex>
        <Flex mt={{ md: "40px", sm: "10px" }} w="100%">
          <Box overflowX="auto" w="100%">
            <Table>
              <THeader display={{ md: "flex", sm: "none" }}>
                <THead w="30%">Jogos</THead>
                <THead w="50%">Partidas</THead>
                <THeadButtons w="20%">
                  {showHUD ? "Controle | Editar" : ""}
                </THeadButtons>
              </THeader>
              <TBody>{ListagemJogos}</TBody>
            </Table>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Desafio10x10;
