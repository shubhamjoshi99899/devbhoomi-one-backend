import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserAddressesService } from './user-addresses.service';
import { CreateAddressDto } from '../dto/create-address.dto';
import type { AuthenticatedRequest } from '../types/authenticated-request.type';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth/addresses')
@UseGuards(JwtAuthGuard)
export class UserAddressesController {
  constructor(private readonly addressesService: UserAddressesService) {}

  @Post()
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateAddressDto,
  ) {
    const address = await this.addressesService.addAddress(req.user.sub, dto);
    return { address };
  }

  @Get()
  async list(@Req() req: AuthenticatedRequest) {
    const addresses = await this.addressesService.listForUser(req.user.sub);
    return { addresses };
  }
}
