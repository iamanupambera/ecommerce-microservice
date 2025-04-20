import { GatewayJwtService } from '../gatewayJwt/gatewayJwt.service';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  AuthVerifyEmailDto,
  ChangePasswordDTO,
  AuthForgotPasswordDto,
  LoginDto,
  PasswordDTO,
  RegisterDto,
  VerifyOtpDto,
} from '@repo/validator/index';
import { ClientProxy } from '@nestjs/microservices';
import {
  AuthJwtPayload,
  CommonErrors,
  LoggerService,
  RedisService,
} from '@repo/modules/index';
import { AuthRepository } from './auth.repository';
import { ConfigService } from '@nestjs/config';
import crypto, { randomInt } from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private configService: ConfigService,
    @Inject('USER_SERVICE')
    private readonly userService: ClientProxy,
    @Inject('NOTIFICATION_SERVICE')
    private readonly notificationService: ClientProxy,
    private readonly jwtService: JwtService,
    private readonly gatewayJwtService: GatewayJwtService,
    private readonly logger: LoggerService,
    private readonly redisService: RedisService,
  ) {}

  async register({
    username,
    email,
    password,
    country,
    profilePicture,
    browserName,
    deviceType,
  }: RegisterDto) {
    if (
      (await this.authRepository.findByUsername(username)) ||
      (await this.authRepository.findByEmail(email))
    ) {
      throw new ConflictException(CommonErrors.EmailOrUserNameAlreadyExist);
    }

    const randomCharacters = crypto.randomBytes(20).toString('hex');
    const user = await this.authRepository.create({
      username,
      email,
      profilePublicId: '13vuhbk',
      password,
      country,
      profilePicture,
      emailVerificationToken: randomCharacters,
      browserName,
      deviceType,
      lastActiveAt: new Date(),
    });

    // create user default as buyer
    this.userService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller: 'buyer', cmd: 'create' },
        {
          userToken: null,
          serviceToken: await this.gatewayJwtService.generateToken('USER'),
          payload: {
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
            country: user.country,
            createdAt: user.createdAt,
          },
          user: null,
        },
      )
      .subscribe({
        error: (error) => {
          this.logger.log(
            'error',
            AuthService.name + ' service error at auth register',
            error,
          );
        },
      });

    // send mail to user to verify email
    this.notificationService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller: 'auth_email_controller', cmd: 'verifyEmail' },
        {
          userToken: null,
          serviceToken:
            await this.gatewayJwtService.generateToken('NOTIFICATION'),
          payload: {
            receiverEmail: email,
            verifyLink: `${this.configService.getOrThrow('CLIENT_URL')}/confirm_email?v_token=${randomCharacters}&email=${user.email}`,
          },
          user: null,
        },
      )
      .subscribe({
        error: (error) => {
          this.logger.log(
            'error',
            AuthService.name + ' service error at auth register',
            error,
          );
        },
      });

    const accessTokenOtp = randomInt(10 ** 5, 10 ** 6 - 1).toString();
    const refreshTokenOtp = randomInt(10 ** 5, 10 ** 6 - 1).toString();
    const session = await this.authRepository.createSession(user.id, {
      accessToken: accessTokenOtp,
      refreshToken: refreshTokenOtp,
    });

    await this.storeSession(user.id, session.id, session.accessToken);
    const accessTokenPayload: AuthJwtPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
      sessionId: session.id,
      otp: session.accessToken,
    };

    const refreshTokenPayload: AuthJwtPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
      sessionId: session.id,
      otp: session.refreshToken,
    };

    const accessToken = this.jwtService.sign(accessTokenPayload, {
      expiresIn: '15m',
    });
    const refreshToken = this.jwtService.sign(refreshTokenPayload, {
      expiresIn: '183d',
    });

    return {
      statusCode: 201,
      response: { user, token: { accessToken, refreshToken } },
      message: 'User created successfully',
    };
  }

  async login({ identifier, password, browserName, deviceType }: LoginDto) {
    const user = await this.authRepository.getUserWithPassword(identifier);

    if (!user) {
      throw new NotFoundException(CommonErrors.UserNotFound);
    }

    const validPassword = await this.authRepository.isValidatePassword(
      user,
      password,
    );

    if (!validPassword) {
      throw new UnauthorizedException(CommonErrors.InvalidCredential);
    }

    delete user.authPassword;

    if (browserName !== user.browserName || deviceType !== user.deviceType) {
      const otp = randomInt(10 ** 5, 10 ** 6 - 1).toString();

      // user login from different device send verify email
      this.notificationService
        .send(
          { controller: 'auth_email_controller', cmd: 'otpEmail' },
          {
            userToken: null,
            serviceToken:
              await this.gatewayJwtService.generateToken('NOTIFICATION'),
            payload: {
              receiverEmail: user.email,
              username: user.username,
              otp,
            },
            user,
          },
        )
        .subscribe({
          error: (error) => {
            this.logger.log(
              'error',
              AuthService.name + ' service error at auth login',
              error,
            );
          },
        });

      const date: Date = new Date();
      date.setMinutes(date.getMinutes() + 10);
      await this.authRepository.updateUserOTP(user.id, otp, date, '', '');

      return {
        statusCode: 200,
        response: {
          browserName: user.browserName,
          deviceType: user.deviceType,
        },
        message: 'OTP code sent',
      };
    }

    const accessTokenOtp = randomInt(10 ** 5, 10 ** 6 - 1).toString();
    const refreshTokenOtp = randomInt(10 ** 5, 10 ** 6 - 1).toString();
    const session = await this.authRepository.createSession(user.id, {
      accessToken: accessTokenOtp,
      refreshToken: refreshTokenOtp,
    });
    await this.storeSession(user.id, session.id, session.accessToken);

    await this.authRepository.updateUserById(user.id, {
      lastActiveAt: new Date(),
    });
    const accessTokenPayload: AuthJwtPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
      sessionId: session.id,
      otp: session.accessToken,
    };

    const refreshTokenPayload: AuthJwtPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
      sessionId: session.id,
      otp: session.refreshToken,
    };

    const accessToken = this.jwtService.sign(accessTokenPayload, {
      expiresIn: '15m',
    });
    const refreshToken = this.jwtService.sign(refreshTokenPayload, {
      expiresIn: '183d',
    });

    return {
      statusCode: 200,
      response: { user, token: { accessToken, refreshToken } },
      message: 'User login successfully',
    };
  }

  async forgotPassword({ email }: AuthForgotPasswordDto) {
    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException(CommonErrors.UserNotFound);
    }

    const randomCharacters = crypto.randomBytes(20).toString('hex');
    const date = new Date();
    date.setHours(date.getHours() + 1);
    await this.authRepository.updatePasswordToken(
      user.id,
      randomCharacters,
      date,
    );

    const resetLink = `${this.configService.getOrThrow('CLIENT_URL')}/reset_password?token=${randomCharacters}&email=${user.email}`;

    // send forgotPassword mail to user
    this.notificationService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller: 'auth_email_controller', cmd: 'forgotPassword' },
        {
          userToken: null,
          serviceToken:
            await this.gatewayJwtService.generateToken('NOTIFICATION'),
          payload: {
            receiverEmail: user.email,
            resetLink,
            username: user.username,
          },
          user: null,
        },
      )
      .subscribe({
        error: (error) => {
          this.logger.log(
            'error',
            AuthService.name + ' service error at auth forgot password',
            error,
          );
        },
      });

    return {
      statusCode: 200,
      response: user,
      message: 'Password reset email sent.',
    };
  }

  async resetPassword({
    password,
    confirmPassword,
    token,
    email,
  }: PasswordDTO) {
    if (password !== confirmPassword) {
      throw new BadRequestException(CommonErrors.PasswordsNotMatch);
    }

    const user = await this.authRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException(CommonErrors.UserNotFound);
    }

    if (user.resetPasswordRequest?.token !== token) {
      throw new UnauthorizedException(CommonErrors.InvalidToken);
    }

    await this.authRepository.updatePassword(user.id, password, true);

    // send mail to user to notify
    this.notificationService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller: 'auth_email_controller', cmd: 'passwordChange' },
        {
          userToken: null,
          serviceToken:
            await this.gatewayJwtService.generateToken('NOTIFICATION'),
          payload: {
            receiverEmail: email,
            username: user.username,
          },
          user: null,
        },
      )
      .subscribe({
        error: (error) => {
          this.logger.log(
            'error',
            AuthService.name + ' service error at auth reset password',
            error,
          );
        },
      });

    return {
      statusCode: 200,
      response: {},
      message: 'Password successfully updated.',
    };
  }

  async changePassword(
    { newPassword, currentPassword }: ChangePasswordDTO,
    username: string,
  ) {
    const user = await this.authRepository.getUserWithPassword(username);

    if (!user) {
      throw new NotFoundException(CommonErrors.UserNotFound);
    }

    if (
      !(await this.authRepository.isValidatePassword(user, currentPassword))
    ) {
      throw new UnauthorizedException(CommonErrors.InvalidCredential);
    }

    if (await this.authRepository.isValidatePassword(user, newPassword)) {
      throw new BadRequestException(CommonErrors.SamePassword);
    }

    await this.authRepository.updatePassword(user.id, newPassword);

    // send mail to user to notify
    this.notificationService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller: 'auth_email_controller', cmd: 'passwordChange' },
        {
          userToken: null,
          serviceToken:
            await this.gatewayJwtService.generateToken('NOTIFICATION'),
          payload: {
            receiverEmail: user.email,
            username: user.username,
          },
          user: null,
        },
      )
      .subscribe({
        error: (error) => {
          this.logger.log(
            'error',
            AuthService.name + ' service error at auth change password',
            error,
          );
        },
      });

    return {
      statusCode: 200,
      response: {},
      message: 'Password successfully updated.',
    };
  }

  async verifyOtp({ browserName, deviceType, otp, email }: VerifyOtpDto) {
    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException(CommonErrors.UserNotFound);
    }

    if (user?.authOtp?.otp !== otp) {
      throw new UnauthorizedException(CommonErrors.InvalidOtp);
    }

    await this.authRepository.updateUserById(user.id, {
      browserName,
      deviceType,
      lastActiveAt: new Date(),
    });

    await this.authRepository.deleteUserOtp(user.authOtp.id);
    const accessTokenOtp = randomInt(10 ** 5, 10 ** 6 - 1).toString();
    const refreshTokenOtp = randomInt(10 ** 5, 10 ** 6 - 1).toString();
    const session = await this.authRepository.createSession(user.id, {
      accessToken: accessTokenOtp,
      refreshToken: refreshTokenOtp,
    });
    await this.storeSession(user.id, session.id, session.accessToken);

    const accessTokenPayload: AuthJwtPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
      sessionId: session.id,
      otp: session.accessToken,
    };

    const refreshTokenPayload: AuthJwtPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
      sessionId: session.id,
      otp: session.refreshToken,
    };

    const accessToken = this.jwtService.sign(accessTokenPayload, {
      expiresIn: '15m',
    });
    const refreshToken = this.jwtService.sign(refreshTokenPayload, {
      expiresIn: '183d',
    });

    return {
      statusCode: 200,
      response: { user, token: { accessToken, refreshToken } },
      message: 'OTP verified successfully.',
    };
  }

  async verifyEmail({ token, email }: AuthVerifyEmailDto) {
    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException(CommonErrors.UserNotFound);
    }

    if (user.verifiedEmail?.emailVerificationToken !== token) {
      throw new UnauthorizedException(CommonErrors.InvalidToken);
    }

    await this.authRepository.updateVerifyEmailField(user.id, true, {
      emailVerificationToken: '',
    });
    const updatedUser = await this.authRepository.findById(user.id);

    return {
      statusCode: 200,
      response: updatedUser,
      message: 'Email verified successfully.',
    };
  }

  async getRefreshToken({ token }: { token: string }) {
    let data: AuthJwtPayload = null;
    try {
      data = this.jwtService.verify<AuthJwtPayload>(token);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new BadRequestException(CommonErrors.UserSessionExpire);
    }

    const user = await this.authRepository.findByUsername(data.username);
    const accessTokenOtp = randomInt(10 ** 5, 10 ** 6 - 1).toString();
    const refreshTokenOtp = randomInt(10 ** 5, 10 ** 6 - 1).toString();
    const session = await this.authRepository.updateSessionById(
      data.sessionId,
      {
        accessToken: accessTokenOtp,
        refreshToken: refreshTokenOtp,
      },
    );
    await this.authRepository.updateUserById(user.id, {
      lastActiveAt: new Date(),
    });
    await this.storeSession(user.id, session.id, session.accessToken);

    const accessTokenPayload: AuthJwtPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
      sessionId: session.id,
      otp: session.accessToken,
    };

    const refreshTokenPayload: AuthJwtPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
      sessionId: session.id,
      otp: session.refreshToken,
    };

    const accessToken = this.jwtService.sign(accessTokenPayload, {
      expiresIn: '15m',
    });
    const refreshToken = this.jwtService.sign(refreshTokenPayload, {
      expiresIn: '183d',
    });

    return {
      statusCode: 200,
      response: { user, token: { accessToken, refreshToken } },
      message: 'Refresh token',
    };
  }

  async getLoginUser({ token }: { token: string }) {
    let data: AuthJwtPayload = null;
    try {
      data = this.jwtService.verify<AuthJwtPayload>(token);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new BadRequestException(CommonErrors.UserSessionExpire);
    }

    const user = await this.authRepository.findById(data.id);

    if (!user) {
      throw new BadRequestException(CommonErrors.UserNotFound);
    }

    return { statusCode: 200, message: 'Authenticated user', response: user };
  }

  async resendVerifyEmail({ email }: AuthJwtPayload) {
    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException(CommonErrors.UserNotFound);
    }

    if (user.emailVerified) {
      throw new ConflictException(CommonErrors.EmailAlreadyVerified);
    }

    const randomCharacters = crypto.randomBytes(20).toString('hex');
    await this.authRepository.updateVerifyEmailField(user.id, false, {
      emailVerificationToken: randomCharacters,
    });

    // send mail to user to verify email
    this.notificationService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller: 'auth_email_controller', cmd: 'verifyEmail' },
        {
          userToken: null,
          serviceToken:
            await this.gatewayJwtService.generateToken('NOTIFICATION'),
          payload: {
            receiverEmail: email,
            verifyLink: `${this.configService.getOrThrow('CLIENT_URL')}/confirm_email?v_token=${randomCharacters}&email=${user.email}`,
          },
          user: null,
        },
      )
      .subscribe({
        error: (error) => {
          this.logger.log(
            'error',
            AuthService.name + ' service error at resendVerifyEmail',
            error,
          );
        },
      });

    return {
      statusCode: 200,
      message: 'Email verification sent',
      response: user,
    };
  }

  async logout({ token }: { token: string }) {
    let data: AuthJwtPayload = null;
    try {
      data = this.jwtService.verify<AuthJwtPayload>(token);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new BadRequestException(CommonErrors.UserSessionExpire);
    }

    await this.redisService.redis.del(`session:${data.id}:${data.sessionId}`);
    await this.authRepository.deleteSessionById(data.id);
    await this.authRepository.updateUserById(data.id, {
      lastActiveAt: new Date(),
    });

    return {
      statusCode: 200,
      response: {},
      message: 'logout successfully',
    };
  }

  /**
   * function use to store session in redis
   * @param userId auth user id
   * @param sessionId login session id
   * @param otp refresh token otp
   * @param ttl expiration time
   */
  private async storeSession(
    userId: number,
    sessionId: number,
    otp: string,
    ttl = 3600, // one hour expiry time
  ) {
    await this.redisService.redis.set(
      `session:${userId}:${sessionId}`,
      otp,
      'EX',
      ttl,
    );
  }
}
