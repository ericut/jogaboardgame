import { useMemo, useState, useEffect, useContext } from 'react';
// chakra
import {
  Text,
  Button,
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
  useDisclosure,
} from '@chakra-ui/react';
import {
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

const Drawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // renderização drawer de edição e adição de jogo // configurações do desafio
  const DrawerDesafio = () => {
    // controle salvar configurações
    function handleConfirmaSalvarConfiguracoes() {
      if (configuracoesDesafio.qtdJogos !== jogosTotais || configuracoesDesafio.qtdPartidas !== partidasTotais) {
        setModalSalvarConfiguracoes(true);
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
              <Button colorScheme="green" leftIcon={<FaSave />} onClick={() => handleSalvarJogo()} w="50%">
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

  return (
    <>
      {drawerEdicaoJogo || drawerConfiguracaoDesafio ? (
        <Drawer isOpen={isOpen} onClose={handleFecharDrawer} placement="right" size="lg">
          <DrawerOverlay onClick={handleFecharDrawer} />
          <DrawerContent>{DrawerDesafio()}</DrawerContent>
        </Drawer>
      ) : (
        ''
      )}
    </>
  );
};

export default Drawer;
