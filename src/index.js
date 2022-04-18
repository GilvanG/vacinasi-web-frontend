import React from 'react';
import moment from 'moment';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { Formik } from 'formik';
import * as yup from 'yup';
import Router from './Router';
import { theme } from './styles/theme';
import { SidebarDrawerProvider } from './contexts/SidebarDrawer';

const root = ReactDOM.createRoot(document.getElementById('root'));
const createScheduleFormSchema = yup.object().shape({
  name: yup.string().required('Infome o Nome Completo do Paciente'),
  birthDate: yup.date('Data inválida').required('Infome a Data de Nascimento do Paciente'),
  schedule: yup.date('Horário inválido').required('Infome um Horário de Agendamento'),
});
root.render(
  <React.StrictMode>
    <ChakraProvider resetCSS theme={theme}>
      <SidebarDrawerProvider>
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
            } else if (moment(new Date()).isAfter(values.birthDate)) {
              actions.setSubmitting(false);
              actions.setErrors({ birthDate: 'A Data do Nascimento não pode acontecer depois do dia Atual' });
            } else if (moment(new Date()).isBefore(values.schedule)) {
              actions.setSubmitting(false);
              actions.setErrors({ schedule: 'O Horário de Agendamento não pode acontecer antes da Data Atual' });
            }
          }}
        >
          <Router />
        </Formik>
      </SidebarDrawerProvider>
    </ChakraProvider>
  </React.StrictMode>,
);

// ReactDOM.render(
//   // <React.StrictMode>
//   <ChakraProvider resetCSS theme={theme}>
//     <SidebarDrawerProvider>
//       <Router />
//     </SidebarDrawerProvider>
//   </ChakraProvider>,
//   document.getElementById('root')
// );
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
