import { Router } from "express";
import NotRoute from './notRouter.js'
import UserRouter from './userRouter.js';

import AuthCheck from '../jwt/AuthCheck.js'
const router = Router();

router.use('/not',AuthCheck,NotRoute);
router.use('/user',UserRouter);

export default router;