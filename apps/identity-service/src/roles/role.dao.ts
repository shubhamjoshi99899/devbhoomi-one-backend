import { Injectable } from '@nestjs/common';
import { PrismaService } from '../auth/common/prisma.service';
import { Role, UserRole, RolePermission } from '@prisma/client';

@Injectable()
export class RoleDao {
  constructor(private readonly prisma: PrismaService) {}

  async createRole(
    data: PrismaService['role']['create']['arguments']['data'],
  ): Promise<Role> {
    return this.prisma.role.create({ data });
  }

  async assignRole(userId: string, roleId: string): Promise<UserRole> {
    return this.prisma.userRole.create({ data: { userId, roleId } });
  }

  async addPermission(
    roleId: string,
    permission: string,
  ): Promise<RolePermission> {
    return this.prisma.rolePermission.create({ data: { roleId, permission } });
  }

  async getRoles(): Promise<Role[]> {
    return this.prisma.role.findMany();
  }

  async getPermissions(roleId: string): Promise<RolePermission[]> {
    return this.prisma.rolePermission.findMany({ where: { roleId } });
  }
}
