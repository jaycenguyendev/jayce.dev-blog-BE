import { RequestLoginDto, ResponseLoginDto } from './AuthDto';
import BadRequestException from '@/common/exceptions/BadRequestException';
import { PasswordUtils } from '@/common/utils/PasswordUtil';
import UnauthorizedException from '@/common/exceptions/UnauthorizedException';
import JwtUtils from '@/common/utils/JwtUtil';
import { MsgIds, logger } from '@/common/logger/logger';
import { User } from '@/databases/entities/User';

class AuthService {
  /**
   * Logs in a user and returns the login response.
   * @param data - The login request data.
   * @returns The login response.
   * @throws BadRequestException if the username is not found or the password is incorrect.
   */
  async login(data: RequestLoginDto): Promise<ResponseLoginDto> {
    const userInfo = await User.findOne({
      where: {
        username: data.username,
      },
      select: {
        username: true,
        password: true,
      },
    });

    if (!userInfo) {
      const parameters = { username: data.username };
      logger.writeWithParameter(MsgIds.M005001, parameters);
      throw new BadRequestException({
        errorCode: MsgIds.M005001,
        errorMessage: logger.getMessage(MsgIds.M005001),
      });
    }

    const isCheckMatchPassword = await PasswordUtils.comparePassword(data.password, userInfo?.password);
    if (!isCheckMatchPassword) {
      const parameters = { username: data.username, password: data.password };
      logger.writeWithParameter(MsgIds.M005001, parameters);
      throw new BadRequestException({
        errorCode: MsgIds.M005001,
        errorMessage: logger.getMessage(MsgIds.M005001),
      });
    }

    const accessToken = await JwtUtils.sign({
      username: userInfo.username,
    });

    const { password, ...rest } = userInfo;

    return new ResponseLoginDto(rest, accessToken);
  }

  /**
   * Retrieves user information by username.
   * @param username - The username of the user.
   * @returns The user information.
   * @throws UnauthorizedException if the username is not found.
   */
  async getMe(username: string): Promise<ResponseLoginDto> {
    const userInfo = await User.findOne({
      where: {
        username,
      },
      select: {
        username: true,
      },
    });

    if (!userInfo) {
      const parameters = { username };
      logger.writeWithParameter(MsgIds.M005002, parameters);
      throw new UnauthorizedException({
        errorCode: MsgIds.M005002,
        errorMessage: logger.getMessage(MsgIds.M005002),
      });
    }

    return new ResponseLoginDto(userInfo);
  }
}

export default new AuthService();
