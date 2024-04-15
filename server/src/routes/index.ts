import { Router } from 'express';
import AuthRouter from './AuthRouter';

const router = Router();

router.use('/auth', AuthRouter);
// router.use('/example', authMiddleware, HomeRouter);

export default router;
