const http = require('http');


const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello!!.This is Node.js application using javascript');
});


server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});