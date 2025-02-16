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

  test('renders a checkbox for completion', () => {
    const checkboxElement = screen.getByRole('checkbox');
    expect(checkboxElement).toBeInTheDocument();
  });

    test('can click checkbox on', () => {
        const checkboxElement = screen.getByRole('checkbox');
        act(() => {
            checkboxElement.click();
        });
        expect(checkboxElement).toBeChecked();
    });

    test('can click checkbox on then off', () => {
        const checkboxElement = screen.getByRole('checkbox');
        act(() => {
            checkboxElement.click();
            checkboxElement.click();
        });
        expect(checkboxElement).not.toBeChecked();
    });

    test('renders a rename button', () => {
        const renameElement = screen.getByTestId('renameButton');
        expect(renameElement).toBeInTheDocument();
        });
});