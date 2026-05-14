import { Router } from 'express';

import Paths from '@src/common/constants/Paths';
import UserRoutes from './UserRoutes';

const apiRouter = Router();

// add user router

const userRouter = Router();

// Get all users
userRouter.get(Paths.Users.Get, UserRoutes.getAll)

// Add userRouter
apiRouter.use(Paths.Users.Base, userRouter);

export default apiRouter;