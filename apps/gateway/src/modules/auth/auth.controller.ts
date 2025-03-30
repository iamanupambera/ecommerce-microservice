import { Controller, Post, Body, Put, Get, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() payload: object, @Res({ passthrough: true }) res: Response) {
    return this.authService.register(payload, res);
  }

  @Post('login')
  login(@Body() payload: object, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(payload, res);
  }

  @Get('current-user')
  getLoginUser(@Body() payload: object) {
    this.authService.getLoginUser(payload);
  }

  @Get('refresh-token')
  getRefreshToken(
    @Body() payload: object,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.authService.getRefreshToken(payload, res);
  }

  @Put('change-password')
  changePassword(@Body() payload: object) {
    this.authService.changePassword(payload);
  }

  @Put('verify-email')
  verifyEmail(@Body() payload: object) {
    this.authService.verifyEmail(payload);
  }

  @Put('verify-otp/:otp')
  verifyOtp(
    @Body() payload: object,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.authService.verifyOTP(payload, res);
  }

  @Get('resend-email')
  resendVerifyEmail(@Body() payload: object) {
    this.authService.resendVerifyEmail(payload);
  }

  @Put('forgot-password')
  forgotPassword(@Body() payload: object) {
    this.authService.forgotPassword(payload);
  }

  @Put('reset-password/:token')
  resetPassword(@Body() payload: object) {
    this.authService.resetPassword(payload);
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
