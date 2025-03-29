import { GatewayJwtService } from '../gatewayJwt/gatewayJwt.service';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
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
import { CommonErrors } from '@repo/modules/index';
import { AuthRepository } from './auth.repository';
import { ConfigService } from '@nestjs/config';
import crypto, { randomInt } from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private configService: ConfigService,
    @Inject('NOTIFICATION_SERVICE')
    private readonly notificationService: ClientProxy,
    private readonly jwtService: JwtService,
    private readonly gatewayJwtService: GatewayJwtService,
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
      throw new BadRequestException(CommonErrors.UserAlreadyExists);
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
        error: (err) => console.error('Error sending email:', err),
      });

    const accessToken = this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      { expiresIn: '15m' },
    );
    const refreshToken = this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      { expiresIn: '183d' },
    );

    return {
      statusCode: 201,
      response: { user, token: { accessToken, refreshToken } },
      message: 'User created successfully',
    };
  }

  async login({ identifier, password, browserName, deviceType }: LoginDto) {
    const user = await this.authRepository.getUserWithPassword(identifier);

    if (!user) {
      throw new BadRequestException(CommonErrors.UserNotFound);
    }

    const validPassword = await this.authRepository.isValidatePassword(
      user,
      password,
    );

    if (!validPassword) {
      throw new BadRequestException(CommonErrors.InvalidCredential);
    }

    delete user.password;

    if (browserName !== user.browserName || deviceType !== user.deviceType) {
      const otp = randomInt(10 ** 5, 10 ** 6 - 1);

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
          error: (err) => console.error('Error sending email:', err),
        });

      const date: Date = new Date();
      date.setMinutes(date.getMinutes() + 10);
      await this.authRepository.updateUserOTP(user.id, `${otp}`, date, '', '');

      return {
        statusCode: 200,
        response: {
          browserName: user.browserName,
          deviceType: user.deviceType,
        },
        message: 'OTP code sent',
      };
    }

    const accessToken = this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      { expiresIn: '15m' },
    );
    const refreshToken = this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      { expiresIn: '183d' },
    );

    return {
      statusCode: 200,
      response: { user, token: { accessToken, refreshToken } },
      message: 'User login successfully',
    };
  }

  async forgotPassword({ email }: AuthForgotPasswordDto) {
    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestException(CommonErrors.UserNotFound);
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
        error: (err) => console.error('Error sending email:', err),
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
      throw new BadRequestException(CommonErrors.InvalidCredential);
    }

    const user = await this.authRepository.findByEmail(email, true);
    if (!user) {
      throw new BadRequestException(CommonErrors.UserNotFound);
    }

    if (user.resetPasswordRequest.token !== token) {
      throw new BadRequestException(CommonErrors.InvalidCredential);
    }

    await this.authRepository.updatePassword(user.id, password);

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
        error: (err) => console.error('Error sending email:', err),
      });

    return {
      statusCode: 200,
      response: {},
      message: 'Password successfully updated.',
    };
  }

  async changePassword({
    newPassword,
    username,
    currentPassword,
  }: ChangePasswordDTO) {
    const user = await this.authRepository.getUserWithPassword(username);

    if (!user) {
      throw new BadRequestException(CommonErrors.UserNotFound);
    }

    if (await this.authRepository.isValidatePassword(user, currentPassword)) {
      throw new BadRequestException(CommonErrors.InvalidCredential);
    }

    await this.authRepository.updatePassword(user.id!, newPassword);

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
        error: (err) => console.error('Error sending email:', err),
      });

    return {
      statusCode: 200,
      response: {},
      message: 'Password successfully updated.',
    };
  }

  async verifyOtp({ browserName, deviceType, otp, email }: VerifyOtpDto) {
    const user = await this.authRepository.findByEmail(email, false, true);

    if (!user) {
      throw new BadRequestException(CommonErrors.UserNotFound);
    }

    if (user.otp.otp !== otp) {
      throw new BadRequestException(CommonErrors.InvalidCredential);
    }

    await this.authRepository.updateUserOTP(
      user.id!,
      '',
      new Date(),
      browserName,
      deviceType,
    );

    const accessToken = this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      { expiresIn: '15m' },
    );
    const refreshToken = this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      { expiresIn: '183d' },
    );

    return {
      statusCode: 200,
      response: { user, token: { accessToken, refreshToken } },
      message: 'OTP verified successfully.',
    };
  }

  async verifyEmail({ token, email }: AuthVerifyEmailDto) {
    const user = await this.authRepository.findByEmail(email, true);

    if (!user) {
      throw new BadRequestException(CommonErrors.UserNotFound);
    }

    if (user.resetPasswordRequest.token !== token) {
      throw new BadRequestException(CommonErrors.InvalidCredential);
    }

    await this.authRepository.updateVerifyEmailField(user.id, {
      emailVerified: 1,
    });
    const updatedUser = await this.authRepository.findById(user.id);

    return {
      statusCode: 200,
      response: updatedUser,
      message: 'Email verified successfully.',
    };
  }

  async getRefreshToken({ token }: { token: string }) {
    let data = null;
    try {
      data = await this.jwtService.verify(token);
    } catch (error) {
      console.log(error);
    }

    const user = await this.authRepository.findByUsername(data.username);
    const accessToken = this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      { expiresIn: '15m' },
    );
    const refreshToken = this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      { expiresIn: '183d' },
    );

    return {
      statusCode: 200,
      response: { user, token: { accessToken, refreshToken } },
      message: 'Refresh token',
    };
  }

  async getLoginUser({ token }: { token: string }) {
    let user = null;
    try {
      user = await this.jwtService.verify(token);
    } catch (error) {
      console.log(error);
    }

    user = await this.authRepository.findById(user.id);

    if (!user) {
      throw new BadRequestException(CommonErrors.UserNotFound);
    }

    return { statusCode: 200, message: 'Authenticated user', response: user };
  }

  async resendVerifyEmail({ email }: { email: string }) {
    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestException(
        'Email is invalid',
        'CurrentUser resentEmail() method error',
      );
    }

    const randomCharacters = crypto.randomBytes(20).toString('hex');
    await this.authRepository.updateVerifyEmailField(user.id, {
      emailVerified: 0,
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
        error: (err) => console.error('Error sending email:', err),
      });

    return {
      statusCode: 200,
      message: 'Email verification sent',
      response: user,
    };
  }
}
