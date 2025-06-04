const http = require('http');


const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Get using javascript');
    }
    else if (req.method === 'POST' && req.url === '/api/greet') {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const { name } = JSON.parse(body);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `Hello, ${name}!` }));
        });
    }
    else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});


server.listen(3002, () => {
    console.log('Server is running on http://localhost:3002');
});