import { Injectable } from '@nestjs/common';
import { Organization } from '@prisma/client';
import { PrismaService } from '../auth/common/prisma.service';

@Injectable()
export class OrgDao {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: PrismaService['organization']['create']['arguments']['data'],
  ): Promise<Organization> {
    return this.prisma.organization.create({ data });
  }

  async findById(id: string): Promise<Organization | null> {
    return this.prisma.organization.findUnique({ where: { id } });
  }

  async update(id: string, data: Partial<Organization>): Promise<Organization> {
    return this.prisma.organization.update({ where: { id }, data });
  }
}
