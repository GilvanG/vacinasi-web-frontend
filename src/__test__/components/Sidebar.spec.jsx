import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar';

describe('Sidebar Component', () => {
  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
      ,
    );
    expect(screen.findByText('Criar'));
    expect(screen.findByText('Consultar'));
  });
});
