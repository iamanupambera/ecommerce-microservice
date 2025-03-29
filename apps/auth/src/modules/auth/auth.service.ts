import { GatewayJwtService } from '../serviceAccessToken/gatewayJwt.service';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from '@repo/validator/index';
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
      throw new BadRequestException(CommonErrors.UserAleradyExists);
    }

    const randomCharacters = crypto.randomBytes(20).toString('hex');
    const result = await this.authRepository.create({
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
            verifyLink: `${this.configService.getOrThrow('CLIENT_URL')}/confirm_email?v_token=${randomCharacters}`,
          },
          user: null,
        },
      )
      .subscribe({
        error: (err) => console.error('Error sending email:', err),
      });

    return {
      statusCode: 201,
      response: result,
      message: 'User created successfully',
    };
  }

  async login({ identifier, password, browserName, deviceType }: LoginDto) {
    const user = await this.authRepository.getUserWithPassword(identifier);

    if (!user) {
      throw new BadRequestException('user not found');
    }

    const validPassword = await this.authRepository.isValidatePassword(
      user,
      password,
    );

    if (!validPassword) {
      throw new BadRequestException('Invalid credentials');
    }

    delete user.password;

    if (browserName !== user.browserName || deviceType !== user.deviceType) {
      const otp = randomInt(10 ** 5, 10 ** 6 - 1);

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
        email: user.email,
        userId: user.id,
      },
      { expiresIn: '15m' },
    );
    const refreshToken = this.jwtService.sign(
      {
        email: user.email,
        userId: user.id,
      },
      { expiresIn: '183d' },
    );

    return {
      statusCode: 200,
      response: { user, token: { accessToken, refreshToken } },
      message: 'User login successfully',
    };
  }
}
