import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Select } from '../../components/Form/Select';

describe('Select Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <Select
        name="status"
        label="Estado Agendamento"
      />,
    );
    expect(getByText('Estado Agendamento'));
  });

  it('render correctly and not mocked', () => {
    const { queryByText } = render(
      <Select
        name="sta"
        label="Status"
      />,
    );
    expect(queryByText('Estado Agendamento')).not.toBeInTheDocument();
  });

  it('receiving error', () => {
    const { getByText } = render(
      <Select
        name="status"
        label="Estado Agendamento"
        error="Campo vazio"
      />,
    );
    expect(getByText('Campo vazio'));
  });

  it('render to selected value', () => {
    render((
      <Select
        name="Nome"
        label="Completo Nome"
      // value="jao"
      >
        <option value="press">press</option>
        <option value="selected" selected>selected</option>
        <option value="not-selected">not-selected</option>
      </Select>));
    const select = screen.getByRole('combobox');
    expect(select.value).toBe('selected');
  });
});
