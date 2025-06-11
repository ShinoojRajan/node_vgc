export interface TodoItem {
  id: number;
  note: string;
}

let todos: TodoItem[] = [];

export function getTodos(): TodoItem[] {
  return todos;
}

export function addTodo(note: string): TodoItem {
  const newTodo: TodoItem = {
    id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
    note
  };
  todos.push(newTodo);
  return newTodo;
}

export function updateTodo(id: number, note: string): TodoItem | null {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.note = note;
    return todo;
  }
  return null;
}

export function removeTodo(id: number): boolean {
  const index = todos.findIndex(t => t.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
    return true;
  }
  return false;
}
