/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React, { createContext, useContext, useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/hooks';

const SidebarDrawerContext = createContext({});

export function SidebarDrawerProvider({ children }) {
  const disclosure = useDisclosure();
  const location = window.location.pathname;
  useEffect(() => {
    disclosure.onClose();
  }, [location]);
  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  );
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext);
