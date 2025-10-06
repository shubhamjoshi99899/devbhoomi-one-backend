import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './users/user.repository';
import { AddressRepository } from './users/address.repository';
import { UserAddressesService } from './users/user-addresses.service';
import { UserAddressesController } from './users/user-addresses.controller';
import { CommonModule } from './common/common.module';
import { JwtTokenModule } from './common/jwt.module';

@Module({
  imports: [PassportModule, JwtTokenModule, CommonModule],
  providers: [
    AuthService,
    UserRepository,
    JwtStrategy,
    AddressRepository,
    UserAddressesService,
  ],
  controllers: [AuthController, UserAddressesController],
})
export class AuthModule {}
