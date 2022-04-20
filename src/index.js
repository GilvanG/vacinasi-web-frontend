import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import Router from './Router';
import { theme } from './styles/theme';
import { FormikProvider } from './contexts/FormikProvider';
import { SidebarDrawerProvider } from './contexts/SidebarDrawer';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <FormikProvider>
      <ChakraProvider resetCSS theme={theme}>
        <SidebarDrawerProvider>
          <Router />
        </SidebarDrawerProvider>
      </ChakraProvider>
    </FormikProvider>
  </React.StrictMode>,
);
