// chakra
import { ChakraProvider } from '@chakra-ui/react';
import { Container } from '@chakra-ui/react';
// next
import Head from 'next/head';
import CustomTheme from '../theme/theme';
// components
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
// context
import { ConfiguracoesProvider } from '../context/ConfiguracoesContext';
import { ListagemJogosProvider } from '../context/ListagemJogosContext';
import { EdicaoJogoProvider } from '../context/EdicaoJogoContext';

export default function App({ Component, pageProps }: any) {
  return (
    <ChakraProvider resetCSS={true} theme={CustomTheme}>
      <Head>
        <title>Boardgame {'<3'}</title>
      </Head>
      <Header />
      <ListagemJogosProvider>
        <ConfiguracoesProvider>
          <EdicaoJogoProvider>
            <Container as="main" m="0" p="0 20px" maxW="100%">
              <Component {...pageProps} />
            </Container>
          </EdicaoJogoProvider>
        </ConfiguracoesProvider>
      </ListagemJogosProvider>
      <Footer />
    </ChakraProvider>
  );
}
