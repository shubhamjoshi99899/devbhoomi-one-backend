import { User } from '@prisma/client';

export class UserBO {
  constructor(private readonly user: User) {}

  get id(): string {
    return this.user.id;
  }
  get phone(): string | null {
    return this.user.phone;
  }
  get tenantId(): string {
    return this.user.tenantId;
  }
  get orgId(): string | null {
    return this.user.organizationId;
  }
  get userType(): string {
    return this.user.userType;
  }
  get name(): string | null {
    return this.user.name;
  }
  get email(): string | null {
    return this.user.email;
  }

  toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      phone: this.phone,
      tenantId: this.tenantId,
      orgId: this.orgId,
      userType: this.userType,
      name: this.name,
      email: this.email,
    };
  }
}
