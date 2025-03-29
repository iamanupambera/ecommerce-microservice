import { Controller, Post, Body, Put, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() payload: object) {
    return this.authService.register(payload);
  }

  @Post('login')
  login(@Body() payload: object) {
    return this.authService.login(payload);
  }

  @Get('current-user')
  getLoginUser(@Body() payload: object) {
    this.authService.getLoginUser(payload);
  }

  @Get('refresh-token')
  getRefreshToken(@Body() payload: object) {
    this.authService.getRefreshToken(payload);
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
  verifyOtp(@Body() payload: object) {
    this.authService.verifyOTP(payload);
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
  logout() {
    return {
      message: 'success',
    };
  }
}
