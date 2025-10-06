import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByPhone(phone: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { phone } });
  }

  async upsertByPhone(
    phone: string,
    role: string,
    tenantId: string,
  ): Promise<User> {
    return this.prisma.user.upsert({
      where: { phone },
      update: {},
      create: { phone, userType: role, tenantId },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async updateProfile(
    id: string,
    data: { name: string; email: string },
  ): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async findDetailedById(id: string): Promise<UserWithRelations | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        organization: true,
        identityAddresses: {
          include: { organization: true },
          orderBy: { createdAt: 'desc' },
        },
        identityMemberships: {
          include: { organization: true, role: true },
          orderBy: { createdAt: 'desc' },
        },
        roles: {
          include: { role: true },
        },
      },
    });
  }
}

export type UserWithRelations = Prisma.UserGetPayload<{
  include: {
    organization: true;
    identityAddresses: {
      include: { organization: true };
    };
    identityMemberships: {
      include: { organization: true; role: true };
    };
    roles: {
      include: { role: true };
    };
  };
}>;
