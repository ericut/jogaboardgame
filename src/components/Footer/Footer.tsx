import { Text, Flex, Icon, HStack } from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const redesSociais = [
    {
      nome: "GitHub",
      link: "https://github.com/ericut/",
      icone: <FaGithub />,
    },
    {
      nome: "LinkedIn",
      link: "https://www.linkedin.com/in/ericfrankli/",
      icone: <FaLinkedin />,
    },
    {
      nome: "Instagram",
      link: "https://www.instagram.com/ericfrankli/",
      icone: <FaInstagram />,
    },
  ];

  return (
    <Flex as="footer" alignItems="center" flexDirection="column" p="40px 20px">
      <Flex>
        <HStack pb="20px">
          {redesSociais.map((item) => {
            return (
              <a className="socialIcons" href={item.link} target="_blank">
                <Text fontSize="24px">{item.icone}</Text>
              </a>
            );
          })}
        </HStack>
      </Flex>
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
        <Text pr="3px">por</Text>
        <a
          className="socialIcons"
          href="https://github.com/ericut/boardgame10"
          target="_blank"
        >
          Eric Li
        </a>
      </Flex>
    </Flex>
  );
};

export default Footer;
