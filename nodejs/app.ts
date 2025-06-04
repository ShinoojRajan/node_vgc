import * as http from 'http';

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello!! This is a Node.js application using TypeScript.');
});

server.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});