import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { JwtTokenService } from './jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { RedisService } from './redis.service';

@Module({
  imports: [JwtModule.register({})],
  providers: [PrismaService, JwtTokenService, RedisService],
  exports: [PrismaService, JwtTokenService, JwtModule, RedisService],
})
export class CommonModule {}
