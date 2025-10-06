import { Injectable } from '@nestjs/common';
import { PrismaService } from '../auth/common/prisma.service';
import { IdentityMembership, Prisma } from '@prisma/client';

@Injectable()
export class MembershipDao {
  constructor(private readonly prisma: PrismaService) {}

  async addMembership(
    data: Prisma.IdentityMembershipUncheckedCreateInput,
  ): Promise<IdentityMembership> {
    return this.prisma.identityMembership.create({ data });
  }

  async findMembership(
    userId: string,
    orgId: string,
  ): Promise<IdentityMembership | null> {
    return this.prisma.identityMembership.findFirst({
      where: { userId, organizationId: orgId },
    });
  }

  async updateMembership(
    id: string,
    data: Partial<IdentityMembership>,
  ): Promise<IdentityMembership> {
    return this.prisma.identityMembership.update({
      where: { id },
      data,
    });
  }

  async removeMembership(id: string): Promise<IdentityMembership> {
    return this.prisma.identityMembership.delete({ where: { id } });
  }

  async listByUser(userId: string): Promise<IdentityMembership[]> {
    return this.prisma.identityMembership.findMany({
      where: { userId },
      include: { organization: true, role: true },
    });
  }
}
