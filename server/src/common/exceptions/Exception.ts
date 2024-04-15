import { ErrorDetail } from './../interfaces/express';
import { ValidationError } from 'express-validator';
import HttpStatusCode from '../constants/HttpStatusCode';
import BaseException from './BaseException';

export default class Exception extends BaseException {
  constructor(description: ValidationError[] | ErrorDetail, httpCode: HttpStatusCode) {
    super({
      httpCode,
      description,
    });
  }
}
