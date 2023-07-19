import { extendTheme, type ThemeConfig, ChakraTheme } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const colors = {
  brand: {
    900: "#ff9900",
  },
};

const theme = extendTheme({
  config,
  colors,
} as Partial<ChakraTheme>) as ChakraTheme;

export default theme;
