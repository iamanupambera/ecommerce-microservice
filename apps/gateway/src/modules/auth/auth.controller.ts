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
import {
  ApiBearerAuth,
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  AuthForgotPasswordDto,
  AuthVerifyEmailDto,
  ChangePasswordDTO,
  LoginDto,
  PasswordDTO,
  RegisterDto,
  VerifyOtpDto,
} from '@repo/validator/index';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'User Registration',
    description: 'Registers a new user and returns login credentials.',
  })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @ApiResponse({
    status: 409,
    description: 'User email or username already exists.',
  })
  @Post('register')
  register(
    @Body() payload: object,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Observable<object>> {
    return this.authService.register(payload, res);
  }

  @ApiOperation({
    summary: 'User Login',
    description: 'Logs in a user and returns JWT token.',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'User logged in successfully.' })
  @ApiResponse({ status: 401, description: 'Incorrect password.' })
  @ApiResponse({ status: 404, description: 'Email or username not found.' })
  @Post('login')
  login(
    @Body() payload: object,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Observable<object>> {
    return this.authService.login(payload, res);
  }

  @ApiOperation({
    summary: 'Get Current User',
    description: 'Returns the current logged-in user.',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'User details retrieved successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Session expired or user not found.',
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('current-user')
  getLoginUser(
    @AuthUser() user: AuthJwtPayload,
    @BearerToken() bearerToken: string,
  ): Promise<Observable<object>> {
    return this.authService.getLoginUser(user, bearerToken);
  }

  @ApiOperation({
    summary: 'Refresh Token',
    description: 'Generates a new access token from refresh token cookie.',
  })
  @ApiCookieAuth()
  @ApiResponse({
    status: 200,
    description: 'Access token created successfully.',
  })
  @Get('refresh-token')
  getRefreshToken(
    @Res({ passthrough: true }) res: Response,
    @Cookies('refreshToken') refreshToken: string,
  ): Promise<Observable<object>> {
    return this.authService.getRefreshToken(res, refreshToken);
  }

  @ApiOperation({
    summary: 'Change Password',
    description: 'Allows authenticated user to change their password.',
  })
  @ApiBearerAuth()
  @ApiBody({ type: ChangePasswordDTO })
  @ApiResponse({ status: 200, description: 'Password changed successfully.' })
  @ApiResponse({ status: 404, description: 'User does not exist.' })
  @ApiResponse({ status: 401, description: 'Current password is incorrect.' })
  @ApiResponse({
    status: 400,
    description: 'New password must be different from current.',
  })
  @UseGuards(AuthGuard('jwt'))
  @Put('change-password')
  changePassword(
    @Body() payload: object,
    @AuthUser() user: AuthJwtPayload,
  ): Promise<Observable<object>> {
    return this.authService.changePassword(payload, user);
  }

  @ApiBody({ type: AuthVerifyEmailDto })
  @ApiOperation({
    summary: 'Verify Email',
    description: 'Verifies user email with a verification token.',
  })
  @ApiResponse({ status: 200, description: 'Email verified successfully.' })
  @Put('verify-email')
  verifyEmail(@Body() payload: object): Promise<Observable<object>> {
    return this.authService.verifyEmail(payload);
  }

  @ApiBody({ type: VerifyOtpDto })
  @ApiOperation({
    summary: 'Verify OTP',
    description: 'Verifies a one-time password sent to user.',
  })
  @ApiParam({
    name: 'otp',
    type: String,
    description: 'One-time password to verify.',
  })
  @ApiResponse({ status: 200, description: 'OTP verified successfully.' })
  @Put('verify-otp/:otp')
  verifyOtp(
    @Body() payload: object,
    @Res({ passthrough: true }) res: Response,
    @Param('otp') otp: string,
  ): Promise<Observable<object>> {
    return this.authService.verifyOTP({ ...payload, otp }, res);
  }

  @ApiOperation({
    summary: 'Resend Email Verification',
    description: 'Sends verification email again.',
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Verification email resent.' })
  @UseGuards(AuthGuard('jwt'))
  @Get('resend-email')
  resendVerifyEmail(@AuthUser() user: AuthJwtPayload) {
    return this.authService.resendVerifyEmail(user);
  }

  @ApiBody({ type: AuthForgotPasswordDto })
  @ApiOperation({
    summary: 'Forgot Password',
    description: 'Sends reset password link to user email.',
  })
  @ApiResponse({
    status: 200,
    description: 'Password reset link sent successfully.',
  })
  @Put('forgot-password')
  forgotPassword(@Body() payload: object): Promise<Observable<object>> {
    return this.authService.forgotPassword(payload);
  }

  @ApiBody({ type: PasswordDTO })
  @ApiOperation({
    summary: 'Reset Password',
    description: 'Resets user password using a valid reset token.',
  })
  @ApiParam({
    name: 'token',
    type: String,
    description: 'Reset password token sent to user email.',
  })
  @ApiResponse({ status: 200, description: 'Password reset successfully.' })
  @Put('reset-password/:token')
  resetPassword(
    @Body() payload: object,
    @Param('token') token: string,
  ): Promise<Observable<object>> {
    return this.authService.resetPassword({ ...payload, token });
  }

  @ApiOperation({
    summary: 'Logout',
    description: 'Logs out the user by clearing the cookies.',
  })
  @ApiCookieAuth()
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'User logged out successfully.' })
  @UseGuards(AuthGuard('jwt'))
  @Get('logout')
  logout(
    @Res({ passthrough: true }) res: Response,
    @BearerToken() bearerToken: string,
  ) {
    return this.authService.logout(res, bearerToken);
  }
}
