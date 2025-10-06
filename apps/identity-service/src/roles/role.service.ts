import { Injectable } from '@nestjs/common';
import { RoleDao } from './role.dao';
import { CreateRoleDto } from './dto/create-role.dto';
import { AssignRoleDto } from './dto/assign-role.dto';
import { RolePermissionDto } from './dto/role-permission.dto';
import { RoleBO, PermissionBO } from './role.bo';

@Injectable()
export class RoleService {
  constructor(private readonly roleDao: RoleDao) {}

  async createRole(dto: CreateRoleDto): Promise<RoleBO> {
    const role = await this.roleDao.createRole(dto);
    return new RoleBO(role);
  }

  async assignRole(dto: AssignRoleDto) {
    return this.roleDao.assignRole(dto.userId, dto.roleId);
  }

  async addPermission(dto: RolePermissionDto): Promise<PermissionBO> {
    const perm = await this.roleDao.addPermission(dto.roleId, dto.permission);
    return new PermissionBO(perm);
  }

  async getRoles(): Promise<RoleBO[]> {
    const roles = await this.roleDao.getRoles();
    return roles.map((r) => new RoleBO(r));
  }

  async getPermissions(roleId: string): Promise<PermissionBO[]> {
    const perms = await this.roleDao.getPermissions(roleId);
    return perms.map((p) => new PermissionBO(p));
  }
}
