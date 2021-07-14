import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HStack,
  VStack,
  Flex,
  Button,
  IconButton,
  useColorMode,
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { BiMenu, BiMoon, BiSun } from "react-icons/bi";

import Logo from "./Logo/bg10_logo.svg";
import LogoWhite from "./Logo/bg10_logo_white.svg";

const Header = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const MenuBGColor = useColorModeValue("gray.100", "gray.700");

  // function handleLimparDados() {
  //   localStorage.removeItem("listagemJogos");
  // }

  const MenuItens = () => {
    return (
      <>
        <Link href="/desafio10x10" passHref>
          <Button variant="ghost">Desafio 10x10</Button>
        </Link>
        {/* <Link href="/pontuacoes">
          <Button variant="ghost">Pontuações</Button>
        </Link> */}
      </>
    );
  };

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack justifyContent="" alignItems="">
              <MenuItens />
              {/* <Flex pt="100px" w="100%">
                <Button
                  variant="outline"
                  colorScheme="red"
                  w="100%"
                  onClick={() => handleLimparDados()}
                >
                  Limpar Dados
                </Button>
              </Flex> */}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Flex
        as="header"
        m="0 0 20px"
        p="0 20px"
        maxW="100%"
        justifyContent="center"
        bg={MenuBGColor}
      >
        <Flex
          w={{ lg: "1300px", sm: "100%" }}
          justifyContent="space-between"
          alignItems="center"
          h="90px"
        >
          <Flex w="200px" alignItems="center" cursor="pointer">
            <Link href="/">
              <Image
                src={colorMode === "light" ? Logo : LogoWhite}
                alt="bg10 <3"
              />
            </Link>
          </Flex>
          <Flex>
            <HStack
              alignItems="center"
              display={{ base: "none", md: "inline-flex" }}
            >
              <MenuItens />
            </HStack>
            <IconButton
              icon={colorMode === "light" ? <BiMoon /> : <BiSun />}
              aria-label="Dark/Light Mode"
              onClick={toggleColorMode}
              mx="10px"
            />
            <IconButton
              display={{ base: "flex", md: "none" }}
              aria-label="Open menu"
              fontSize="40px"
              ref={btnRef}
              onClick={onOpen}
              variant="ghost"
              icon={<BiMenu />}
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Header;
