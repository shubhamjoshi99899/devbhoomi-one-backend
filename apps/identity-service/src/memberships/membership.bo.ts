import { IdentityMembership, Organization, Role } from '@prisma/client';

export class MembershipBO {
  constructor(
    private readonly membership: IdentityMembership & {
      organization?: Organization;
      role?: Role;
    },
  ) {}

  get id(): string {
    return this.membership.id;
  }
  get userId(): string {
    return this.membership.userId;
  }
  get organizationId(): string {
    return this.membership.organizationId;
  }
  get roleId(): string | null {
    return this.membership.roleId ?? null;
  }
  get organization(): Organization | undefined {
    return this.membership.organization;
  }
  get role(): Role | undefined {
    return this.membership.role;
  }
}
