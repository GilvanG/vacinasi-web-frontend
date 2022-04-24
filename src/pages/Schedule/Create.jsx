/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Flex, SimpleGrid, Box, Heading, VStack, Divider, Button,
  HStack, FormErrorMessage, FormControl, useToast,
} from '@chakra-ui/react';
import 'react-datepicker/dist/react-datepicker.css';

import { Input } from '../../components/Form/Input';
import { InputDate } from '../../components/Form/Input/InputDate';
import { InputDateTime } from '../../components/Form/Input/InputDateTime';
import { useFormCreate } from '../../contexts/CreateScheduleFormik';

function CreateSchedule() {
  const {
    field, errors, handleSubmit, handleChange, values, setFieldValue, status, setStatus,
  } = useFormCreate();
  const toast = useToast();
  useEffect(
    () => {
      if (status === 'submitting-success') {
        setStatus();
        toast({
          id: 'success-token',
          status: 'success',
          isClosable: true,
          position: 'bottom-right',
          duration: 5000,
          description: 'Agendamento criado com sucesso!',
        });
      }
    },
    [status, toast.isActive('success-token')],
  );
  useEffect(() => {
    if (localStorage.getItem('birthDate')) {
      setFieldValue('birthDate', new Date(parseInt(localStorage.getItem('birthDate'), 10)));
    }
    if (localStorage.getItem('schedule')) {
      setFieldValue('schedule', new Date(parseInt(localStorage.getItem('schedule'), 10)));
    }
    if (localStorage.getItem('name')) {
      setFieldValue('name', localStorage.getItem('name'));
    }
  }, []);
  return (
    <Box
      as="form"
      flex="1"
      p={['6', '8']}
      bg="gray.800"
      borderRadius={8}
      onSubmit={handleSubmit}
    >

      <Heading size="lg" fontWeight="normal">Criar Agendamento</Heading>

      <Divider my="6" borderColor="gray.700" />

      <VStack spacing="5">
        <Heading
          as="span"
          size="md"
          color="gray.100"
          fontWeight="normal"
        >
          Paciente
        </Heading>
        <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
          <Input
            name="name"
            label="Nome Completo"
            onChange={(val) => {
              handleChange(val);
              localStorage.setItem('name', val.target.value);
            }}
            value={values.name}
            error={errors?.name}
          />
          <InputDate
            name="birthDate"
            label="Data de Nascimento"
            value={field.value.birthDate}
            onChange={(val) => {
              setFieldValue('birthDate', val);
              localStorage.setItem('birthDate', val.getTime());
            }}
            maxDate={new Date()}
            error={errors?.birthDate}
          />

        </SimpleGrid>
        <Divider my="10" w="100%" borderColor="gray.700" />

        <Heading
          as="span"
          size="md"
          color="gray.100"
          fontWeight="normal"
        >
          Agendamento
        </Heading>

        <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
          <InputDateTime
            name="schedule"
            label="Horário"
            value={field.value.schedule}
            onChange={(val) => {
              setFieldValue('schedule', val);
              localStorage.setItem('schedule', val.getTime());
            }}
            minDate={new Date()}
            error={errors?.schedule}
          />
        </SimpleGrid>

        <FormControl isInvalid={!!errors.others}>
          {!!errors.others && (
            <FormErrorMessage>
              {errors.others}
            </FormErrorMessage>
          )}
          <Flex mt="4" w="100%">
            <HStack spacing="4">
              <Link to="/schedules" passHref>
                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button
                type="submit"
                colorScheme="green"
                disabled={!!errors.others}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </FormControl>
      </VStack>
    </Box>
  );
}

export default CreateSchedule;
