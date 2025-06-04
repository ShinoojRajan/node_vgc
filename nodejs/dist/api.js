"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const url = require("url");
function createResponse(res, statusCode, data, contentType = 'text/plain') {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', contentType);
    res.end(data);
}
const server = http.createServer((req, res) => {
    const parseURL = url.parse(req.url || '', true);
    if (parseURL.pathname === '/' && req.method === 'GET') {
        createResponse(res, 200, 'Hello!! This is a Node.js application using TypeScript.');
        return;
        //res.statusCode = 200;
        //res.setHeader('Content-Type', 'text/plain');
        //res.end('Hello!! This is a Node.js application using TypeScript.');
    }
    else if (parseURL.pathname === '/user' && req.method === 'GET') {
        const userName = parseURL.query.userName;
        console.log(userName);
        if (userName === 'shinoj') {
            const user = {
                username: 'shinoj',
                email: 'shinoj@gmail.com',
                age: 30
            };
            createResponse(res, 200, user.username + ' ' + user.email + ' ' + user.age);
            return;
        }
        createResponse(res, 200, 'from user', 'text/plain');
        return;
        //res.statusCode = 200;
        //res.setHeader('Content-Type', 'text/plain');
        // res.end('from user');
    }
    else {
        createResponse(res, 404, 'Failure!!.try again...', 'text/plain');
        //res.statusCode = 200;
        //res.setHeader('Content-Type', 'text/plain');
        //res.end('Failure!!.try again...');
    }
});
server.listen(3004, () => {
    console.log('Server is running on http://localhost:3004');
});
