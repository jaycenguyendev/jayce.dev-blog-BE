import HttpStatusCode from '../constants/HttpStatusCode';
import { MsgIds } from '../logger/logger';
import BaseException from './BaseException';

export default class InternalServerException extends BaseException {
  constructor(errorMessage: string) {
    super({
      httpCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      description: {
        errorCode: MsgIds.M003003,
        errorMessage,
      },
    });
  }
}
