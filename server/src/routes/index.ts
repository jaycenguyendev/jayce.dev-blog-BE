import postRouter from '@/routes/PostRouter';
import { Router } from 'express';

const router = Router();

router.use('/posts', postRouter);

export default router;
