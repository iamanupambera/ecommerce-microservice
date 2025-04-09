import {
  Controller,
  Post,
  Body,
  Put,
  Get,
  Res,
  UseGuards,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { Cookies } from '../../shared/decorators/cookies.decorator';
import { AuthUser } from '../../shared/decorators/auth-user.decorator';
import { AuthJwtPayload } from '@repo/modules/index';
import { BearerToken } from '../../shared/decorators/bearer-token.decorator';

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

  @UseGuards(AuthGuard('jwt'))
  @Get('current-user')
  getLoginUser(
    @AuthUser() user: AuthJwtPayload,
    @BearerToken() bearerToken: string,
  ): Promise<Observable<object>> {
    return this.authService.getLoginUser(user, bearerToken);
  }

  @Get('refresh-token')
  getRefreshToken(
    @Res({ passthrough: true }) res: Response,
    @Cookies('refreshToken') refreshToken: string,
  ): Promise<Observable<object>> {
    return this.authService.getRefreshToken(res, refreshToken);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('change-password')
  changePassword(
    @Body() payload: object,
    @AuthUser() user: AuthJwtPayload,
  ): Promise<Observable<object>> {
    return this.authService.changePassword(payload, user);
  }

  @Put('verify-email')
  verifyEmail(@Body() payload: object): Promise<Observable<object>> {
    return this.authService.verifyEmail(payload);
  }

  @Put('verify-otp/:otp')
  verifyOtp(
    @Body() payload: object,
    @Res({ passthrough: true }) res: Response,
    @Param('otp') otp: string,
  ): Promise<Observable<object>> {
    return this.authService.verifyOTP({ ...payload, otp }, res);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('resend-email')
  resendVerifyEmail(@AuthUser() user: AuthJwtPayload) {
    return this.authService.resendVerifyEmail(user);
  }

  @Put('forgot-password')
  forgotPassword(@Body() payload: object): Promise<Observable<object>> {
    return this.authService.forgotPassword(payload);
  }

  @Put('reset-password/:token')
  resetPassword(
    @Body() payload: object,
    @Param('token') token: string,
  ): Promise<Observable<object>> {
    return this.authService.resetPassword({ ...payload, token });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('logout')
  logout(
    @Res({ passthrough: true }) res: Response,
    @BearerToken() bearerToken: string,
  ) {
    return this.authService.logout(res, bearerToken);
  }
}
