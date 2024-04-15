import { ErrorArgs } from '../interfaces/error';
import { ErrorDetail } from '../interfaces/express';

export default class BaseException extends Error {
  public readonly httpCode: number;

  public readonly isOperational: boolean = true;

  public readonly errors: ErrorDetail | ErrorDetail[];

  constructor(args: ErrorArgs) {
    super(JSON.stringify(args.description));

    // If description is an array, map it to a new format
    if (Array.isArray(args.description)) {
      this.errors = args.description.map(({ msg }) => ({
        errorCode: msg.code,
        errorMessage: msg.msg,
      }));
    } else {
      this.errors = args.description;
    }

    Object.setPrototypeOf(this, new.target.prototype);
    this.httpCode = args.httpCode;
    if (args.isOperational !== undefined) {
      this.isOperational = args.isOperational;
    }
  }
}
