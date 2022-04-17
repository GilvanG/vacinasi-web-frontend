import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    gray: {
      900: '#2c302e',
      800: '#1f2029',
      700: '#384139',
      600: '#474A48',
      500: '#536754',
      400: '#656565',
      300: '#909590',
      200: '#b3b5c6',
      100: '#D1D2DD',
      50: '#EEEEF2',
    },
    green: {
      900: '#537a5a',
      primary: '#0ace69',
      300: '#9AE19D',
    },
    white: {
      primary: '#ebffec',
    },
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'gray.50',
      },
    },
  },
});
