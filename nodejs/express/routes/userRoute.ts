import { Router } from 'express';
import { getUsers, addUser } from '../controller/userController';

const router = Router();

// router.get('/', (req: Request, res: Response) => {
//   res.send('User route root');
// });

router.get('/', getUsers);
router.post('/', addUser);

export { router };
