import React from 'react';
import { render, screen, act } from '@testing-library/react';
import ArchivedEntry from '../components/ArchivedEntry.jsx';
import { beforeEach } from 'vitest';

describe('Archived Entry', () => {
beforeEach(() => {
    render(<ArchivedEntry text={"Walk the dog"}/>);
  } );

  test('renders the archived text', () => {
    const entryText = screen.getByTestId('ArchivedEntry');
    expect(entryText).toHaveTextContent('Walk the dog');
  });

});