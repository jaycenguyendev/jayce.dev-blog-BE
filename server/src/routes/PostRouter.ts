import PostController from '@/modules/post/PostController';
import { Router } from 'express';

const postRouter = Router();
postRouter.get('/', PostController.getPosts);

export default postRouter;
