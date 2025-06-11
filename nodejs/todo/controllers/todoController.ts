import { Request, Response } from 'express';
import * as todoService from '../services/todoService';

export const getAllTodos = (req: Request, res: Response) => {
  res.status(200).json(todoService.getTodos());
};

export const createTodo = (req: Request, res: Response) => {
  const { note } = req.body;
   if (!note) {
    res.status(400).json({ error: 'Note is required' });
    return;
  }
   const todo = todoService.addTodo(note);
  res.status(201).json(todo);
};

export const updateTodoById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const { note } = req.body;
  if (!note) {
    res.status(400).json({ error: 'Note is required' });
    return;
  }
  const updated = todoService.updateTodo(id, note);
  if (!updated) {
    res.status(404).json({ error: 'Todo not found' });
    return;
  }
  res.status(200).json(updated);
};

export const deleteTodoById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const removed = todoService.removeTodo(id);
  if (!removed) {
    res.status(404).json({ error: 'Todo not found' });
    return;
  }
  res.status(204).send();
};
