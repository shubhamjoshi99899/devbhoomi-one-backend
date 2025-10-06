import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginOtpDto } from './dto/login-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { RefreshDto } from './dto/refresh.dto';
import { CompleteProfileDto } from './dto/complete-profile.dto';
import type { AuthenticatedRequest } from './types/authenticated-request.type';
import type { UserProfileDto } from './dto/user-profile.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('login-otp')
  async loginOtp(@Body() dto: LoginOtpDto): Promise<any> {
    return this.auth.sendOtp(dto);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() dto: VerifyOtpDto): Promise<any> {
    return this.auth.verifyOtp(dto);
  }

  @Post('refresh')
  async refresh(@Body() dto: RefreshDto): Promise<any> {
    return this.auth.refreshToken(dto.refreshToken);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(
    @Req() req: AuthenticatedRequest,
  ): Promise<{ user: UserProfileDto }> {
    const user = await this.auth.getUserProfile(req.user.sub);
    return { user };
  }

  @Post('complete-profile')
  @UseGuards(JwtAuthGuard)
  async completeProfile(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CompleteProfileDto,
  ): Promise<any> {
    const user = await this.auth.completeProfile(req.user.sub, dto);
    return { user };
  }
}
