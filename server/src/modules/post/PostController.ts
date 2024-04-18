import HttpStatusCode from '@/common/constants/HttpStatusCode';
import { ResponseCustom } from '@/common/interfaces/express';
import PostService from '@/modules/post/PostService';
import { NextFunction, Request } from 'express';

/**
 * Handles posts-related requests.
 */
class PostController {
  /**
   * Handles the getPosts request.
   * @param req The request object.
   * @param res The response object.
   * @param next The next function.
   */
  async getPosts(req: Request, res: ResponseCustom, next: NextFunction) {
    try {
      const data = await PostService.getPosts();
      return res.status(HttpStatusCode.OK).json({
        httpStatusCode: HttpStatusCode.OK,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new PostController();
