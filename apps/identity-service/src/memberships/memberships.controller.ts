import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { MembershipService } from './memberships.service';
import { AddMembershipDto } from './dto/add-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';

@Controller('memberships')
export class MembershipController {
  constructor(private readonly service: MembershipService) {}

  @Post()
  async add(@Body() dto: AddMembershipDto) {
    return this.service.add(dto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateMembershipDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Get('user/:userId')
  async listForUser(@Param('userId') userId: string) {
    return this.service.listForUser(userId);
  }
}
