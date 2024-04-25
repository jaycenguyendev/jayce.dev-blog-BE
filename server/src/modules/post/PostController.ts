import HttpStatusCode from '@/common/constants/HttpStatusCode';
import { ResponseCustom } from '@/common/interfaces/express';
import { delay } from '@/common/utils/DelayUtil';
import { PaginationQuery } from '@/modules/post/Post.type';
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
      const { query } = req
      const limit = Number(query?.limit);
      const skip = (Number(query?.page) - 1) * limit;

      const paginationQuery: PaginationQuery | undefined = limit && skip ? {
        skip,
        limit
      } : undefined;

      const data = await PostService.getPosts(paginationQuery);

      let delayres = await delay(3000);
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
