import '@fontsource/montserrat';
import '@fontsource/roboto';

// chakra
import { ChakraProvider } from '@chakra-ui/react';
import { Container } from '@chakra-ui/react';
// next
import Head from 'next/head';
import CustomTheme from '../theme/theme';
// components
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export default function App({ Component, pageProps }: any) {
  return (
    <ChakraProvider resetCSS={true} theme={CustomTheme}>
      <Head>
        <title>Joga BG {'<3'}</title>
      </Head>
      <Header />
      <Container as="main" m="0" p="0 20px" maxW="100%">
        <Component {...pageProps} />
      </Container>
      <Footer version={'Versão 0.2.7'} />
    </ChakraProvider>
  );
}
