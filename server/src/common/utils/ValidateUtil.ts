import { checkSchema, Location, ParamSchema } from 'express-validator';

export class ValidateUtils {
  static checkSchema<DTO>(schema: Record<keyof DTO, ParamSchema>, defaultLocations?: Location[]) {
    return checkSchema(schema, defaultLocations);
  }
}
