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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const url_1 = require("url");
const PORT = 3005;
const usersFilePath = path.join(__dirname, '../../userTask/data/User.json');
console.log('__dirname' + __dirname);
console.log('usersFilePath: ' + usersFilePath);
// Utility to read users
const readUsers = () => {
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data);
};
// Utility to write users
const writeUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};
// Utility to parse request body
const parseRequestBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            }
            catch (error) {
                reject('Invalid JSON');
            }
        });
    });
};
function createResponse(res, statusCode, data, contentType = 'application/json') {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', contentType);
    res.end(data);
}
// Server handler
const server = http.createServer((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedUrl = new url_1.URL(req.url || '', `http://${req.headers.host}`);
    console.log(req.url);
    // GET /user?username=...
    if (req.method === 'GET' && parsedUrl.pathname === '/user') {
        const username = parsedUrl.searchParams.get('username');
        if (!username) {
            //.writeHead(400, { 'Content-Type': 'application/json' });
            //res.end(JSON.stringify({ message: 'Username query parameter is required' }));
            createResponse(res, 400, JSON.stringify({ message: 'Username query parameter is required' }));
            return;
        }
        const users = readUsers();
        const user = users.find(u => u.username === username);
        if (user) {
            // res.writeHead(200, { 'Content-Type': 'application/json' });
            //res.end(JSON.stringify(user));
            createResponse(res, 200, JSON.stringify(user));
        }
        else {
            //res.writeHead(404, { 'Content-Type': 'application/json' });
            //res.end(JSON.stringify({ message: 'User not found' }));
            createResponse(res, 404, JSON.stringify({ message: 'User not found' }));
        }
        // POST /user
    }
    else if (req.method === 'POST' && parsedUrl.pathname === '/user') {
        try {
            const body = yield parseRequestBody(req);
            const { username, name, email } = body;
            if (!username || !name || !email) {
                // res.writeHead(400, { 'Content-Type': 'application/json' });
                //res.end(JSON.stringify({ message: 'username, name, and email are required' }));
                createResponse(res, 400, JSON.stringify({ message: 'username, name, and email are required' }));
                return;
            }
            const users = readUsers();
            const existingUser = users.find(u => u.username === username);
            if (existingUser) {
                //res.writeHead(409, { 'Content-Type': 'application/json' });
                //res.end(JSON.stringify({ message: 'Username already exists' }));
                createResponse(res, 409, JSON.stringify({ message: 'Username already exists' }));
                return;
            }
            const newUser = { username, name, email };
            users.push(newUser);
            writeUsers(users);
            //res.writeHead(201, { 'Content-Type': 'application/json' });
            //res.end(JSON.stringify({ message: 'User added successfully', user: newUser }));
            createResponse(res, 201, JSON.stringify({ message: 'User added successfully', user: newUser }));
        }
        catch (error) {
            //res.writeHead(400, { 'Content-Type': 'application/json' });
            //res.end(JSON.stringify({ message: error }));
            createResponse(res, 400, JSON.stringify({ message: error }));
        }
        // 404 Not Found
    }
    else {
        //res.writeHead(404, { 'Content-Type': 'application/json' });
        //res.end(JSON.stringify({ message: 'Endpoint not found' }));
        createResponse(res, 404, JSON.stringify({ message: 'Endpoint not found' }));
    }
}));
// Start server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
