import { Injectable, NotFoundException } from '@nestjs/common';
import { OrgDao } from './org.dao';
import { OrgBO } from './org.bo';
import { CreateOrgDto } from './dto/create-org.dto';
import { UpdateOrgDto } from './dto/update-org.dto';

@Injectable()
export class OrgService {
  constructor(private readonly orgDao: OrgDao) {}

  async createOrg(dto: CreateOrgDto): Promise<OrgBO> {
    const org = await this.orgDao.create({
      tenantId: 'default-tenant',
      name: dto.name,
      type: dto.type,
      status: dto.status ?? 'active',
    });
    return new OrgBO(org);
  }

  async getOrg(id: string): Promise<OrgBO> {
    const org = await this.orgDao.findById(id);
    if (!org) throw new NotFoundException('Organization not found');
    return new OrgBO(org);
  }

  async updateOrg(id: string, dto: UpdateOrgDto): Promise<OrgBO> {
    const org = await this.orgDao.update(id, dto);
    return new OrgBO(org);
  }
}
