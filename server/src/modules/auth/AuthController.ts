import HttpStatusCode from '@/common/constants/HttpStatusCode';
import BadRequestException from '@/common/exceptions/BadRequestException';
import { ResponseCustom } from '@/common/interfaces/express';
import { NextFunction, Request } from 'express';
import { validationResult } from 'express-validator';
import AuthService from './AuthService';
import { RequestLoginDto } from './AuthDto';

/**
 * Handles authentication-related requests.
 */
class AuthController {
  /**
   * Handles the login request.
   * @param req The request object.
   * @param res The response object.
   * @param next The next function.
   */
  async login(req: Request, res: ResponseCustom, next: NextFunction) {
    try {
      const resultErrors = validationResult(req);
      if (!resultErrors.isEmpty()) {
        throw new BadRequestException(resultErrors.array());
      }

      const data = await AuthService.login(req.body as RequestLoginDto);
      return res.status(HttpStatusCode.OK).json({
        httpStatusCode: HttpStatusCode.OK,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles the getSession request.
   * @param req The request object.
   * @param res The response object.
   * @param next The next function.
   */
  async getMe(req: Request, res: ResponseCustom, next: NextFunction) {
    try {
      const {
        session: { username },
      } = req;
      const data = await AuthService.getMe(username);
      return res.status(HttpStatusCode.OK).json({
        httpStatusCode: HttpStatusCode.OK,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
