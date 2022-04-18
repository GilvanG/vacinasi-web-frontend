/* eslint-disable react/prop-types */
import React from 'react';
import * as yup from 'yup';
import moment from 'moment';
import { Formik } from 'formik';

export function FormikProvider({ children }) {
  const createScheduleFormSchema = yup.object().shape({
    name: yup.string().required('Infome o Nome Completo do Paciente'),
    birthDate: yup.date('Data inválida').required('Infome a Data de Nascimento do Paciente'),
    schedule: yup.date('Horário inválido').required('Infome um Horário de Agendamento'),
  });
  return (
    <Formik
      initialValues={{
        name: '',
        birthDate: undefined,
        schedule: undefined,
      }}
      validationSchema={createScheduleFormSchema}
      onSubmit={(values, actions) => {
        console.log(JSON.stringify(values));
        if (!moment(values.schedule).isSameOrAfter(values.birthDate)) {
          actions.setSubmitting(false);
          actions.setErrors({ birthDate: 'A Data do Nascimento não pode acontecer depois do Horário de Agendamento', schedule: 'O Horário de Agendamento não pode acontecer antes da Data do Nascimento' });
        } else if (moment(new Date()).isBefore(values.birthDate)) {
          actions.setSubmitting(false);
          actions.setErrors({ birthDate: 'A Data do Nascimento não pode acontecer depois do dia Atual' });
        } else if (moment(new Date()).isAfter(values.schedule)) {
          actions.setSubmitting(false);
          actions.setErrors({ schedule: 'O Horário de Agendamento não pode acontecer antes da Data Atual' });
        }
      }}
    >
      {children}
    </Formik>
  );
}
