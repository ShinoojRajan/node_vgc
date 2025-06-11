import { Router } from 'express';
import * as todoController from '../controllers/todoController';

const router = Router();

router.get('/', todoController.getAllTodos);
router.post('/', todoController.createTodo);
router.put('/:id', todoController.updateTodoById);
router.delete('/:id', todoController.deleteTodoById);

export default router;
