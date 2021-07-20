import { ChakraProvider } from '@chakra-ui/react';
import { Container } from '@chakra-ui/react';
import Head from 'next/head';
import CustomTheme from '../theme/theme';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS={true} theme={CustomTheme}>
      <Head>
        <title>Boardgame {'<3'}</title>
      </Head>
      <Header />
      <Container as="main" m="0" p="0 20px" maxW="100%">
        <Component {...pageProps} />
      </Container>
      <Footer />
    </ChakraProvider>
  );
}
