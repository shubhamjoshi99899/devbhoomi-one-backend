import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { OrgService } from './org.service';
import { CreateOrgDto } from './dto/create-org.dto';
import { UpdateOrgDto } from './dto/update-org.dto';

@Controller('orgs')
export class OrgController {
  constructor(private readonly orgService: OrgService) {}

  @Post()
  async create(@Body() dto: CreateOrgDto) {
    return this.orgService.createOrg(dto);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.orgService.getOrg(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateOrgDto) {
    return this.orgService.updateOrg(id, dto);
  }
}
