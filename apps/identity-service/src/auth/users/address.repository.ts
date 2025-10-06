import { Injectable } from '@nestjs/common';
import { IdentityAddress, Prisma } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class AddressRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: Prisma.IdentityAddressUncheckedCreateInput,
  ): Promise<IdentityAddress> {
    return this.prisma.identityAddress.create({ data });
  }

  async findByUserId(userId: string): Promise<IdentityAddress[]> {
    return this.prisma.identityAddress.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async clearDefault(
    userId: string,
    organizationId: string | null,
  ): Promise<any> {
    return await this.prisma.identityAddress.updateMany({
      where: {
        userId,
        organizationId: organizationId === null ? null : organizationId,
      },
      data: { isDefault: false },
    });
  }
}
