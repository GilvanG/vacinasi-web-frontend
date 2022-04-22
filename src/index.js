import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Router from './Router';
import { theme } from './styles/theme';
import { SidebarDrawerProvider } from './contexts/SidebarDrawer';
import { queryClient } from './services/query-client';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider resetCSS theme={theme}>
        <SidebarDrawerProvider>
          <Router />
        </SidebarDrawerProvider>
      </ChakraProvider>
      {/* Sim, eu sei que o ReactQueryDevtools não deveria estar ativo na main.
      Mantive ele aqui para facilitar a observação dos fetchings. */}
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>,
);
