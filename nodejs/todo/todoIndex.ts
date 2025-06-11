import express, { Request, Response, NextFunction } from 'express';
import todoRoute from './routes/todoRoute';
import { loggerMiddleware } from './middlewares/loggerMiddleware';
import passport from './middlewares/authentication';

const app = express();

app.use(express.json());
app.use(passport.initialize());
app.use('/todo', loggerMiddleware,passport.authenticate('basic', { session: false }), todoRoute);

app.listen(3009, () => {
  console.log('Server is running on port 3009');
});

export default app;