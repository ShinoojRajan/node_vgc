import request from 'supertest';
import express, { Express } from 'express';
import * as todoController from '../../controllers/todoController';
import * as todoService from '../../services/todoService';

jest.mock('../../services/todoService');

describe('toDoController', () => {
  let app: Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.get('/todos', todoController.getAllTodos);
    app.post('/todos', todoController.createTodo);
    app.put('/todos/:id', todoController.updateTodoById);
    app.delete('/todos/:id', todoController.deleteTodoById);
    jest.clearAllMocks();
  });

  describe('getAllTodos', () => {
    it('should return all todos', async () => {
      (todoService.getTodos as jest.Mock).mockReturnValue([{ id: 1, note: 'Test' }]);
      const res = await request(app).get('/todos');
      expect(res.status).toBe(200);
      expect(res.body).toEqual([{ id: 1, note: 'Test' }]);
    });
  });

  describe('createTodo', () => {
    it('should create a todo when note is provided', async () => {
      (todoService.addTodo as jest.Mock).mockReturnValue({ id: 1, note: 'New Todo' });
      const res = await request(app).post('/todos').send({ note: 'New Todo' });
      expect(res.status).toBe(201);
      expect(res.body).toEqual({ id: 1, note: 'New Todo' });
    });

    it('should return 400 if note is missing', async () => {
      const res = await request(app).post('/todos').send({});
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'Note is required' });
    });
  });

  describe('updateTodoById', () => {
    it('should update a todo when valid id and note are provided', async () => {
      (todoService.updateTodo as jest.Mock).mockReturnValue({ id: 1, note: 'Updated' });
      const res = await request(app).put('/todos/1').send({ note: 'Updated' });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ id: 1, note: 'Updated' });
    });

    it('should return 400 if note is missing', async () => {
      const res = await request(app).put('/todos/1').send({});
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'Note is required' });
    });

    it('should return 404 if todo not found', async () => {
      (todoService.updateTodo as jest.Mock).mockReturnValue(null);
      const res = await request(app).put('/todos/1').send({ note: 'Updated' });
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: 'Todo not found' });
    });
  });

  describe('deleteTodoById', () => {
    it('should delete a todo when valid id is provided', async () => {
      (todoService.removeTodo as jest.Mock).mockReturnValue(true);
      const res = await request(app).delete('/todos/1');
      expect(res.status).toBe(204);
    });

    it('should return 404 if todo not found', async () => {
      (todoService.removeTodo as jest.Mock).mockReturnValue(false);
      const res = await request(app).delete('/todos/1');
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: 'Todo not found' });
    });
  });
});
