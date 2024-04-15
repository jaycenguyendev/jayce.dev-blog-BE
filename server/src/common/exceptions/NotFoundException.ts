import { ErrorDetail } from './../interfaces/express';
import { ValidationError } from 'express-validator';
import HttpStatusCode from '../constants/HttpStatusCode';
import BaseException from './BaseException';

export default class NotFoundException extends BaseException {
  constructor(description: ValidationError[] | ErrorDetail) {
    super({
      httpCode: HttpStatusCode.NOT_FOUND,
      description,
    });
  }
}
