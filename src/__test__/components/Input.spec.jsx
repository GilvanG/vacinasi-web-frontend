import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Input } from '../../components/Form/Input';

describe('Input Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <Input
        name="Nome"
        label="Primeiro Nome"
      />,
    );
    expect(getByText('Primeiro Nome'));
  });

  it('render correctly and not mocked', () => {
    const { queryByText } = render(
      <Input
        name="Nome"
        label="Primeir Nome"
      />,
    );
    expect(queryByText('Primeiro Nome')).not.toBeInTheDocument();
  });

  it('receiving error', () => {
    const { getByText } = render(
      <Input
        name="Nome"
        label="Completo Nome"
        error="Campo vazio"
      />,
    );
    expect(getByText('Campo vazio'));
  });

  it('render to value passed by parameter', () => {
    render((
      <Input
        name="Nome"
        label="Completo Nome"
        value="jao"
      />));
    const input = screen.getByRole('textbox');
    expect(input.value).toBe('jao');
  });
});
