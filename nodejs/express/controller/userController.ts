import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.join(__dirname, '../../../express/data/user.json');
//console.log('__dirname: '+__dirname);
//console.log('usersFilePath: '+dataPath);
export const getUsers = (req: Request, res: Response) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read user data' });
    }
    res.json(JSON.parse(data));
  });
};

export const addUser = (req: Request, res: Response) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read user data' });
    }
    const users = JSON.parse(data);
    const newUser = req.body;
    users.push(newUser);
    fs.writeFile(dataPath, JSON.stringify(users, null, 2), err => {
      if (err) {
        return res.status(500).json({ error: 'Failed to write user data' });
      }
      res.status(201).json(newUser);
    });
  });
};
