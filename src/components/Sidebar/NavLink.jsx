/* eslint-disable react/prop-types */
import React from 'react';
import { Icon, Link as ChakraLink, Text } from '@chakra-ui/react';
import { ActiveLink } from '../ActiveLink';

export function NavLink({
  icon, href, children, ...rest
}) {
  return (
    <ActiveLink href={href}>
      <ChakraLink
        display="flex"
        {...rest}
      >
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </ChakraLink>
    </ActiveLink>
  );
}
