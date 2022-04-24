import React from 'react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Create from '../../pages/Schedule/Create';

jest.mock('../../contexts/CreateScheduleFormik', () => ({
  useFormCreate: () => (
    {
      field: { value: { birthDate: undefined } },
      values: { name: undefined },
      errors: {
        others: 'Erro geral',
        name: 'Erro nome',
        birthDate: 'Erro nascimento',
        schedule: 'Erro horario de agendamento',
      },
    }
  ),
}));
describe('Crete Schedule Page', () => {
  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <Create />
      </MemoryRouter>,
    );
    expect(screen.getByText('Criar Agendamento')).toBeInTheDocument();
    expect(screen.getByText('Nome Completo')).toBeInTheDocument();
    expect(screen.getByText('Data de Nascimento')).toBeInTheDocument();
    expect(screen.getByText('Horário')).toBeInTheDocument();
  });

  it('renders erros correctly', () => {
    render(
      <MemoryRouter>
        <Create />
      </MemoryRouter>,
    );
    expect(screen.getByText('Erro geral')).toBeInTheDocument();
    expect(screen.getByText('Erro nome')).toBeInTheDocument();
    expect(screen.getByText('Erro nascimento')).toBeInTheDocument();
    expect(screen.getByText('Erro horario de agendamento')).toBeInTheDocument();
  });
});
