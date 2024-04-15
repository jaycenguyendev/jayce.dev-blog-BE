import { ValidationError } from 'express-validator';
import * as jwt from 'jsonwebtoken';
import { merge } from 'lodash';
import config from '../configs';
import { ErrorDetail } from '../interfaces/express';

type SignOptions = {
  jWTSecretKey: string;
};

type VerifyOptions = {
  errorOptions?: ErrorDetail | ValidationError[];
  error?: (error: Error | null, decoded?: object) => void;
} & SignOptions;

export default class JwtUtils {
  private static verifyOptionsDefault: VerifyOptions = {
    jWTSecretKey: config.JWTSecretKey,
  };

  /**
   * Generates a JWT based on the provided JSON payload
   * @param json The JSON payload to be encoded in the token
   * @param expiresIn The expiration time for the token. Default to '7d'
   * @param signOptions The signOptions parameter is an optional object
   * @returns A promise the resolves to the generated token string
   */
  static sign(
    json: string | Buffer | object,
    expiresIn = config.JwtExpiredTime,
    signOptions?: SignOptions
  ): Promise<string> {
    const jWTSecretKey = config.JWTSecretKey ?? signOptions?.jWTSecretKey;
    return new Promise<string>((resolve, reject) => {
      jwt.sign(json, jWTSecretKey, { expiresIn }, (error: Error | null, encoded: string | undefined) => {
        if (error) {
          reject(error);
        } else {
          resolve(encoded!);
        }
      });
    });
  }

  /**
   * Verifies the authenticity of a JWT token and returns the decoded payload.
   * @param token The JWT token to be verified.
   * @param verifyOptions - The verifyOptions parameter is an optional object
   * @returns A promise that resolves to the decoded payload.
   */
  static async verify<T>(token: string, verifyOptions?: Partial<VerifyOptions>): Promise<T> {
    const { jWTSecretKey, errorOptions, error: errorCallback } = merge(this.verifyOptionsDefault, verifyOptions);
    return new Promise((resolve, reject) => {
      jwt.verify(token, jWTSecretKey, (error: Error | null, decoded?: object) => {
        if (error) {
          if (errorCallback) {
            errorCallback(error, decoded);
          }
          reject(errorOptions || error);
        } else {
          resolve(decoded as T);
        }
      });
    });
  }
}
