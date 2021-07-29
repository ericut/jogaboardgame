import { ReactNode, createContext, useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
// chakra
import {
  Button,
  HStack,
  VStack,
  Text,
  Input,
  InputGroup,
  InputRightAddon,
  NumberInput,
  NumberInputField,
  Stack,
  useDisclosure,
  useToast,
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
import { FaSave, FaTrash } from 'react-icons/fa';
// interfaces
import { IJogosProps } from '../interfaces';
// context
import { ListagemJogosContext } from './ListagemJogosContext';
import { ListagemCategoriasContext } from './ListagemCategoriaContext';
import { ConfiguracoesContext } from './ConfiguracoesContext';

interface IEdicaoJogoContextData {
  jogoEdicao: IJogosProps;
  setJogoEdicao: (object: IJogosProps) => void;
  handleSalvarJogo: () => void;
  handleRemoverJogo: () => void;
  handleAbrirEdicaoJogo: (object?: IJogosProps) => void;
}

interface IEdicaoJogoProviderProps {
  children: ReactNode;
}

export const EdicaoJogoContext = createContext({} as IEdicaoJogoContextData);

export function EdicaoJogoProvider({ children }: IEdicaoJogoProviderProps) {
  // hooks chakra
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // contexts
  const { listagemJogosData, setListagemJogosData, localStorageSetListagem } = useContext(ListagemJogosContext);
  const { listagemCategoriasData } = useContext(ListagemCategoriasContext);
  const { partidasTotais } = useContext(ConfiguracoesContext);
  // drawers && modals
  const [drawerEdicaoJogo, setDrawerEdicaoJogo] = useState(false);
  const [modalRemoverJogo, setModalRemoverJogo] = useState(false);

  const [jogoEdicao, setJogoEdicao] = useState<IJogosProps>({
    id: 0,
    nome: '',
    partidas: '',
    categoria: [],
  });

  function handleAbrirEdicaoJogo(item?: IJogosProps) {
    onOpen();
    setDrawerEdicaoJogo(true);
    if (item) {
      setJogoEdicao(item);
    } else {
      return;
    }
  }

  // controle checkbox das categorias
  function handleEditarCategorias(event: any) {
    let value = +event.target.value;
    let checked = event.target.checked;
    let categorias = jogoEdicao ? jogoEdicao.categoria : [];
    if (checked) {
      setJogoEdicao({ ...jogoEdicao, categoria: categorias.concat([value]) });
    } else {
      setJogoEdicao({
        ...jogoEdicao,
        categoria: categorias.filter((item) => item !== value),
      });
    }
  }

  function handleSalvarJogo() {
    let jogoExistente = listagemJogosData.find((item) => item.id === jogoEdicao.id);
    if (jogoExistente) {
      setListagemJogosData(
        listagemJogosData.map((item) => {
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
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      if (jogoEdicao.nome !== '') {
        jogoEdicao.id = uuidv4();
        jogoEdicao.partidas = jogoEdicao.partidas ? jogoEdicao.partidas : 0;
        setListagemJogosData([...listagemJogosData, jogoEdicao]);
        toast({
          title: `Jogo adicionado: ${jogoEdicao.nome}`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Insira o nome do jogo para salvar!',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
      }
    }
    handleFecharDrawer();
  }

  function handleConfirmarRemocaoJogo() {
    setModalRemoverJogo(true);
  }

  function handleRemoverJogo() {
    setListagemJogosData(listagemJogosData.filter((item) => item.id !== jogoEdicao.id));
    localStorageSetListagem();
    handleFecharModal();
    handleFecharDrawer();
  }

  function handleFecharModal() {
    setModalRemoverJogo(false);
  }

  function handleFecharDrawer() {
    setDrawerEdicaoJogo(false);
    onClose();
    setJogoEdicao({
      id: 0,
      nome: '',
      partidas: '',
      categoria: [],
    });
  }

  //
  //
  // renders
  const ModalEdicaoJogo = () => {
    return (
      <Modal isOpen={isOpen} onClose={handleFecharModal} motionPreset="slideInBottom" isCentered>
        <ModalOverlay
          onClick={() => {
            handleFecharModal;
            onClose();
          }}
        />
        <ModalContent>
          <ModalHeader>Remover Jogo da Lista</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Deseja remover este jogo da sua lista?</Text>
            <Text fontWeight="bold">{jogoEdicao.nome}</Text>
          </ModalBody>
          <ModalFooter>
            <HStack w="100%">
              <Button variant="outline" colorScheme="orange" w="50%" onClick={() => handleRemoverJogo()}>
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

  const DrawerEdicaoJogo = () => {
    return (
      <Drawer isOpen={isOpen} onClose={handleFecharDrawer} placement="right" size="lg">
        <DrawerOverlay onClick={handleFecharDrawer} />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{jogoEdicao.id === 0 ? 'Adicionar' : 'Editar'} Jogo</DrawerHeader>
          <DrawerBody>
            <VStack>
              <Input
                placeholder="Nome do Jogo"
                value={jogoEdicao.nome}
                onChange={(event) => setJogoEdicao({ ...jogoEdicao, nome: event.target.value })}
              />
              <InputGroup>
                <NumberInput
                  w="100%"
                  value={jogoEdicao.partidas}
                  min={0}
                  max={partidasTotais}
                  onChange={(value) => setJogoEdicao({ ...jogoEdicao, partidas: +value })}
                >
                  <NumberInputField placeholder="Número de Partidas Iniciais" />
                </NumberInput>
                <InputRightAddon fontSize="10px" textTransform="uppercase" children={`Max ${partidasTotais}`} />
              </InputGroup>
              <Stack w="100%" shouldWrapChildren={true}>
                <Text mt="10px">Categorias:</Text>
                <>
                  {listagemCategoriasData.map((item) => {
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
                leftIcon={<FaTrash />}
                onClick={() => handleConfirmarRemocaoJogo()}
                w="50%"
                isDisabled={jogoEdicao.id === 0}
              >
                Remover Jogo
              </Button>
              <Button colorScheme="green" leftIcon={<FaSave />} onClick={() => handleSalvarJogo()} w="50%">
                Salvar Jogo
              </Button>
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  };

  return (
    <EdicaoJogoContext.Provider
      value={{ jogoEdicao, setJogoEdicao, handleSalvarJogo, handleRemoverJogo, handleAbrirEdicaoJogo }}
    >
      {children}
      {modalRemoverJogo && ModalEdicaoJogo()}
      {drawerEdicaoJogo && DrawerEdicaoJogo()}
    </EdicaoJogoContext.Provider>
  );
}
