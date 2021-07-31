import { ReactNode, createContext, useState, useContext } from 'react';
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

  // formatar data
  function novaDataFinal() {
    let novaData = new Date();
    function novaDataAdicionarZero(numero: number) {
      if (numero <= 9) {
        return '0' + numero;
      } else {
        return numero;
      }
    }
    return `${novaData.getFullYear()}-${novaDataAdicionarZero(novaData.getMonth() + 1)}-${novaDataAdicionarZero(
      novaData.getDate()
    )}`;
  }

  const [placarEdicao, setPlacarEdicao] = useState<IPlacaresProps>({
    id: 0,
    nome: '',
    jogos: [],
    jogadores: [],
    status: 'Ativo',
    partidas: 0,
    data_inicio: novaDataFinal(),
    data_fim: '',
  });

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
        setListagemPlacaresData([...listagemPlacaresData, placarEdicao]);
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
      data_inicio: new Date() + '',
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
          <ModalHeader>Remover Jogo da Lista</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Deseja remover este jogo da sua lista?</Text>
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
          <DrawerHeader>{placarEdicao.id === 0 ? 'Adicionar' : 'Editar'} Placar</DrawerHeader>
          <DrawerBody>
            <VStack>
              <Input
                placeholder="Nome do Placar"
                value={placarEdicao.nome}
                onChange={(event) => setPlacarEdicao({ ...placarEdicao, nome: event.target.value })}
              />
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
                Remover Jogo
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
