import { ValidationError } from 'express-validator';
import HttpStatusCode from '../constants/HttpStatusCode';
import { ErrorDetail } from '../interfaces/express';
import BaseException from './BaseException';

export default class BadRequestException extends BaseException {
  constructor(description: ValidationError[] | ErrorDetail) {
    super({
      httpCode: HttpStatusCode.BAD_REQUEST,
      description,
    });
  }
}
