import { User } from '@/databases/entities/User';

// RequestLoginDto represents the data required for a login request
export class RequestLoginDto {
  username: string;

  password: string;
}

// ResponseLoginDto represents the data returned after a successful login
export class ResponseLoginDto {
  accessToken?: string;

  user: Partial<User>;

  constructor(data: Partial<User>, accessToken?: string) {
    this.user = data;
    this.accessToken = accessToken;
  }
}
