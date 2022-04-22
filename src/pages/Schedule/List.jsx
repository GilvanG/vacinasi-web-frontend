/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Box, Heading, Divider,
  Flex, Button, Icon,
  Text, SimpleGrid,
  Spinner, VStack, HStack,
  Table, Thead, Tbody,
  Tr, Th, Td,
  useBreakpointValue,
  Textarea, FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
// import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { RiPencilLine } from 'react-icons/ri';
import { Input } from '../../components/Form/Input';
import { Select } from '../../components/Form/Select';
import { useSchedules } from '../../services/hooks/useSchedule';
import { FormEditProvider, useFormEdit } from '../../contexts/EditScheduleFormik';

export function FormEditSchedule({
  isWideVersion = false, cancelAction = () => { }, submitAction = () => { },
}) {
  const {
    errors, handleSubmit, handleChange, values,
  } = useFormEdit();
  return (
    <VStack
      mt="2"
      as="form"
      // onClick={(e) => cancelAction(e)}
      onSubmit={async (e) => {
        handleSubmit(e);
        submitAction(e);
      }}
    >
      <SimpleGrid
        w="100%"
        minChildWidth="240px"
        spacing={['6', '8']}
      >
        <Select
          name="status"
          placeholder={`Selecione um ${isWideVersion ? 'Estado do Agendamento' : 'Status'}`}
          label={isWideVersion ? 'Estado do Agendamentos' : 'Status'}
          onChange={handleChange}
          value={values.status}
          error={errors?.status}
        >
          <option value="completed">
            Completo
          </option>
          <option value="cancelled">
            Cancelado
          </option>
          <option value="unfulfilled">
            Não Definido
          </option>
          <option value="other">
            Outro
          </option>
        </Select>
        <Input
          as={Textarea}
          name="note"
          label="Observações"
          onChange={handleChange}
          value={values.note}
          error={errors?.note}
        />
      </SimpleGrid>
      <FormControl
        isInvalid={!!errors.others}
      >
        {!!errors.others && (
          <FormErrorMessage>
            {errors.others}
          </FormErrorMessage>
        )}
        <Flex mt="4" w="100%">
          <HStack spacing="4">
            <Button
              onClick={cancelAction}
              colorScheme="whiteAlpha"
            >
              Cancelar
            </Button>
            {/* {!!errors ? <Link to="/5"> : <></> } */}
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
  );
}

function ListSchedule() {
  const statusPt = {
    completed: 'Completo',
    cancelled: 'Cancelado',
    unfulfilled: 'Não Definido',
    other: 'Outro',
  };
  const [newRefetch, setNewRefetch] = useState(0);
  const [scheduleSelected, setScheduleSelected] = useState({});
  const {
    isLoading, isFetching, error, data, refetch,
  } = useSchedules();
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  useEffect(() => {
    refetch();
    setNewRefetch(0);
  }, [newRefetch]);

  return (
    <Box
      flex="1"
      p={['6', '8']}
      bg="gray.800"
      borderRadius={8}
    >
      <Flex mb="8" justify="space-between" align="center">
        <Heading size="lg" fontWeight="normal">
          Lista de Agendamentos
          {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
        </Heading>

      </Flex>
      <Divider my="6" borderColor="gray.700" />

      {isLoading ? (
        <Flex justify="center">
          <Spinner />
        </Flex>
      ) : error ? (
        <Flex justify="center">
          <Text>Falha no carregamento, tente novamente</Text>
        </Flex>
      )
        : data?.schedules.map(({ id, day, scheduleForHour = [] }) => {
          const dayF = format(new Date(day), "'Dia' dd 'de' MMMM',' yyyy");
          return (
            <div key={day}>
              <Text
                fontWeight="bold"
                fontSize="md"
                mb="2"
                mt="8"
                color="green.50"
              >
                {dayF}
              </Text>

              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th>Horário</Th>
                    <Th>Paciente</Th>
                    {isWideVersion && <Th>Data de Nascimento</Th>}
                    {(isWideVersion && <Th>Estado do Agendamentos</Th>) || <Th>Status</Th>}
                    {isWideVersion && <Th>Observações</Th>}

                    <Th width="8" />
                  </Tr>
                </Thead>

                <Tbody>
                  {scheduleForHour.map(({ hour, patients }) => patients.map((patient) => {
                    const hourF = format(new Date(hour), "HH':'mm' h'");
                    const birthDateF = format(new Date(patient.birthDate), "dd'/'MM'/'yyyy");
                    return (
                      <>
                        <Tr key={patient.id}>
                          <Td>
                            {hourF}
                          </Td>
                          <Td>
                            <Text
                              color="teal.400"
                              fontWeight="bold"
                            >
                              {patient.name}
                            </Text>
                          </Td>
                          {isWideVersion && (
                            <Td>
                              {birthDateF}
                            </Td>
                          )}
                          <Td>
                            {statusPt[patient.status]}
                          </Td>
                          {isWideVersion && (
                            <Td>
                              {patient.note}
                            </Td>
                          )}
                          {isWideVersion && (
                            <Td>
                              {!Object.keys(scheduleSelected).length ? (
                                <Button
                                  as="a"
                                  size="sm"
                                  fontSize="sm"
                                  colorScheme="green"
                                  onClick={() => setScheduleSelected(
                                    {
                                      ...patient,
                                    },
                                  )}
                                  leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                                >
                                  Editar
                                </Button>
                              ) : ''}
                            </Td>
                          )}
                        </Tr>
                        {patient.id === scheduleSelected?.id
                          ? (
                            <Tr w="100%" align="center" justifyContent="center">
                              <Td colspan={isWideVersion ? '6' : '3'} w="100%">
                                <FormEditProvider
                                  patientId={patient.id}
                                  hourSchedule={hour}
                                  scheduleId={id}
                                >
                                  <FormEditSchedule
                                    submitAction={() => setNewRefetch(1)}
                                    isWideVersion={isWideVersion}
                                    cancelAction={() => setScheduleSelected({})}
                                  />
                                </FormEditProvider>
                              </Td>
                            </Tr>
                          )
                          : ''}
                      </>

                    );
                  }))}
                </Tbody>
              </Table>

            </div>
          );
        })}
    </Box>
  );
}

export default ListSchedule;
