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
import { ListagemJogosProvider } from '../context/ListagemJogosContext';
import { ListagemCategoriasProvider } from '../context/ListagemCategoriaContext';
import { ConfiguracoesProvider } from '../context/ConfiguracoesContext';
import { EdicaoJogoProvider } from '../context/EdicaoJogoContext';

export default function App({ Component, pageProps }: any) {
  return (
    <ChakraProvider resetCSS={true} theme={CustomTheme}>
      <Head>
        <title>Boardgame {'<3'}</title>
      </Head>
      <Header />
      <ListagemJogosProvider>
        <ListagemCategoriasProvider>
          <ConfiguracoesProvider>
            <EdicaoJogoProvider>
              <Container as="main" m="0" p="0 20px" maxW="100%">
                <Component {...pageProps} />
              </Container>
            </EdicaoJogoProvider>
          </ConfiguracoesProvider>
        </ListagemCategoriasProvider>
      </ListagemJogosProvider>
      <Footer version={'Version 0.1.2 B'} />
    </ChakraProvider>
  );
}
