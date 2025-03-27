import crypto from 'crypto';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RegisterDto } from '@repo/validator/index';
import { AuthRepository } from './auth.repository';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private configService: ConfigService,
    @Inject('NOTIFICATION_SERVICE')
    private readonly notificationService: ClientProxy,
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
      throw new BadRequestException({
        response: 'Invalid credentials. Email or Username',
        message: 'SignUp create() method error',
      });
    }

    const randomCharacters = crypto.randomBytes(20).toString('hex');
    const authData = {
      username,
      email: email,
      profilePublicId: '13vuhbk',
      password,
      country,
      profilePicture,
      emailVerificationToken: randomCharacters,
      browserName,
      deviceType,
    };
    const result = await this.authRepository.create(authData);

    const verificationLink = `${this.configService.getOrThrow('CLIENT_URL')}/confirm_email?v_token=${authData.emailVerificationToken}`;
    const messageDetails = {
      receiverEmail: result.email,
      verifyLink: verificationLink,
      template: 'verifyEmail',
    };

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
        { controller: 'auth_email_controller', cmd: 'otpEmail' },
        {
          userToken: null,
          serviceToken: '',
          payload: messageDetails,
          user: null,
        },
      )
      .subscribe({
        error: (err) => console.error('Error sending email:', err),
      });

    return {
      message: 'User created successfully',
      user: result,
      messageDetails,
    };
  }
}
