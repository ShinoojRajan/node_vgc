"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello!! This is a Node.js application using TypeScript.');
});
server.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});
