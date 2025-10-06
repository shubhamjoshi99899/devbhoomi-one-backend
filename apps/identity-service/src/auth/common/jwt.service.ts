import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService {
  constructor(private readonly jwt: NestJwtService) {}

  async signAccess(payload: any): Promise<string> {
    return this.jwt.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    });
  }

  async signRefresh(payload: any): Promise<string> {
    return this.jwt.signAsync(payload, {
      secret: process.env.REFRESH_SECRET,
      expiresIn: process.env.REFRESH_EXPIRES_IN || '7d',
    });
  }

  async verifyRefresh(token: string): Promise<any> {
    return this.jwt.verifyAsync(token, { secret: process.env.REFRESH_SECRET });
  }
}
