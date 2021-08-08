import { extendTheme, ThemeConfig } from '@chakra-ui/react';

import colors from './foundations/colors';
import breakpoints from './foundations/breakpoints';

const config: ThemeConfig = {
  initialColorMode: 'dark',
};

const CustomTheme = extendTheme({
  styles: {
    global: {
      a: {
        _hover: {
          textDecoration: 'underline',
        },
      },
      '.socialIcons': {
        transition: '0.5s all',
        _hover: {
          color: 'blue.500',
        },
      },
    },
  },
  fonts: {
    heading: 'Montserrat',
    body: 'Roboto',
  },
  config,
  colors,
  breakpoints,
});

export default CustomTheme;
