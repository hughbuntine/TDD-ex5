import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Entry from '../components/Entry.jsx';
import { beforeEach } from 'vitest';

describe('Entry', () => {
beforeEach(() => {
    render(<Entry text={"Walk the dog"}/>);
  } );

  test('renders the todo text', () => {
    const entryText = screen.getByTestId('toDoEntry');
    expect(entryText).toHaveTextContent('Walk the dog');
  });

    test('renders a rename button', () => {
        const renameElement = screen.getByTestId('renameButton');
        expect(renameElement).toBeInTheDocument();
        });
});