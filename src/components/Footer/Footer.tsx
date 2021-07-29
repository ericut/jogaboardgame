import { Text, Flex, HStack } from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

interface IFooterProps {
  version?: string;
}

const Footer = ({ version }: IFooterProps) => {
  const redesSociais = [
    {
      nome: 'GitHub',
      link: 'https://github.com/ericut/',
      icone: <FaGithub />,
    },
    {
      nome: 'LinkedIn',
      link: 'https://www.linkedin.com/in/ericfrankli/',
      icone: <FaLinkedin />,
    },
    {
      nome: 'Instagram',
      link: 'https://www.instagram.com/ericfrankli/',
      icone: <FaInstagram />,
    },
  ];

  return (
    <Flex as="footer" alignItems="center" flexDirection="column" p="40px 20px">
      <Flex>
        <HStack pb="20px">
          {redesSociais.map((item) => {
            return (
              <a key={item.nome} className="socialIcons" href={item.link} target="_blank">
                <Text fontSize="24px">{item.icone}</Text>
              </a>
            );
          })}
        </HStack>
      </Flex>
      <Flex fontSize="9px" letterSpacing="1.2px" textTransform="uppercase" color="gray.400">
        Feito em NextJS & ChakraUi
        <Text color="red" p="0 5px">
          ❤
        </Text>
        <Text pr="3px">por</Text>
        <a className="socialIcons" href="https://github.com/ericut/boardgame10" target="_blank">
          Eric Frank Li
        </a>
      </Flex>
      {version ? (
        <Flex pt="10px" fontSize="8px" opacity="0.5" textTransform="uppercase" letterSpacing="2px">
          {version}
        </Flex>
      ) : (
        ' '
      )}
    </Flex>
  );
};

export default Footer;
