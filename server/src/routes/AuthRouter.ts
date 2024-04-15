import { authMiddleware } from '@/common/middlewares/authMiddlewares';
import { validateLogin } from '@/modules/auth/AuthValidate';
import AuthController from '@/modules/auth/AuthController';
import { Router } from 'express';

const authRouter = Router();

authRouter.get('/me', authMiddleware, AuthController.getMe);
authRouter.post('/login', validateLogin(), AuthController.login);
export default authRouter;
