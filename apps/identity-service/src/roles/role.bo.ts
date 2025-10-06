import { Role, RolePermission } from '@prisma/client';

export class RoleBO {
  constructor(private readonly role: Role) {}

  get id(): string {
    return this.role.id;
  }
  get name(): string {
    return this.role.name;
  }
  get description(): string {
    return this.role.description ?? '';
  }
}

export class PermissionBO {
  constructor(private readonly perm: RolePermission) {}

  get roleId(): string {
    return this.perm.roleId;
  }
  get permission(): string {
    return this.perm.permission;
  }
}
