import { DataSourceOptions } from 'typeorm';
import { ENV } from '../interfaces/env';
import dotenv from 'dotenv';
dotenv.config();
class ConfigService {
  getEnv(key: keyof ENV): string {
    if (!process.env[key]) {
      throw new Error(key + ' environment variable does not set');
    }
    return process.env[key]!;
  }

  get postgresConfig(): DataSourceOptions {
    return {
      schema: this.schema,
      host: this.getEnv('DB_HOST'),
      port: Number.parseInt(this.getEnv('DB_PORT')),
      username: this.getEnv('DB_USERNAME'),
      password: this.getEnv('DB_PASSWORD'),
      database: this.getEnv('DB_DATABASE'),
      type: 'postgres',
      synchronize: this.isDevelopment ? true : false,
      logging: this.isDevelopment,
    };
  }

  get schema(): 'dev' | 'prod' {
    return this.isProduction ? 'prod' : 'dev';
  }

  get isProduction(): boolean {
    return this.getEnv('NODE_ENV') === 'production';
  }

  get isDevelopment(): boolean {
    return this.getEnv('NODE_ENV') === 'development';
  }

  get contextPath(): string {
    return this.getEnv('CONTEXT_PATH');
  }

  get portServer(): number {
    return Number.parseInt(this.getEnv('PORT'));
  }

  get hostServer(): string {
    return this.getEnv('HOST');
  }

  get JWTSecretKey(): string {
    return this.getEnv('JWT_SECRET_KEY');
  }

  get JwtExpiredTime() {
    return this.getEnv('JWT_EXPIRED_TIME');
  }
}

const config = new ConfigService();

export default config;
