import request from 'supertest';
import express from 'express';
import todoRouter from '../../routes/todoRoute';

describe('Todo Routes', () => {
  let app: express.Express;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/todos', todoRouter);
  });

  it('should get all todos', async () => {
    const res = await request(app).get('/todos');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a new todo', async () => {
    const todo = { note: 'Test Todo' };
    const res = await request(app).post('/todos').send(todo);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.note).toBe('Test Todo');
  });

  it('should update a todo by id', async () => {
    // First, create a todo
    const createRes = await request(app).post('/todos').send({ note: 'To Update' });
    const id = createRes.body.id;
    const res = await request(app).put(`/todos/${id}`).send({ note: 'Updated Todo' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', id);
    expect(res.body.note).toBe('Updated Todo');
  });

  it('should delete a todo by id', async () => {
    // First, create a todo
    const createRes = await request(app).post('/todos').send({ note: 'To Delete' });
    const id = createRes.body.id;
    const res = await request(app).delete(`/todos/${id}`);
    expect(res.status).toBe(204);
  });
});
