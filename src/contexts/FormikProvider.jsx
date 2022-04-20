/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React from 'react';
import * as yup from 'yup';
import moment from 'moment';
import { Formik, useFormikContext, useField } from 'formik';
import { api } from '../services/api';

export async function createSchedule({ name, birthDate, schedule }, callbackActions = () => { }) {
  try {
    const { status, data } = await api.post('', {
      dayHourSchedule: schedule,
      patientName: name,
      patientBirthDate: birthDate,
    }).catch(({ response }) => ({ data: response.data.error, status: response.status }));
    callbackActions({ status, data });
    return { status, data };
  } catch (error) {
    return { error };
  }
}

export const createScheduleFormSchema = yup.object().shape({
  name: yup.string().required('Infome o Nome Completo do Paciente'),
  birthDate: yup.date('Data inválida').required('Infome a Data de Nascimento do Paciente'),
  schedule: yup.date('Horário inválido').required('Infome um Horário de Agendamento'),
});
export function FormikProvider({ children }) {
  return (
    <Formik
      initialValues={{
        name: '',
        birthDate: undefined,
        schedule: undefined,
      }}
      validationSchema={createScheduleFormSchema}
      onSubmit={(values, actions) => {
        if (!moment(values.schedule).isSameOrAfter(values.birthDate)) {
          actions.setSubmitting(false);
          actions.setErrors({ birthDate: 'A Data do Nascimento não pode acontecer depois do Horário de Agendamento', schedule: 'O Horário de Agendamento não pode acontecer antes da Data do Nascimento' });
        } else if (moment(new Date()).isBefore(values.birthDate)) {
          actions.setSubmitting(false);
          actions.setErrors({ birthDate: 'A Data do Nascimento não pode acontecer depois do dia Atual' });
        } else if (moment(new Date()).isSameOrAfter(values.schedule)) {
          actions.setSubmitting(false);
          actions.setErrors({ schedule: 'O Horário de Agendamento não pode acontecer antes da Data Atual' });
        } else {
          createSchedule({
            name: values.name, schedule: values.schedule, birthDate: values.birthDate,
          }, ({ status, data }) => {
            if (parseInt(status, 10) >= 300) {
              actions.setSubmitting(false);
              actions.setErrors({ others: data });
            }
          });
        }
      }}
    >
      {children}
    </Formik>
  );
}

export function useFormik() {
  const [field] = useField();
  const {
    errors, handleSubmit, handleChange, values, setFieldValue,
  } = useFormikContext();
  return {
    field, errors, handleSubmit, handleChange, values, setFieldValue,
  };
}
