import { useMemo, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
// chakra
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
  FormControl,
  FormLabel,
  InputGroup,
  InputRightAddon,
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
  DrawerFooter,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
// componentes
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
// icones
import { GiMeeple } from "react-icons/gi";
import {
  FaEdit,
  FaSave,
  FaPlus,
  FaMinus,
  FaEye,
  FaEyeSlash,
  FaCog,
} from "react-icons/fa";
import { AiTwotoneCrown } from "react-icons/ai";
import { MdHelp } from "react-icons/md";
// props
import {
  IJogosProps,
  ICategoriasProps,
  IConfiguracoesProps,
} from "../interfaces";
// data
import { jogosData } from "../data/jogosData";
import { categoriasData } from "../data/categoriasData";

const Desafio10x10 = () => {
  // hooks chakra
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // estados de controles
  const [showHUD, setShowHUD] = useState(true);
  // drawers
  const [drawerConfiguracaoDesafio, setDrawerConfiguracaoDesafio] =
    useState(false);
  const [drawerEdicaoJogo, setDrawerEdicaoJogo] = useState(false);
  // modals
  const [modalSalvarConfiguracoes, setModalSalvarConfiguracoes] =
    useState(false);
  const [modalRemoverJogo, setModalRemoverJogo] = useState(false);

  // estado de configurações do desafio
  const [configuracoesDesafio, setConfiguracoesDesafio] = useState<
    IConfiguracoesProps | undefined
  >({
    qtdJogos: 10,
    qtdPartidas: 10,
  });
  const [jogosTotais, setJogosTotais] = useState(configuracoesDesafio.qtdJogos);
  const [partidasTotais, setPartidasTotais] = useState(
    configuracoesDesafio.qtdPartidas
  );
  // estado de listagem dos jogos
  const [jogosListados, setJogosListados] = useState<IJogosProps[] | undefined>(
    jogosData
  );
  // estado da edição e adição de jogo
  const [jogoEdicao, setJogoEdicao] = useState<IJogosProps | undefined>({
    id: 0,
    nome: "",
    partidas: "",
    categoria: [],
  });
  // estado das categorias
  const [categoriaListagem] = useState<ICategoriasProps[] | undefined>(
    categoriasData
  );

  // recuperação do jogo na localstorage
  useEffect(() => {
    if (localStorage.getItem("listagemJogos")) {
      let jogosRecuperados = JSON.parse(localStorage.getItem("listagemJogos"));
      setJogosListados(jogosRecuperados);
    } else {
      setJogosListados(jogosData);
    }
    if (localStorage.getItem("configuracoesDesafio")) {
      let configuracoesRecuperadas = JSON.parse(
        localStorage.getItem("configuracoesDesafio")
      );
      setConfiguracoesDesafio(configuracoesRecuperadas);
      setJogosTotais(configuracoesRecuperadas.qtdJogos);
      setPartidasTotais(configuracoesRecuperadas.qtdPartidas);
    } else {
      setConfiguracoesDesafio({ qtdJogos: 10, qtdPartidas: 10 });
    }
  }, []);

  // aplicando localstorage quando há alguma atualização na listagem
  useEffect(() => {
    localStorage.setItem("listagemJogos", JSON.stringify(jogosListados));
  }, [jogosListados]);

  // controles configuração do desafio
  function handleAbrirConfiguracaoDesafio() {
    onOpen();
    setDrawerConfiguracaoDesafio(true);
  }
  // controles edição e adição de jogo
  function handleAbrirEdicaoJogo(item?) {
    onOpen();
    setDrawerEdicaoJogo(true);
    if (item) {
      setJogoEdicao(item);
    } else {
      return;
    }
  }
  // controle checkbox das categorias
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
  // controles -/+ das linhas da tabela
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
  // controles dos componentes do chakra
  function handleFecharDrawer() {
    if (
      configuracoesDesafio.qtdJogos !== jogosTotais ||
      configuracoesDesafio.qtdPartidas !== partidasTotais
    ) {
      toast({
        title: "Você alterou as configurações, salve para continuar.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    } else {
      setDrawerConfiguracaoDesafio(false);
      onClose();
    }
    setDrawerEdicaoJogo(false);
    setJogoEdicao({
      id: 0,
      nome: "",
      partidas: "",
      categoria: [],
    });
  }
  function handleFecharModal() {
    setModalRemoverJogo(false);
    setModalSalvarConfiguracoes(false);
  }

  // popover informações sobre o desafio
  const Informacoes = (tipo) => {
    let informacao = <></>;
    if (tipo === "desafio10x10") {
      informacao = (
        <>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader fontWeight="bold">
            O que é o Desafio {jogosTotais}x{partidasTotais}?
          </PopoverHeader>
          <PopoverBody>
            Escolha <strong>{jogosTotais} jogos</strong> e jogue cada um deles{" "}
            <strong>{partidasTotais} vezes</strong>, o período padrão para as{" "}
            <strong>{jogosTotais * partidasTotais} partidas</strong> é de um
            ano. Avance na trilha dos meeples conforme finalizar as partidas de
            cada jogo.
            <br />O desafio pode ser feito de forma leve, podendo mudar qualquer
            um dos jogos, ou de forma pesada onde não poderá alterar a lista dos
            jogos no período ou até finalizar todas as partidas.
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

  // renderização modal remoção do jogo
  const ModalDesafio = () => {
    // controles remoção do jogo da lista
    function handleRemoverJogo() {
      setJogosListados(
        jogosListados.filter((item) => item.id !== jogoEdicao.id)
      );
      handleFecharModal();
      handleFecharDrawer();
    }
    // controle salvar configuracoes
    function handleSalvarConfiguracoes() {
      setJogosListados(
        jogosListados.map((item) => {
          if (item.partidas >= configuracoesDesafio.qtdPartidas) {
            item.partidas = configuracoesDesafio.qtdPartidas;
          }
          return item;
        })
      );
      localStorage.setItem(
        "configuracoesDesafio",
        JSON.stringify(configuracoesDesafio)
      );
      setJogosTotais(configuracoesDesafio.qtdJogos);
      setPartidasTotais(configuracoesDesafio.qtdPartidas);
      setDrawerConfiguracaoDesafio(false);
      setModalSalvarConfiguracoes(false);
      onClose();
    }

    // renders
    const renderModalRemoverJogo = () => {
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
                Confirmar
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

    const renderModalSalvarConfiguracoes = () => {
      return (
        <>
          <ModalHeader>Confirmação da nova configuração</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Deseja salvar estas configurações?</Text>
            <Text fontWeight="bold">
              Quantidade de Jogos: {configuracoesDesafio.qtdJogos}
            </Text>
            <Text fontWeight="bold" pb="20px">
              Quantidade de Partidas: {configuracoesDesafio.qtdPartidas}
            </Text>
            <Text
              color="red.400"
              fontSize="14px"
              p="5px"
              border="1px solid"
              borderColor="red.400"
            >
              <strong>ATENÇÃO:</strong>
              <br />• Se já tiver partidas computadas excedendo ao novo número
              de total de partidas, será aplicado o novo valor finalizando o
              desafio do jogo.
              <br />• Se o número de jogos cadastros for maior que de jogos
              totais do desafio, eles não serão listados na listagem.
            </Text>
          </ModalBody>
          <ModalFooter>
            <HStack w="100%">
              <Button
                variant="outline"
                colorScheme="green"
                w="50%"
                onClick={() => handleSalvarConfiguracoes()}
              >
                Confirmar
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

    return modalRemoverJogo
      ? renderModalRemoverJogo()
      : renderModalSalvarConfiguracoes();
  };

  // renderização drawer de edição e adição de jogo // configurações do desafio
  const DrawerDesafio = () => {
    // controle salvar configurações
    function handleConfirmaSalvarConfiguracoes() {
      if (
        configuracoesDesafio.qtdJogos !== jogosTotais ||
        configuracoesDesafio.qtdPartidas !== partidasTotais
      ) {
        setModalSalvarConfiguracoes(true);
      }
    }
    // controle salvar jogo
    function handleSalvarJogo() {
      let jogoExistente = jogosListados.find(
        (item) => item.id === jogoEdicao.id
      );
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
            title: "Insira o nome do jogo para salvar!",
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    }
    // controles remoção do jogo da lista
    function handleConfirmarRemocaoJogo() {
      setModalRemoverJogo(true);
    }

    // renders
    const renderDrawerEdicao = () => {
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
              <InputGroup>
                <NumberInput
                  w="100%"
                  value={jogoEdicao.partidas}
                  min={0}
                  max={partidasTotais}
                  onChange={(value) =>
                    setJogoEdicao({ ...jogoEdicao, partidas: +value })
                  }
                >
                  <NumberInputField placeholder="Número de Partidas Iniciais" />
                </NumberInput>
                <InputRightAddon
                  fontSize="10px"
                  textTransform="uppercase"
                  children={`Max ${partidasTotais}`}
                />
              </InputGroup>
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
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <HStack w="100%">
              <Button
                colorScheme="orange"
                leftIcon={<FaSave />}
                onClick={() => handleConfirmarRemocaoJogo()}
                w="50%"
                isDisabled={jogoEdicao.id === 0}
              >
                Remover Jogo
              </Button>
              <Button
                colorScheme="green"
                leftIcon={<FaSave />}
                onClick={() => handleSalvarJogo()}
                w="50%"
              >
                Salvar Jogo
              </Button>
            </HStack>
          </DrawerFooter>
        </>
      );
    };

    const renderDrawerConfiguracao = () => {
      return (
        <>
          <DrawerCloseButton />
          <DrawerHeader>Configurações do Desafio</DrawerHeader>
          <DrawerBody>
            <VStack alignItems="flex-start">
              <FormControl w="100%" mb="10px">
                <FormLabel>Quantidade de Jogos do Desafio:</FormLabel>
                <InputGroup>
                  <NumberInput
                    w="100%"
                    value={configuracoesDesafio.qtdJogos}
                    min={1}
                    max={10}
                    onChange={(value) =>
                      setConfiguracoesDesafio({
                        ...configuracoesDesafio,
                        qtdJogos: +value,
                      })
                    }
                  >
                    <NumberInputField placeholder="Quantidade de Jogos do Desafio" />
                  </NumberInput>
                  <InputRightAddon
                    fontSize="10px"
                    textTransform="uppercase"
                    children="Max 10"
                  />
                </InputGroup>
              </FormControl>
              <FormControl w="100%">
                <FormLabel>Quantidade de Partidas do Desafio:</FormLabel>
                <InputGroup>
                  <NumberInput
                    w="100%"
                    value={configuracoesDesafio.qtdPartidas}
                    min={1}
                    max={10}
                    onChange={(value) =>
                      setConfiguracoesDesafio({
                        ...configuracoesDesafio,
                        qtdPartidas: +value,
                      })
                    }
                  >
                    <NumberInputField placeholder="Quantidade de Partidas do Desafio" />
                  </NumberInput>
                  <InputRightAddon
                    fontSize="10px"
                    textTransform="uppercase"
                    children="Max 10"
                  />
                </InputGroup>
              </FormControl>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <HStack w="100%" justifyContent="flex-end">
              <Button
                colorScheme="green"
                leftIcon={<FaSave />}
                onClick={() => handleConfirmaSalvarConfiguracoes()}
                w={{ md: "50%", sm: "100%" }}
              >
                Salvar Configurações
              </Button>
            </HStack>
          </DrawerFooter>
        </>
      );
    };

    return drawerEdicaoJogo ? renderDrawerEdicao() : renderDrawerConfiguracao();
  };

  // renderização da listagem de jogos
  const ListagemJogos = useMemo(() => {
    // render dos meeples de número de partidas
    const NumeroPartidas = (partidas) => {
      let partidasTotaisMontadas = Array.from(
        { length: partidasTotais },
        (v, k) => k + 1
      );
      let partidasJogadas = partidasTotaisMontadas.map((item, index) => {
        return (
          <Text
            color={index + 1 <= partidas ? "green.500" : "#DDDDDD22"}
            key={item}
          >
            <GiMeeple />
          </Text>
        );
      });
      return <>{partidasJogadas}</>;
    };
    // render listagem de categorias
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
      jogosListados.slice(0, jogosTotais).map((item, index) => {
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
                {item.partidas === partidasTotais ? (
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
                        isDisabled={item.partidas >= partidasTotais}
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
  }, [jogosListados, categoriaListagem, showHUD, partidasTotais, jogosTotais]);

  // renderização geral
  return (
    <>
      {modalRemoverJogo || modalSalvarConfiguracoes ? (
        <Modal
          isOpen={isOpen}
          onClose={handleFecharModal}
          motionPreset="slideInBottom"
          isCentered
        >
          <ModalOverlay
            onClick={() => {
              handleFecharModal;
              onClose();
            }}
          />
          <ModalContent>{ModalDesafio()}</ModalContent>
        </Modal>
      ) : (
        ""
      )}

      {drawerEdicaoJogo || drawerConfiguracaoDesafio ? (
        <Drawer
          isOpen={isOpen}
          onClose={handleFecharDrawer}
          placement="right"
          size="lg"
        >
          <DrawerOverlay onClick={handleFecharDrawer} />
          <DrawerContent>{DrawerDesafio()}</DrawerContent>
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
              Desafio {jogosTotais}x{partidasTotais}
            </Heading>
            <Popover placement="bottom">{Informacoes("desafio10x10")}</Popover>
          </Flex>
          <Flex alignItems="center" justifyContent="flex-end" w="40%">
            <ButtonGroup>
              <Flex>
                <IconButton
                  aria-label="Adicionar Jogo"
                  icon={showHUD ? <FaEyeSlash /> : <FaEye />}
                  colorScheme="gray"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowHUD(!showHUD)}
                />
              </Flex>
              <Flex>
                <IconButton
                  display={{ md: "none", sm: "flex" }}
                  aria-label="Configurações do Desafio"
                  icon={<FaCog />}
                  colorScheme="gray"
                  size="sm"
                  onClick={() => handleAbrirConfiguracaoDesafio()}
                />
                <Button
                  display={{ md: "flex", sm: "none" }}
                  leftIcon={<FaCog />}
                  colorScheme="gray"
                  size="sm"
                  onClick={() => handleAbrirConfiguracaoDesafio()}
                >
                  Configurações
                </Button>
              </Flex>
              <Flex>
                <ButtonGroup size="sm" isAttached>
                  <Button
                    display={{ md: "block", sm: "none" }}
                    size="sm"
                    isDisabled
                  >
                    {jogosListados.length}/{jogosTotais}
                  </Button>
                  <IconButton
                    display={{ md: "none", sm: "flex" }}
                    aria-label="Adicionar Jogo"
                    icon={<FaPlus />}
                    colorScheme="blue"
                    size="sm"
                    onClick={() => handleAbrirEdicaoJogo()}
                    isDisabled={jogosListados.length >= jogosTotais}
                  />
                  <Button
                    display={{ md: "flex", sm: "none" }}
                    leftIcon={<FaPlus />}
                    colorScheme="blue"
                    size="sm"
                    onClick={() => handleAbrirEdicaoJogo()}
                    isDisabled={jogosListados.length >= jogosTotais}
                  >
                    Adicionar Jogo
                  </Button>
                </ButtonGroup>
              </Flex>
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
