import { Controller, Post, Body, Put, Get, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Observable } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body() payload: object,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Observable<object>> {
    return this.authService.register(payload, res);
  }

  @Post('login')
  login(
    @Body() payload: object,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Observable<object>> {
    return this.authService.login(payload, res);
  }

  @Get('current-user')
  getLoginUser(@Body() payload: object): Promise<Observable<object>> {
    return this.authService.getLoginUser(payload);
  }

  @Get('refresh-token')
  getRefreshToken(
    @Body() payload: object,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Observable<object>> {
    return this.authService.getRefreshToken(payload, res);
  }

  @Put('change-password')
  changePassword(@Body() payload: object): Promise<Observable<object>> {
    return this.authService.changePassword(payload);
  }

  @Put('verify-email')
  verifyEmail(@Body() payload: object): Promise<Observable<object>> {
    return this.authService.verifyEmail(payload);
  }

  @Put('verify-otp/:otp')
  verifyOtp(
    @Body() payload: object,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Observable<object>> {
    return this.authService.verifyOTP(payload, res);
  }

  @Get('resend-email')
  resendVerifyEmail(@Body() payload: object) {
    return this.authService.resendVerifyEmail(payload);
  }

  @Put('forgot-password')
  forgotPassword(@Body() payload: object): Promise<Observable<object>> {
    return this.authService.forgotPassword(payload);
  }

  @Put('reset-password/:token')
  resetPassword(@Body() payload: object): Promise<Observable<object>> {
    return this.authService.resetPassword(payload);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refreshToken');

    return {
      statusCode: 200,
      response: {},
      message: 'logout successfully',
    };
  }
}
