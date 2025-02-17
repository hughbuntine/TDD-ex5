import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import App from '../App';
import { beforeEach, vi } from 'vitest';

describe('App', () => {
  beforeEach(() => {
    // Mocking the fetch function
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve([{ _id: '1', text: 'Mock Task', completed: false }])
    });

    render(<App />);
  });

  test('renders the header text', () => {
    act(() => {
      const headerElement = screen.getByText(/TO-DO LIST/i);
      expect(headerElement).toBeInTheDocument();
    });
  });

  test('adds a new task', async () => {
    act(() => {
      const inputElement = screen.getByPlaceholderText('Add a new task');
      const buttonElement = screen.getByText('Add Task');

      fireEvent.change(inputElement, { target: { value: 'Add Task' } });
      fireEvent.click(buttonElement);
    });

    // Mock the response for the POST request
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve({ _id: '2', text: 'Add Task', completed: false })
    });

    await waitFor(() => {
      act(() => {
        expect(screen.getByText('Add Task')).toBeInTheDocument();
      });
    });
  });

});
