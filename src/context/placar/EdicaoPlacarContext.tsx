import { ReactNode, createContext, useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
// chakra
import {
  Button,
  HStack,
  VStack,
  Text,
  Flex,
  Box,
  Input,
  InputGroup,
  InputRightAddon,
  NumberInput,
  NumberInputField,
  Stack,
  useDisclosure,
  useToast,
  IconButton,
  Checkbox,
} from '@chakra-ui/react';
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
} from '@chakra-ui/react';
// icones
import { FaSave, FaTrash, FaPlus, FaCircle, FaHistory } from 'react-icons/fa';
// utilitários
import { novaData, formatarData } from '../../utils/formatarData';
// interfaces
import { IPlacaresProps } from '../../interfaces/placar';
// context
import { ListagemPlacaresContext } from './ListagemPlacaresContext';

interface IEdicaoPlacarContextData {
  handleAbrirEdicaoPlacar: (object?: IPlacaresProps) => void;
}

interface IEdicaoPlacarProviderProps {
  children: ReactNode;
}

export const EdicaoPlacarContext = createContext({} as IEdicaoPlacarContextData);

export function EdicaoPlacarProvider({ children }: IEdicaoPlacarProviderProps) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { listagemPlacaresData, setListagemPlacaresData, localStorageSetListagemPlacares } =
    useContext(ListagemPlacaresContext);
  const [drawerEdicaoPlacar, setDrawerEdicaoPlacar] = useState(false);
  const [modalRemoverPlacar, setModalRemoverPlacar] = useState(false);
  const [modalFinalizarPlacar, setModalFinalizarPlacar] = useState(false);
  const [modalReativarPlacar, setModalReativarPlacar] = useState(false);
  const [placarEdicao, setPlacarEdicao] = useState<IPlacaresProps>({
    id: '0',
    nome: '',
    jogo: '',
    jogadores: [],
    status: 'Ativo',
    partidas: 0,
    data_inicio: novaData(),
    data_fim: '',
  });
  const [jogadorAdicionar, setJogadorAdicionar] = useState('');

  function handleAbrirEdicaoPlacar(item?: IPlacaresProps) {
    onOpen();
    setDrawerEdicaoPlacar(true);
    if (item) {
      setPlacarEdicao(item);
    } else {
      return;
    }
  }

  function handleSalvarPlacar() {
    if (jogadorAdicionar === '') {
      let placarExistente = listagemPlacaresData.find((item) => item.id === placarEdicao.id);
      if (placarExistente) {
        setListagemPlacaresData(
          listagemPlacaresData.map((item) => {
            if (item.id === placarEdicao.id) {
              item.nome = placarEdicao.nome;
              item.jogo = placarEdicao.jogo;
              item.jogadores = placarEdicao.jogadores;
              item.status = placarEdicao.status;
              item.partidas = placarEdicao.partidas;
              item.data_inicio = placarEdicao.data_inicio;
              item.data_fim = placarEdicao.data_fim;
            }
            return item;
          })
        );
        toast({
          title: `Placar atualizado: ${placarEdicao.nome}`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        handleFecharDrawer();
      } else {
        if (placarEdicao.nome !== '' && placarEdicao.jogo !== '') {
          placarEdicao.id = uuidv4();
          let listagemPlacarDataFinalizados = listagemPlacaresData.map((item) => {
            item.status = 'Finalizado';
            return item;
          });
          setListagemPlacaresData([...listagemPlacarDataFinalizados, placarEdicao]);
          toast({
            title: `Placar adicionado: ${placarEdicao.nome}`,
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          handleFecharDrawer();
        } else {
          let toastMensagemValidacao = '';
          if (placarEdicao.nome === '') {
            toastMensagemValidacao = 'Insira o nome do placar para salvar!';
          } else if (placarEdicao.jogo === '') {
            toastMensagemValidacao = 'Insira um jogo no placar para salvar!';
          }
          toast({
            title: toastMensagemValidacao,
            status: 'warning',
            duration: 3000,
            isClosable: true,
          });
        }
      }
    } else {
      toast({
        title: 'Existe um jogador para ser adicionado.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  }

  function handleConfirmarRemocaoPlacar() {
    setModalRemoverPlacar(true);
  }

  function handleRemoverPlacar() {
    setListagemPlacaresData(listagemPlacaresData.filter((item) => item.id !== placarEdicao.id));
    localStorageSetListagemPlacares();
    handleFecharModal();
    handleFecharDrawer();
  }

  function handleConfirmarFinalizarPlacar() {
    setModalFinalizarPlacar(true);
  }

  function handleFinalizarPlacar() {
    let placarExistente = listagemPlacaresData.find((item) => item.id === placarEdicao.id);
    if (placarExistente) {
      setListagemPlacaresData(
        listagemPlacaresData.map((item) => {
          if (item.id === placarEdicao.id) {
            item.status = 'Finalizado';
            item.data_fim = novaData();
          }
          return item;
        })
      );
      toast({
        title: `Placar finalizado: ${placarEdicao.nome}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
    // localStorageSetListagemPlacares();
    handleFecharModal();
    handleFecharDrawer();
  }

  function handleConfirmarReativarPlacar() {
    setModalReativarPlacar(true);
  }

  function handleReativarPlacar() {
    let placarExistente = listagemPlacaresData.find((item) => item.id === placarEdicao.id);
    if (placarExistente) {
      setListagemPlacaresData(
        listagemPlacaresData.map((item) => {
          item.status = 'Finalizado';
          if (item.data_fim === '') {
            item.data_fim = novaData();
          }
          if (item.id === placarEdicao.id) {
            item.status = 'Ativo';
            item.data_fim = '';
          }
          return item;
        })
      );
      toast({
        title: `Placar reaberto: ${placarEdicao.nome}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
    handleFecharModal();
    handleFecharDrawer();
  }

  function handleFecharModal() {
    setModalRemoverPlacar(false);
    setModalFinalizarPlacar(false);
    setModalReativarPlacar(false);
  }

  function handleFecharDrawer() {
    setDrawerEdicaoPlacar(false);
    onClose();
    setPlacarEdicao({
      id: '0',
      nome: '',
      jogo: '',
      jogadores: [],
      status: 'Ativo',
      partidas: 0,
      data_inicio: novaData(),
      data_fim: '',
    });
    setJogadorAdicionar('');
  }

  function handleAdicionarJogador() {
    let jogadoresExistentes = placarEdicao ? placarEdicao.jogadores : [];
    if (jogadorAdicionar) {
      setPlacarEdicao({ ...placarEdicao, jogadores: jogadoresExistentes.concat([jogadorAdicionar]) });
      toast({
        title: `Jogador adicionado: ${jogadorAdicionar}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setJogadorAdicionar('');
    } else {
      toast({
        title: 'Insira o nome de um jogador!',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  }

  function handleRemoverJogador(jogador: string, index: number) {
    let jogadoresExistentes = placarEdicao ? placarEdicao.jogadores : [];
    setPlacarEdicao({
      ...placarEdicao,
      jogadores: jogadoresExistentes.filter((item, filteredIndex) => {
        return filteredIndex !== index;
      }),
    });
    toast({
      title: `Jogador ${jogador} removido!`,
      status: 'warning',
      duration: 3000,
      isClosable: true,
    });
  }

  const ModalEdicaoPlacar = () => {
    return (
      <Modal isOpen={isOpen} onClose={handleFecharModal} motionPreset="slideInBottom" isCentered>
        <ModalOverlay
          onClick={() => {
            handleFecharModal;
            onClose();
          }}
        />
        <ModalContent>
          <ModalHeader>Apagar Placar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Deseja apagar este placar?</Text>
            <Text fontWeight="bold">{placarEdicao.nome}</Text>
          </ModalBody>
          <ModalFooter>
            <HStack w="100%">
              <Button variant="outline" colorScheme="orange" w="50%" onClick={() => handleRemoverPlacar()}>
                Confirmar
              </Button>
              <Button colorScheme="blue" w="50%" onClick={() => handleFecharModal()}>
                Cancelar
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  const ModalFinalizarPlacar = () => {
    return (
      <Modal isOpen={isOpen} onClose={handleFecharModal} motionPreset="slideInBottom" isCentered>
        <ModalOverlay
          onClick={() => {
            handleFecharModal;
            onClose();
          }}
        />
        <ModalContent>
          <ModalHeader>Finalizar Placar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Deseja finalizar este placar?</Text>
            <Text fontWeight="bold">{placarEdicao.nome}</Text>
          </ModalBody>
          <ModalFooter>
            <HStack w="100%">
              <Button variant="outline" colorScheme="orange" w="50%" onClick={() => handleFinalizarPlacar()}>
                Confirmar
              </Button>
              <Button colorScheme="blue" w="50%" onClick={() => handleFecharModal()}>
                Cancelar
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  const ModalReativarPlacar = () => {
    return (
      <Modal isOpen={isOpen} onClose={handleFecharModal} motionPreset="slideInBottom" isCentered>
        <ModalOverlay
          onClick={() => {
            handleFecharModal;
            onClose();
          }}
        />
        <ModalContent>
          <ModalHeader>Reativar Placar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Deseja reativar este placar?</Text>
            <Text fontWeight="bold">{placarEdicao.nome}</Text>
          </ModalBody>
          <ModalFooter>
            <HStack w="100%">
              <Button variant="outline" colorScheme="orange" w="50%" onClick={() => handleReativarPlacar()}>
                Confirmar
              </Button>
              <Button colorScheme="blue" w="50%" onClick={() => handleFecharModal()}>
                Cancelar
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  const DrawerEdicaoPlacar = () => {
    return (
      <Drawer isOpen={isOpen} onClose={handleFecharDrawer} placement="right" size="lg">
        <DrawerOverlay onClick={handleFecharDrawer} />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{placarEdicao.id === 0 ? 'Criar' : 'Editar'} Placar</DrawerHeader>
          <DrawerBody>
            <VStack spacing={5}>
              <Flex w="100%">
                <Input
                  placeholder="Nome do Placar"
                  value={placarEdicao.nome}
                  onChange={(event) => setPlacarEdicao({ ...placarEdicao, nome: event.target.value })}
                />
              </Flex>
              <Flex w="100%">
                <Input
                  placeholder="Nome do Jogo"
                  value={placarEdicao.jogo}
                  onChange={(event) => setPlacarEdicao({ ...placarEdicao, jogo: event.target.value })}
                />
              </Flex>
              <Flex w="100%" justifyContent="space-between" px="5px">
                <Box w="35%">
                  <Text fontSize="14px">Criado em:</Text>
                  <Button size="sm" isDisabled>
                    {formatarData(placarEdicao.data_inicio)}
                  </Button>
                </Box>
                <Box w="35%">
                  <Text fontSize="14px">{placarEdicao.data_fim ? 'Finalizado em:' : 'Finalizar:'}</Text>
                  <Flex>
                    {placarEdicao.status === 'Finalizado' ? (
                      <Flex>
                        <Button size="sm" mr="5px" isDisabled>
                          {placarEdicao.data_fim ? formatarData(placarEdicao.data_fim) : ''}
                        </Button>
                        <IconButton
                          size="sm"
                          variant="ghost"
                          colorScheme="blue"
                          aria-label="Reativar Placar"
                          icon={<FaHistory />}
                          onClick={() => handleConfirmarReativarPlacar()}
                        />
                      </Flex>
                    ) : (
                      <Button
                        size="sm"
                        colorScheme="orange"
                        variant="outline"
                        onClick={() => handleConfirmarFinalizarPlacar()}
                      >
                        Finalizar Placar
                      </Button>
                    )}
                  </Flex>
                </Box>
                <Box w="30%">
                  <Text fontSize="14px">Status:</Text>
                  <Flex alignItems="center">
                    <Text fontSize="12px" mr="5px" color={placarEdicao.status === 'Ativo' ? 'green.500' : 'orange.500'}>
                      <FaCircle />
                    </Text>
                    <Flex alignItems="center" h="32px">
                      {placarEdicao.status}
                    </Flex>
                  </Flex>
                </Box>
              </Flex>
              <Box w="100%">
                <Flex mb="5px">
                  <Input
                    placeholder="Adicionar Jogador"
                    value={jogadorAdicionar}
                    onChange={(event) => setJogadorAdicionar(event.target.value)}
                    mr="10px"
                  />
                  <IconButton
                    colorScheme="blue"
                    aria-label="Adicionar Jogo"
                    icon={<FaPlus />}
                    onClick={() => handleAdicionarJogador()}
                  />
                </Flex>
                <Box w="100%" borderBottom="1px solid" borderBottomColor="gray.500">
                  {placarEdicao.jogadores.map((jogador, index) => {
                    return (
                      <Flex
                        key={jogador}
                        borderBottom="1px solid"
                        borderBottomColor="gray.600"
                        w="100%"
                        p="5px"
                        justifyContent="space-between"
                      >
                        <Text>{jogador}</Text>
                        <Text>
                          <IconButton
                            size="sm"
                            variant="ghost"
                            colorScheme="red"
                            aria-label="Excluir Jogador"
                            icon={<FaTrash />}
                            onClick={() => handleRemoverJogador(jogador, index)}
                          />
                        </Text>
                      </Flex>
                    );
                  })}
                </Box>
              </Box>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <HStack w="100%" justifyContent="flex-end">
              <Button
                colorScheme="orange"
                leftIcon={<FaTrash />}
                onClick={() => handleConfirmarRemocaoPlacar()}
                w="50%"
                isDisabled={placarEdicao.id === 0}
              >
                Apagar Placar
              </Button>
              <Button colorScheme="green" leftIcon={<FaSave />} onClick={() => handleSalvarPlacar()} w="50%">
                Salvar Placar
              </Button>
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  };

  return (
    <EdicaoPlacarContext.Provider value={{ handleAbrirEdicaoPlacar }}>
      {children}
      {modalReativarPlacar && ModalReativarPlacar()}
      {modalFinalizarPlacar && ModalFinalizarPlacar()}
      {modalRemoverPlacar && ModalEdicaoPlacar()}
      {drawerEdicaoPlacar && DrawerEdicaoPlacar()}
    </EdicaoPlacarContext.Provider>
  );
}
