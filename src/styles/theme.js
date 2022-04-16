import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    gray: {
      900: "#101023",
      800: "#1f2029",
      700: "#353646",
      600: "#484d63",
      500: "#616488",
      400: "#797d9a",
      300: "#9699bb",
      200: "#b3b5c6",
      100: "#D1D2DD",
      50: "#EEEEF2",
    },
  },
  fonts: {
    heading: "Roboto",
    body: "Roboto",
  },
  styles: {
    global: {
      body: {
        bg: "gray.900",
        color: "gray.50",
      },
    },
  },
});
