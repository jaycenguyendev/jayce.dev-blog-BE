
import HttpStatusCode from '@/common/constants/HttpStatusCode';
import { ResponseCustom } from '@/common/interfaces/express';
import TagService from '@/modules/tag/TagService';
import { NextFunction, Request } from 'express';
class TagController {
  async getTags(req: Request, res: ResponseCustom, next: NextFunction) {
    try {
      const data = await TagService.getTags();
      return res.status(HttpStatusCode.OK).json({
        httpStatusCode: HttpStatusCode.OK,
        data
      })
    } catch (error) {
      next(error)
    }
  }

  async getTagsBySlug(req: Request, res: ResponseCustom, next: NextFunction) {
    try {
      const { slug } = req.params
      const data = await TagService.getTagsBySlug(slug);
      return res.status(HttpStatusCode.OK).json({
        httpStatusCode: HttpStatusCode.OK,
        data
      })
    } catch (error) {
      next(error)
    }
  }
}

export default new TagController();