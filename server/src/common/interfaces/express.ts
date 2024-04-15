import { Response } from 'express';

export interface ErrorDetail {
  errorCode: string;
  errorMessage: string;
}

export interface BodyResponse {
  httpStatusCode: number;
  data?: any;
  errors?: ErrorDetail[];
}

export interface Session {
  username: string;
}

declare module 'express' {
  interface Request {
    session: Session;
  }
}

export type ResponseCustom = Response<BodyResponse>;
