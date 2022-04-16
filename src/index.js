import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import reportWebVitals from './reportWebVitals';
import Router from './Router';
import { theme } from './styles/theme';
import { SidebarDrawerProvider } from './contexts/SidebarDrawer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider resetCSS theme={theme}>
      <SidebarDrawerProvider>
        <Router />
      </SidebarDrawerProvider>
    </ChakraProvider>
  </React.StrictMode>,
);

// ReactDOM.render(
//   // <React.StrictMode>
//   <ChakraProvider resetCSS theme={theme}>
//     <SidebarDrawerProvider>
//       <Router />
//     </SidebarDrawerProvider>
//   </ChakraProvider>,
//   document.getElementById('root')
// );
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
