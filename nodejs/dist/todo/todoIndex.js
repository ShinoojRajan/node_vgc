"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoRoute_1 = __importDefault(require("./routes/todoRoute"));
const loggerMiddleware_1 = require("./middlewares/loggerMiddleware");
const authentication_1 = __importDefault(require("./middlewares/authentication"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(authentication_1.default.initialize());
app.use('/todo', loggerMiddleware_1.loggerMiddleware, authentication_1.default.authenticate('basic', { session: false }), todoRoute_1.default);
app.listen(3009, () => {
    console.log('Server is running on port 3009');
});
exports.default = app;
