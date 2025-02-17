import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react'; // Import fireEvent
import Entry from '../components/Entry.jsx';
import { beforeEach } from 'vitest';

describe('Entry', () => {
  beforeEach(() => {
    render(<Entry text={"Walk the dog"} />);
  });

  test('renders the todo text', () => {
    const entryText = screen.getByTestId('toDoEntry');
    expect(entryText).toHaveTextContent('Walk the dog');
  });

  test('renders a rename button', () => {
    const renameElement = screen.getByTestId('renameButton');
    expect(renameElement).toBeInTheDocument();
  });

  test('clicking rename button triggers the rename action', () => {
    // Ensure the button exists
    const renameButton = screen.getByTestId('renameButton');
    
    // Simulate a click event (if there's any UI change or behavior tied to it)
    act(() => {
      fireEvent.click(renameButton); // fireEvent properly imported now
    });

    // Assuming the button click triggers some visible change like input fields, or text update
    const inputElement = screen.getByDisplayValue("Walk the dog"); // Modify this based on actual behavior
    expect(inputElement).toBeInTheDocument();
  });

});
