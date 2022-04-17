import React from 'react';
import { Flex } from '@chakra-ui/react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';

function App() {
  return (
    <Flex direction="column" h="108vh">
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} px="6">
        <Sidebar />
      </Flex>
    </Flex>
  );
}

export default App;
