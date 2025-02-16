import { describe, it, expect, vi } from 'vitest'; // Use Vitest's functions
import request from 'supertest';
import app from '../app'; // Adjust if the path is different
import Todo from '../models/Todo'; // Adjust if the path is different

describe('POST /todos', () => {
    it('should create a new todo', async () => {
        // Arrange: Mock the save method
        const fakeTodo = { text: 'Test Todo' };
        const saveStub = vi.spyOn(Todo.prototype, 'save').mockResolvedValue(fakeTodo);

        // Act: Make a request to the /todos endpoint
        const response = await request(app)
        .post('/todos')
        .send({ text: 'Test Todo' });

        // Assert: Check the response
        expect(response.status).toBe(201);
        expect(response.body.text).toBe('Test Todo');
        expect(saveStub).toHaveBeenCalled(); // Check if save was called

        // Clean up: Restore the original method
        saveStub.mockRestore();
    });

    it('should return 500 if there is an error', async () => {
        // Arrange: Mock the save method to throw an error
        const saveStub = vi.spyOn(Todo.prototype, 'save').mockRejectedValue(new Error('Test Error'));

        // Act: Make a request to the /todos endpoint
        const response = await request(app)
        .post('/todos')
        .send({ text: 'Test Todo' });

        // Assert: Check the response
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Error creating todo');
        expect(saveStub).toHaveBeenCalled(); // Check if save was called

        // Clean up: Restore the original method
        saveStub.mockRestore();
    });
});

describe('GET /todos', () => {
    it ('should return all todos', async () => {
        // Arrange: Mock the find method
        const fakeTodos = [{ text: 'Test Todo 1' }, { text: 'Test Todo 2' }];
        const findStub = vi.spyOn(Todo, 'find').mockResolvedValue(fakeTodos);

        // Act: Make a request to the /todos endpoint
        const response = await request(app)
            .get('/todos');

        // Assert: Check the response
        expect(response.status).toBe(200);
        expect(response.body).toEqual(fakeTodos);
        expect(findStub).toHaveBeenCalled(); // Check if find was called

        // Clean up: Restore the original method
        findStub.mockRestore();
    });

    it('should return 500 if there is an error', async () => {
        // Arrange: Mock the find method to throw an error
        const findStub = vi.spyOn(Todo, 'find').mockRejectedValue(new Error('Test Error'));

        // Act: Make a request to the /todos endpoint
        const response = await request(app)
            .get('/todos');

        // Assert: Check the response
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Error fetching todos');
        expect(findStub).toHaveBeenCalled(); // Check if find was called

        // Clean up: Restore the original method
        findStub.mockRestore();
    });
  });

