import postRouter from '@/routes/PostRouter';
import tagRouter from '@/routes/TagRouter';
import { Router } from 'express';

const router = Router();

router.use('/posts', postRouter);
router.use('/tags', tagRouter)

export default router;
