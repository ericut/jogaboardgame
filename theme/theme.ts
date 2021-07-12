import { extendTheme } from "@chakra-ui/react";

import styles from "./styles";
import colors from "./foundations/colors";
import fonts from "./foundations/fonts";
import breakpoints from "./foundations/breakpoints";

const CustomTheme = extendTheme({
  styles,
  colors,
  fonts,
  breakpoints,
});

export default CustomTheme;
