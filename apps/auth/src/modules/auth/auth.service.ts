import crypto from 'crypto';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RegisterDto } from '@repo/validator/index';
import { AuthRepository } from './auth.repository';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { CommonErrors } from '@repo/modules/index';

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
        { controller: 'auth_email_controller', cmd: 'otpEmail' },
        {
          userToken: null,
          serviceToken: '',
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
}
