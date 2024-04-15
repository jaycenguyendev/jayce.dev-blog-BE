import bcrypt from 'bcryptjs';

export class PasswordUtils {
  static async comparePassword(password: string, passwordInDB: string): Promise<boolean> {
    const isCheckMatchPassword = await bcrypt.compare(password, passwordInDB);
    return isCheckMatchPassword;
  }
}
