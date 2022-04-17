import React from 'react';
import {
  Flex, useBreakpointValue, IconButton, Icon,
} from '@chakra-ui/react';
import { RiMenuLine } from 'react-icons/ri';

import { useSidebarDrawer } from '../../contexts/SidebarDrawer';
import { Logo } from './Logo';

export function Header() {
  const { onOpen } = useSidebarDrawer();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      as="header"
      align="center"
      mx="auto"
      mt="4"
      w="100%"
      maxWidth={1480}
      h="20"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="Open navigation"
          color="green.300"
          icon={<Icon as={RiMenuLine} />}
          mr="2"
          fontSize="3xl"
          variant="unstyled"
          onClick={onOpen}
        />
      )}
      <Flex
        align="center"
        mx="auto"
        justifyContent="center"
        w="100%"
        maxWidth={1480}
        h="20"
      >
        <Logo />
      </Flex>
    </Flex>
  );
}
