import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import { URL } from 'url';
import { User } from './model/User';

const PORT = 3005;
const usersFilePath = path.join(__dirname, '../../userTask/data/User.json');
console.log('__dirname'+__dirname);
console.log('usersFilePath: '+usersFilePath);

// Utility to read users
const readUsers = (): User[] => {
  const data = fs.readFileSync(usersFilePath, 'utf-8');
  return JSON.parse(data);
};

// Utility to write users
const writeUsers = (users: User[]) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Utility to parse request body
const parseRequestBody = (req: http.IncomingMessage): Promise<any> => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject('Invalid JSON');
      }
    });
  });
};

function createResponse(res: http.ServerResponse,statusCode:number,data:string,contentType:string='application/json'){
    res.statusCode=statusCode;
    res.setHeader('Content-Type', contentType);
    res.end(data);
}

// Server handler
const server = http.createServer(async (req: http.IncomingMessage, res: http.ServerResponse) => {
  const parsedUrl = new URL(req.url || '', `http://${req.headers.host}`);
  console.log(req.url);

  // GET /user?username=...
  if (req.method === 'GET' && parsedUrl.pathname === '/user') {
    const username = parsedUrl.searchParams.get('username');

    if (!username) {
      //.writeHead(400, { 'Content-Type': 'application/json' });
      //res.end(JSON.stringify({ message: 'Username query parameter is required' }));
      createResponse(res,400,JSON.stringify({ message: 'Username query parameter is required' }));
      return;
    }

    const users = readUsers();
    const user = users.find(u => u.username === username);

    if (user) {
     // res.writeHead(200, { 'Content-Type': 'application/json' });
      //res.end(JSON.stringify(user));
      createResponse(res,200,JSON.stringify(user));
      
    } else {
      //res.writeHead(404, { 'Content-Type': 'application/json' });
     //res.end(JSON.stringify({ message: 'User not found' }));
      createResponse(res,404,JSON.stringify({ message: 'User not found' }));
    }

  // POST /user
  } else if (req.method === 'POST' && parsedUrl.pathname === '/user') {
    try {
      const body = await parseRequestBody(req);
      const { username, name, email } = body;

      if (!username || !name || !email) {
       // res.writeHead(400, { 'Content-Type': 'application/json' });
        //res.end(JSON.stringify({ message: 'username, name, and email are required' }));
        createResponse(res,400,JSON.stringify({ message: 'username, name, and email are required' }));
        return;
      }

      const users = readUsers();
      const existingUser = users.find(u => u.username === username);

      if (existingUser) {
        //res.writeHead(409, { 'Content-Type': 'application/json' });
        //res.end(JSON.stringify({ message: 'Username already exists' }));
        createResponse(res,409,JSON.stringify({ message: 'Username already exists' }));
        return;
      }

      const newUser: User = { username, name, email };
      users.push(newUser);
      writeUsers(users);

      //res.writeHead(201, { 'Content-Type': 'application/json' });
      //res.end(JSON.stringify({ message: 'User added successfully', user: newUser }));
      createResponse(res,201,JSON.stringify({ message: 'User added successfully', user: newUser }));

    } catch (error) {
      //res.writeHead(400, { 'Content-Type': 'application/json' });
      //res.end(JSON.stringify({ message: error }));
      createResponse(res,400,JSON.stringify({ message: error }));
    }

  // 404 Not Found
  } else {
    //res.writeHead(404, { 'Content-Type': 'application/json' });
    //res.end(JSON.stringify({ message: 'Endpoint not found' }));
    createResponse(res,404,JSON.stringify({ message: 'Endpoint not found' }));
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
