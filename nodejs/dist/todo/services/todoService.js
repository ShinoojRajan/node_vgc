"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodos = getTodos;
exports.addTodo = addTodo;
exports.updateTodo = updateTodo;
exports.removeTodo = removeTodo;
let todos = [];
function getTodos() {
    return todos;
}
function addTodo(note) {
    const newTodo = {
        id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
        note
    };
    todos.push(newTodo);
    return newTodo;
}
function updateTodo(id, note) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.note = note;
        return todo;
    }
    return null;
}
function removeTodo(id) {
    const index = todos.findIndex(t => t.id === id);
    if (index !== -1) {
        todos.splice(index, 1);
        return true;
    }
    return false;
}
