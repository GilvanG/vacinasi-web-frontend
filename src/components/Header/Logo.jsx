import React from 'react';
import { Text } from '@chakra-ui/react';

export function Logo() {
  return (
    <Text
      fontSize={['2xl', '4xl']}
      fontWeight="black"
      fontFamily="Noto Sans"
      letterSpacing="tighter"
      color="green.primary"
      w="128"
    >
      VACINA
      <Text
        as="span"
        color="white.primary"
        fontSize={['2xl', '4xl']}
      >
        SI
      </Text>
    </Text>
  );
}
