import { Text, Flex } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex as="footer" justifyContent="center" p="20px 20px">
      <Flex
        fontSize="9px"
        letterSpacing="1.2px"
        textTransform="uppercase"
        color="gray.400"
      >
        Feito em NextJS & ChakraUi
        <Text color="red" p="0 5px">
          ❤
        </Text>
        por Eric Li
      </Flex>
    </Flex>
  );
};

export default Footer;
