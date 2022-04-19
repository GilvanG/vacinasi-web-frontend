/* eslint-disable react/prop-types */
import React from 'react';
import ptBR from 'date-fns/locale/pt-BR';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { Input } from '.';

export function InputDateTime({
  label, name, onChange, error, value, ...rest
}) {
  registerLocale('pt-BR', ptBR);
  return (
    <Input
      as={ReactDatePicker}
      shouldCloseOnSelect
      name={name}
      label={label}
      selected={value}
      onChange={onChange}
      locale="pt-BR"
      timeFormat="HH:mm"
      dateFormat="dd/MM/yyyy - h:mm aa"
      error={error}
      showTimeSelect
      timeIntervals={60}
      {...rest}
    // minDate={new Date()}
    />
  );
}
