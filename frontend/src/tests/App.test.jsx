import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { beforeEach } from 'vitest';

describe('App', () => {
beforeEach(() => {
    render(<App />);
  } );

  test('renders the header text', () => {
    const headerElement = screen.getByText(/TO-DO LIST/i);
    expect(headerElement).toBeInTheDocument();
  });
});
