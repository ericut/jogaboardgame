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
import { FaSave, FaTrash, FaPlus, FaCircle } from 'react-icons/fa';
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
  // hooks chakra
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // contexts
  const { listagemPlacaresData, setListagemPlacaresData, localStorageSetListagemPlacares } =
    useContext(ListagemPlacaresContext);
  // drawers && modals
  const [drawerEdicaoPlacar, setDrawerEdicaoPlacar] = useState(false);
  const [modalRemoverPlacar, setModalRemoverPlacar] = useState(false);

  //
  const [placarEdicao, setPlacarEdicao] = useState<IPlacaresProps>({
    id: 0,
    nome: '',
    jogos: [],
    jogadores: [],
    status: 'Ativo',
    partidas: 0,
    data_inicio: novaData(),
    data_fim: '',
  });
  // campos da edição
  const [jogoAdicionar, setJogoAdicionar] = useState('');
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
    let placarExistente = listagemPlacaresData.find((item) => item.id === placarEdicao.id);
    if (placarExistente) {
      // adicionar regra para trocar placar de ativo / finalizado vice versa
      setListagemPlacaresData(
        listagemPlacaresData.map((item) => {
          if (item.id === placarEdicao.id) {
            item.nome = placarEdicao.nome;
            item.jogos = placarEdicao.jogos;
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
    } else {
      if (placarEdicao.nome !== '') {
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
      } else {
        toast({
          title: 'Insira o nome do placar para salvar!',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
      }
    }
    handleFecharDrawer();
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

  function handleFecharModal() {
    setModalRemoverPlacar(false);
  }

  function handleFecharDrawer() {
    setDrawerEdicaoPlacar(false);
    onClose();
    setPlacarEdicao({
      id: 0,
      nome: '',
      jogos: [],
      jogadores: [],
      status: 'Ativo',
      partidas: 0,
      data_inicio: novaData(),
      data_fim: '',
    });
  }

  //
  //
  // renders
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
              <Flex w="100%" justifyContent="space-between" px="5px">
                <Box w="35%">
                  <Text fontSize="14px">Criado em:</Text>
                  <Button size="sm" isDisabled>
                    {formatarData(placarEdicao.data_inicio)}
                  </Button>
                </Box>
                <Box w="35%">
                  <Text fontSize="14px">{placarEdicao.data_fim ? 'Finalizado em:' : 'Finalizar:'}</Text>
                  <Text>
                    {placarEdicao.data_fim ? (
                      <Button size="sm" isDisabled>
                        {formatarData(placarEdicao.data_fim)}
                      </Button>
                    ) : (
                      <Button size="sm" colorScheme="orange" variant="outline" onClick={() => {}}>
                        Finalizar Placar
                      </Button>
                    )}
                  </Text>
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
                    placeholder="Adicionar Jogo"
                    value={jogoAdicionar}
                    onChange={(event) => setJogoAdicionar(event.target.value)}
                    mr="10px"
                  />
                  <IconButton colorScheme="blue" aria-label="Adicionar Jogo" icon={<FaPlus />} onClick={() => {}} />
                </Flex>
                <Box borderBottom="1px solid" borderBottomColor="gray.500">
                  {placarEdicao.jogos.map((jogo, index) => {
                    return (
                      <Flex
                        borderBottom="1px solid"
                        borderBottomColor="gray.600"
                        w="100%"
                        p="5px"
                        justifyContent="space-between"
                      >
                        <Text>{jogo}</Text>
                        <Text>
                          <IconButton
                            size="sm"
                            variant="ghost"
                            colorScheme="red"
                            aria-label="Excluir Jogo"
                            icon={<FaTrash />}
                            onClick={() => {}}
                          />
                        </Text>
                      </Flex>
                    );
                  })}
                </Box>
              </Box>
              <Box w="100%">
                <Flex mb="5px">
                  <Input
                    placeholder="Adicionar Jogador"
                    value={jogadorAdicionar}
                    onChange={(event) => setJogadorAdicionar(event.target.value)}
                    mr="10px"
                  />
                  <IconButton colorScheme="blue" aria-label="Adicionar Jogo" icon={<FaPlus />} onClick={() => {}} />
                </Flex>
                <Box w="100%" borderBottom="1px solid" borderBottomColor="gray.500">
                  {placarEdicao.jogadores.map((jogador, index) => {
                    return (
                      <Flex
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
                            onClick={() => {}}
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
      {modalRemoverPlacar && ModalEdicaoPlacar()}
      {drawerEdicaoPlacar && DrawerEdicaoPlacar()}
    </EdicaoPlacarContext.Provider>
  );
}
