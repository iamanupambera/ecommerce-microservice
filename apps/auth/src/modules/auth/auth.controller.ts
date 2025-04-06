import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import {
  AuthVerifyEmailDto,
  ChangePasswordDTO,
  AuthForgotPasswordDto,
  LoginDto,
  PasswordDTO,
  RegisterDto,
  VerifyOtpDto,
} from '@repo/validator/index';
import { GatewayJwtGuard } from 'src/shared/gatewayJwt.guard';
import { AuthJwtPayload } from '@repo/modules/index';
const controller = 'auth_controller';

@Controller()
@UseGuards(GatewayJwtGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ controller, cmd: 'register' })
  register(@Payload('payload') createAuthDto: RegisterDto) {
    return this.authService.register(createAuthDto);
  }

  @MessagePattern({ controller, cmd: 'login' })
  login(@Payload('payload') createAuthDto: LoginDto) {
    return this.authService.login(createAuthDto);
  }

  @MessagePattern({ controller, cmd: 'forgotPassword' })
  forgotPassword(@Payload('payload') createAuthDto: AuthForgotPasswordDto) {
    return this.authService.forgotPassword(createAuthDto);
  }

  @MessagePattern({ controller, cmd: 'resetPassword' })
  resetPassword(@Payload('payload') createAuthDto: PasswordDTO) {
    return this.authService.resetPassword(createAuthDto);
  }

  @MessagePattern({ controller, cmd: 'changePassword' })
  changePassword(
    @Payload('payload') createAuthDto: ChangePasswordDTO,
    @Payload('user') user: AuthJwtPayload,
  ) {
    return this.authService.changePassword(createAuthDto, user.username);
  }

  @MessagePattern({ controller, cmd: 'verifyOtp' })
  verifyOtp(@Payload('payload') createAuthDto: VerifyOtpDto) {
    return this.authService.verifyOtp(createAuthDto);
  }

  @MessagePattern({ controller, cmd: 'verifyEmail' })
  verifyEmail(@Payload('payload') createAuthDto: AuthVerifyEmailDto) {
    return this.authService.verifyEmail(createAuthDto);
  }

  @MessagePattern({ controller, cmd: 'getRefreshToken' })
  getRefreshToken(@Payload('payload') payload: { token: string }) {
    return this.authService.getRefreshToken(payload);
  }

  @MessagePattern({ controller, cmd: 'getLoginUser' })
  getLoginUser(@Payload('userToken') token: string) {
    return this.authService.getLoginUser({ token });
  }

  @MessagePattern({ controller, cmd: 'resendVerifyEmail' })
  resendVerifyEmail(@Payload('user') user: AuthJwtPayload) {
    return this.authService.resendVerifyEmail(user);
  }

  @MessagePattern({ controller, cmd: 'logout' })
  logout(@Payload('userToken') token: string) {
    return this.authService.logout({ token });
  }
}
