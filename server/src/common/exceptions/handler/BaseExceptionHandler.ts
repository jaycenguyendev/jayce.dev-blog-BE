import HttpStatusCode from '@/common/constants/HttpStatusCode';
import { BodyResponse, ErrorDetail } from '@/common/interfaces/express';
import { MsgIds, logger } from '@/common/logger/logger';
import { Response } from 'express';
import { isArray } from 'lodash';
import BaseException from '../BaseException';

class BaseExceptionHandler {
  public handleError(error: Error | BaseException, response?: Response): void {
    if (this.isTrustedError(error) && response) {
      this.handleTrustedError(error as BaseException, response);
    } else {
      this.handleUntrustedError(error as Error, response);
    }
  }

  public isTrustedError(error: Error | BaseException): boolean {
    // Return true if error is an instance of BaseException and is operational
    return error instanceof BaseException && error.isOperational;
  }

  private handleTrustedError(error: BaseException, response: Response): void {
    const statusCode = error.httpCode;
    // If error.errors is not an array, wrap it in an array. Otherwise, use it as is.
    const errors: ErrorDetail[] = isArray(error.errors) ? error.errors : [error.errors];
    const responseData: BodyResponse = {
      httpStatusCode: statusCode,
      errors,
    };
    if (statusCode === HttpStatusCode.INTERNAL_SERVER_ERROR) {
      errors[0].errorMessage = 'Internal Server Error';
    }

    response.status(statusCode).json(responseData);
  }

  private handleUntrustedError(error: Error, response?: Response): void {
    const statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;
    logger.writeWithError(MsgIds.M003003, error);
    const errorDetail: ErrorDetail = { errorCode: MsgIds.M003003, errorMessage: logger.getMessage(MsgIds.M003003) };
    const responseData: BodyResponse = {
      httpStatusCode: statusCode,
      errors: [errorDetail],
    };
    response?.status(statusCode).json(responseData);
  }
}

export default new BaseExceptionHandler();
