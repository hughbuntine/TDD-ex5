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
  
  describe('PUT /todos/:id', () => {
      it('should update an existing todo', async () => {
          // Arrange: Mock findByIdAndUpdate to return an updated todo
          const fakeUpdatedTodo = { _id: '123', text: 'Updated Todo' };
          const updateStub = vi.spyOn(Todo, 'findByIdAndUpdate').mockResolvedValue(fakeUpdatedTodo);
  
          // Act: Send a PUT request
          const response = await request(app)
              .put('/todos/123')
              .send({ text: 'Updated Todo' });
  
          // Assert: Check the response
          expect(response.status).toBe(200);
          expect(response.body.text).toBe('Updated Todo');
          expect(updateStub).toHaveBeenCalledWith('123', { text: 'Updated Todo' }, { new: true });
  
          // Clean up
          updateStub.mockRestore();
      });
  
      it('should return 404 if the todo is not found', async () => {
          // Arrange: Mock findByIdAndUpdate to return null (not found)
          const updateStub = vi.spyOn(Todo, 'findByIdAndUpdate').mockResolvedValue(null);
  
          // Act: Send a PUT request
          const response = await request(app)
              .put('/todos/123')
              .send({ text: 'Updated Todo' });
  
          // Assert: Check the response
          expect(response.status).toBe(404);
          expect(response.body.message).toBe('Task not found');
  
          // Clean up
          updateStub.mockRestore();
      });
  
      it('should return 500 if there is an error', async () => {
          // Arrange: Mock findByIdAndUpdate to throw an error
          const updateStub = vi.spyOn(Todo, 'findByIdAndUpdate').mockRejectedValue(new Error('Test Error'));
  
          // Act: Send a PUT request
          const response = await request(app)
              .put('/todos/123')
              .send({ text: 'Updated Todo' });
  
          // Assert: Check the response
          expect(response.status).toBe(500);
          expect(response.body.message).toBe('Error updating task');
  
          // Clean up
          updateStub.mockRestore();
      });
  });

describe('DELETE /todos/:id', () => {
    it('should delete an existing todo', async () => {
        // Arrange: Mock findByIdAndDelete to return a deleted todo
        const fakeDeletedTodo = { _id: '123', text: 'Test Todo' };
        const deleteStub = vi.spyOn(Todo, 'findByIdAndDelete').mockResolvedValue(fakeDeletedTodo);

        // Act: Send a DELETE request
        const response = await request(app)
            .delete('/todos/123');

        // Assert: Check the response
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Todo deleted successfully');
        expect(deleteStub).toHaveBeenCalledWith('123');

        // Clean up
        deleteStub.mockRestore();
    });

    it('should return 404 if the todo is not found', async () => {
        // Arrange: Mock findByIdAndDelete to return null (not found)
        const deleteStub = vi.spyOn(Todo, 'findByIdAndDelete').mockResolvedValue(null);

        // Act: Send a DELETE request
        const response = await request(app)
            .delete('/todos/123');

        // Assert: Check the response
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Todo not found');

        // Clean up
        deleteStub.mockRestore();
    });

    it('should return 500 if there is an error', async () => {
        // Arrange: Mock findByIdAndDelete to throw an error
        const deleteStub = vi.spyOn(Todo, 'findByIdAndDelete').mockRejectedValue(new Error('Test Error'));

        // Act: Send a DELETE request
        const response = await request(app)
            .delete('/todos/123');

        // Assert: Check the response
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Error deleting todo');

        // Clean up
        deleteStub.mockRestore();
    });
});

  