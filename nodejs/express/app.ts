import express from 'express';
import {router as userRoute} from './routes/userRoute';
import { User } from './model/User';

const app = express();

// Validation middleware for /user path
 function validateUser(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (req.method === 'POST') {
    const user = req.body as User;
    if (!user.name || !user.email ) {
       res.status(400).json({ error: 'Name and email are required.' });
      return;
    }
    if(typeof user.age !== 'number'){
         res.status(400).json({ error: 'age must be number' });
        return; 
    }
  }
  next();
}

app.use(express.json());
app.use('/user', validateUser,userRoute);

app.listen(3008, () => {
  console.log('Server is running on port 3008');
});

export default app;
