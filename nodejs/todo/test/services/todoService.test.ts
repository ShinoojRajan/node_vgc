import * as todoService from '../../services/todoService';

describe('todoService', () => {
  beforeEach(() => {
    // @ts-ignore
    todoService['todos'] = [];
  });

  describe('getTodos', () => {
    it('should return an empty array initially', () => {
      expect(todoService.getTodos()).toEqual([]);
    });
  });

  describe('addTodo', () => {
    it('should add a new todo and return it', () => {
      const todo = todoService.addTodo('Test note');
      expect(todo).toHaveProperty('id', 1);
      expect(todo).toHaveProperty('note', 'Test note');
      expect(todoService.getTodos()).toContainEqual(todo);
    });
  });

  describe('updateTodo', () => {
    it('should update the note of an existing todo', () => {
      const todo = todoService.addTodo('Old note');
      const updated = todoService.updateTodo(todo.id, 'New note');
      expect(updated).toHaveProperty('id', todo.id);
      expect(updated).toHaveProperty('note', 'New note');
    });

    it('should return null if todo does not exist', () => {
      expect(todoService.updateTodo(999, 'Does not exist')).toBeNull();
    });
  });

  describe('removeTodo', () => {
    it('should remove a todo and return true', () => {
      const todo = todoService.addTodo('To be removed');
      expect(todoService.removeTodo(todo.id)).toBe(true);
      expect(todoService.getTodos()).not.toContainEqual(todo);
    });

    it('should return false if todo does not exist', () => {
      expect(todoService.removeTodo(999)).toBe(false);
    });
  });
});
