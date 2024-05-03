import { Request } from 'express';
export interface PaginationQuery {
  skip: number;
  limit: number;
}

export interface RequestCustom extends Request {
  query: {
    post?: string,
    limit?: string,
    page?: string
  }
}
