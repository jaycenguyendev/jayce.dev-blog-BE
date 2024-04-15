import { NextFunction, Request } from 'express';
import UnauthorizedException from '../exceptions/UnauthorizedException';
import { ResponseCustom, Session } from '../interfaces/express';
import { MsgIds, logger } from '../logger/logger';
import JwtUtils from '../utils/JwtUtil';

export const authMiddleware = async (req: Request, _res: ResponseCustom, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) {
      const parameters = { reason: 'The token is missing' };
      logger.writeWithParameter(MsgIds.M005002, parameters);
      throw new UnauthorizedException({
        errorCode: MsgIds.M005002,
        errorMessage: logger.getMessage(MsgIds.M005002),
      });
    }

    const userInfo = await JwtUtils.verify<Session>(token, {
      error(__, _) {
        const parameters = { reason: 'Verify token failed' };
        logger.writeWithParameter(MsgIds.M005002, parameters);
        throw new UnauthorizedException({
          errorCode: MsgIds.M005002,
          errorMessage: logger.getMessage(MsgIds.M005002),
        });
      },
    });
    req.session = userInfo;
    next();
  } catch (error) {
    next(error);
  }
};
