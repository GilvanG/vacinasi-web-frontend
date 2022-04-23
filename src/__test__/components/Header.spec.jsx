import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from '../../components/Header';

describe('Header Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <Header />,
    );
    expect(getByText('VACINA')).toBeInTheDocument();
    expect(getByText('SI')).toBeInTheDocument();
  });

  it('render button to open navigation', () => {
    render((<Header />));
    expect(screen.getByRole('button', { label: 'Open navigation' })).toBeInTheDocument();
  });
});
