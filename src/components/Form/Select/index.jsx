/* eslint-disable react/prop-types */
import React, { forwardRef } from 'react';
import {
  FormControl,
  FormLabel, Select as SelectChackra,
  FormErrorMessage,
} from '@chakra-ui/react';

function SelectBase({
  name, label, error = null, children, ...rest
}, ref) {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <SelectChackra
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
      >
        {children}
      </SelectChackra>

      {!!error && (
        <FormErrorMessage>
          {error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
}

export const Select = forwardRef(SelectBase);
