import React from 'react';
import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import { Header } from '../Header';
import { Sidebar } from '../Sidebar';

export function Layout() {
  return (
    <Flex direction="column" h="108vh">
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} px="6">
        <Sidebar />
        <Outlet />
      </Flex>
    </Flex>
  );
}
