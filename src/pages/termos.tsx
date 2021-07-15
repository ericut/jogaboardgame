import { Flex, Heading, Text } from "@chakra-ui/react";

const TermosDeUso = () => {
  return (
    <Flex
      w={{ lg: "1300px", md: "100%", sm: "100%" }}
      maxW="100%"
      minH="60vh"
      // alignItems="center"
      flexDirection="column"
      py={{ md: "20px", sm: "10px" }}
      m="0 auto"
      textAlign="left"
    >
      <Flex justifyContent="space-between" align="center" w="100%">
        <Flex alignItems="center" w="60%">
          <Heading fontWeight="bold" fontSize={{ md: "32px", sm: "20px" }}>
            Termos de Uso
          </Heading>
        </Flex>
      </Flex>
      <Flex mt={{ md: "40px", sm: "10px" }} w="100%" flexDirection="column">
        <Text pb="10px">
          Esta aplicação utiliza "localStorage" do navegador para armezenar
          todos os dados cadastrados.
          <br />
          Estes dados podem ser perdidos caso o usuário limpe o cache ou o
          armazenamento local do navegador.
        </Text>
        <Text pb="10px">
          Esta aplicação possui código aberto, com repositório no Github do seu
          criador, e sua utilização é gratuíta e livre de licença.
        </Text>
        <a
          className="socialIcons"
          href="https://github.com/ericut/boardgame10"
          target="_blank"
        >
          • Link do repositório
        </a>
      </Flex>
    </Flex>
  );
};

export default TermosDeUso;
