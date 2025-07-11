"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodoById = exports.updateTodoById = exports.createTodo = exports.getAllTodos = void 0;
const todoService = __importStar(require("../services/todoService"));
const getAllTodos = (req, res) => {
    res.status(200).json(todoService.getTodos());
};
exports.getAllTodos = getAllTodos;
const createTodo = (req, res) => {
    const { note } = req.body;
    if (!note) {
        res.status(400).json({ error: 'Note is required' });
        return;
    }
    const todo = todoService.addTodo(note);
    res.status(201).json(todo);
};
exports.createTodo = createTodo;
const updateTodoById = (req, res) => {
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
exports.updateTodoById = updateTodoById;
const deleteTodoById = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const removed = todoService.removeTodo(id);
    if (!removed) {
        res.status(404).json({ error: 'Todo not found' });
        return;
    }
    res.status(204).send();
};
exports.deleteTodoById = deleteTodoById;
