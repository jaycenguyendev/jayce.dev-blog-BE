import { MsgIds, logger } from '@/common/logger/logger';
import { ValidateUtils } from '@/common/utils/ValidateUtil';
import { RequestLoginDto } from './AuthDto';

export const validateLogin = () =>
  ValidateUtils.checkSchema<RequestLoginDto>(
    {
      username: {
        notEmpty: {
          errorMessage: {
            code: MsgIds.M005003,
            msg: logger.getMessage(MsgIds.M005003),
          },
        },
      },
      password: {
        notEmpty: {
          errorMessage: {
            code: MsgIds.M005004,
            msg: logger.getMessage(MsgIds.M005004),
          },
        },
      },
    },
    ['body']
  );
