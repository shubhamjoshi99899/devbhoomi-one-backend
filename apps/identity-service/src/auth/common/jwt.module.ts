// src/common/jwt.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenService } from './jwt.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'changeme', // 👈 set your secret here
      signOptions: { expiresIn: '1d' }, // 👈 set expiration
    }),
  ],
  providers: [JwtTokenService],
  exports: [JwtTokenService], // 👈 make it available to other modules
})
export class JwtTokenModule {}
