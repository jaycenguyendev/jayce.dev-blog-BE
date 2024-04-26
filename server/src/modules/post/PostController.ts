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
      const limit = Math.abs(Number(query?.limit));
      const skip = Math.abs((Number(query?.page) - 1) * limit);

      let paginationQuery: PaginationQuery | undefined = undefined;
      if ((limit >= 0 || skip >= 0) && (!isNaN(limit) && !isNaN(skip))) {
        paginationQuery = {
          skip,
          limit
        }
      }
      const data = await PostService.getPosts(paginationQuery);

      // let delayres = await delay(2000);
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
