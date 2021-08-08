import { ReactNode, createContext, useState, useEffect, useContext, useMemo } from 'react';
// chakra
import {
  Button,
  HStack,
  VStack,
  Text,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightAddon,
  NumberInput,
  NumberInputField,
  useDisclosure,
  useToast,
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
import { FaSave } from 'react-icons/fa';
// interfaces
import { IConfiguracoesProps } from '../../interfaces/desafio10x10';
// service
import Service from './services/desafio10x10';
// context
import { ListagemJogosContext } from './ListagemJogosContext';

interface IConfiguracoesContextData {
  jogosTotais: number;
  partidasTotais: number;
  handleAbrirConfiguracaoDesafio: () => void;
}

interface IConfiguracoesProviderProps {
  children: ReactNode;
}

export const ConfiguracoesContext = createContext({} as IConfiguracoesContextData);

export function ConfiguracoesProvider({ children }: IConfiguracoesProviderProps) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleMudarConfiguracoesListagem } = useContext(ListagemJogosContext);
  const [drawerConfiguracaoDesafio, setDrawerConfiguracaoDesafio] = useState(false);
  const [modalSalvarConfiguracoes, setModalSalvarConfiguracoes] = useState(false);

  const [configuracoesDesafio, setConfiguracoesDesafio] = useState<IConfiguracoesProps>({
    qtdJogos: 10,
    qtdPartidas: 10,
  });
  const [jogosTotais, setJogosTotais] = useState<number>(configuracoesDesafio.qtdJogos);
  const [partidasTotais, setPartidasTotais] = useState<number>(configuracoesDesafio.qtdPartidas);

  useEffect(() => {
    if (!localStorage.getItem('configuracoesDesafio')) {
      Service.buscarConfiguracoes().then((response) => {
        setConfiguracoesDesafio(response.data.content);
      });
    } else {
      let configuracoesRecuperadas = JSON.parse(localStorage.getItem('configuracoesDesafio') || '');
      setConfiguracoesDesafio(configuracoesRecuperadas);
      setJogosTotais(configuracoesRecuperadas.qtdJogos);
      setPartidasTotais(configuracoesRecuperadas.qtdPartidas);
    }
  }, []);

  function handleAbrirConfiguracaoDesafio() {
    onOpen();
    setDrawerConfiguracaoDesafio(true);
  }

  function handleConfirmaSalvarConfiguracoes() {
    if (configuracoesDesafio.qtdJogos !== jogosTotais || configuracoesDesafio.qtdPartidas !== partidasTotais) {
      setModalSalvarConfiguracoes(true);
    }
  }

  function handleSalvarConfiguracoes() {
    handleMudarConfiguracoesListagem(configuracoesDesafio.qtdPartidas);
    localStorage.setItem('configuracoesDesafio', JSON.stringify(configuracoesDesafio));
    setJogosTotais(configuracoesDesafio.qtdJogos);
    setPartidasTotais(configuracoesDesafio.qtdPartidas);
    setModalSalvarConfiguracoes(false);
    onClose();
  }

  function handleFecharModal() {
    setModalSalvarConfiguracoes(false);
  }

  function handleFecharDrawer() {
    if (configuracoesDesafio.qtdJogos !== jogosTotais || configuracoesDesafio.qtdPartidas !== partidasTotais) {
      toast({
        title: 'Você alterou as configurações, salve para continuar.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    } else {
      setDrawerConfiguracaoDesafio(false);
      onClose();
    }
  }

  const DrawerConfiguracoesDesafio = () => {
    return (
      <Drawer isOpen={isOpen} onClose={handleFecharDrawer} placement="right" size="lg">
        <DrawerOverlay onClick={handleFecharDrawer} />
        <DrawerContent>
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
                  <InputRightAddon fontSize="10px" textTransform="uppercase" children="Max 10" />
                </InputGroup>
              </FormControl>
              <FormControl w="100%">
                <FormLabel>Quantidade de Partidas por Jogo:</FormLabel>
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
                  <InputRightAddon fontSize="10px" textTransform="uppercase" children="Max 10" />
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
                w={{ md: '50%', sm: '100%' }}
                isDisabled={
                  configuracoesDesafio.qtdJogos === jogosTotais && configuracoesDesafio.qtdPartidas === partidasTotais
                }
              >
                Salvar Configurações
              </Button>
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  };

  const ModalConfiguracoesDesafio = useMemo(() => {
    return (
      <Modal isOpen={isOpen} onClose={handleFecharModal} motionPreset="slideInBottom" isCentered>
        <ModalOverlay
          onClick={() => {
            handleFecharModal;
            onClose();
          }}
        />
        <ModalContent>
          <ModalHeader>Confirmação da nova configuração</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Deseja salvar estas configurações?</Text>
            <Text fontWeight="bold">Quantidade de Jogos: {configuracoesDesafio.qtdJogos}</Text>
            <Text fontWeight="bold" pb="20px">
              Quantidade de Partidas: {configuracoesDesafio.qtdPartidas}
            </Text>
            <Text color="red.400" fontSize="14px" p="5px" border="1px solid" borderColor="red.400">
              <strong>ATENÇÃO:</strong>
              <br />• Se já tiver partidas computadas excedendo ao novo número de total de partidas, será aplicado o
              novo valor finalizando o desafio do jogo.
              <br />• Se o número de jogos cadastros for maior que de jogos totais do desafio, eles não serão listados
              na listagem.
            </Text>
          </ModalBody>
          <ModalFooter>
            <HStack w="100%">
              <Button variant="outline" colorScheme="green" w="50%" onClick={() => handleSalvarConfiguracoes()}>
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
  }, [modalSalvarConfiguracoes, handleFecharModal]);

  return (
    <ConfiguracoesContext.Provider value={{ jogosTotais, partidasTotais, handleAbrirConfiguracaoDesafio }}>
      {children}
      {modalSalvarConfiguracoes && ModalConfiguracoesDesafio}
      {drawerConfiguracaoDesafio && DrawerConfiguracoesDesafio()}
    </ConfiguracoesContext.Provider>
  );
}
