/* eslint-disable react/prop-types */
import React, { forwardRef } from 'react';
import {
  Input as ChakraInput,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';

function InputBase({
  name, label, error = null, ...rest
}, ref) {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        name={name}
        id={name}
        variant="filled"
        size="lg"
        focusBorderColor="green.500"
        bgColor="gray.900"
        _hover={{
          bgColor: 'gray.900',
        }}
        ref={ref}
        {...rest}
      />

      {!!error && (
        <FormErrorMessage>
          {error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
}

export const Input = forwardRef(InputBase);
