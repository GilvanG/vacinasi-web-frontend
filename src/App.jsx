/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import ptBR from 'date-fns/locale/pt-BR';
import { useFormikContext, useField } from 'formik';
import {
  Flex, SimpleGrid, Box, Heading, VStack, Divider, Button, HStack,
} from '@chakra-ui/react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Input } from './components/Form/Input';

function App() {
  registerLocale('pt-BR', ptBR);
  const [field] = useField();
  const { errors, ...formik } = useFormikContext();
  return (
    <Flex direction="column" h="108vh">
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} px="6">
        <Sidebar />
        <Box
          as="form"
          flex="1"
          p={['6', '8']}
          bg="gray.800"
          borderRadius={8}
          onSubmit={formik.handleSubmit}
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
                onChange={formik.handleChange}
                value={formik.values.name}
                error={errors?.name}
              />
              <Input
                as={ReactDatePicker}
                shouldCloseOnSelect
                name="birthDate"
                label="Data de Nascimento"
                selected={field.value.birthDate}
                onChange={(val) => formik.setFieldValue('birthDate', val)}
                maxDate={new Date()}
                dateFormat="dd/MM/yyyy"
                locale="pt-BR"
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
              <Input
                name="schedule"
                label="Horário"
                as={ReactDatePicker}
                selected={field.value.schedule}
                onChange={(val) => formik.setFieldValue('schedule', val)}
                shouldCloseOnSelect
                showTimeSelect
                minDate={new Date()}
                timeFormat="HH:mm"
                dateFormat="dd/MM/yyyy - h:mm aa"
                locale="pt-BR"
                error={errors?.schedule}
              />
            </SimpleGrid>

            <Flex mt="8" w="100%">
              <HStack spacing="4">
                <Link to="/users" passHref>
                  <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
                </Link>

                <Button
                  type="submit"
                  colorScheme="green"
                >
                  Salvar
                </Button>
              </HStack>
            </Flex>
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
}

export default App;
