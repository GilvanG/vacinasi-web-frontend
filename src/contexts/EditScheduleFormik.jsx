/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React from 'react';
import * as yup from 'yup';
import { Formik, useFormikContext } from 'formik';
import { api } from '../services/api';

export async function editSchedule({
  note, statusSchedule, patientId, hourSchedule, scheduleId,
}, callbackActions = () => { }) {
  try {
    const { status, data } = await api.patch('', {
      note,
      status: statusSchedule,
      patientId,
      hourSchedule,
      scheduleId,
    }).catch(({ response }) => ({ data: response.data.error, status: response.status }));
    callbackActions({ status, data });
    return { status, data };
  } catch (error) {
    return { error };
  }
}

export const editScheduleFormSchema = yup.object().shape({
  note: yup.string('Tipo de Dados é inválido'),
  status: yup.string('Tipo de Dados é inválido').oneOf([
    'completed', 'cancelled', 'unfulfilled', 'other',
  ], 'O Estado de agendamento informado é inválido').required('Infome o Estado do Agendamento'),
});
export function FormEditProvider({
  children, patientId, hourSchedule, scheduleId,
}) {
  return (
    <Formik
      initialValues={{
        note: '',
        status: undefined,
      }}
      validationSchema={editScheduleFormSchema}
      onSubmit={(values, actions) => {
        editSchedule({
          note: values.note,
          statusSchedule: values.status,
          patientId,
          hourSchedule,
          scheduleId,
        }, ({ status, data }) => {
          if (parseInt(status, 10) >= 300) {
            actions.setSubmitting(false);
            actions.setErrors({ others: data });
          }
        });
      }}
    >
      {children}
    </Formik>
  );
}

export function useFormEdit() {
  const {
    errors, handleSubmit, handleChange, values, setFieldValue,
  } = useFormikContext();
  return {
    errors, handleSubmit, handleChange, values, setFieldValue,
  };
}
