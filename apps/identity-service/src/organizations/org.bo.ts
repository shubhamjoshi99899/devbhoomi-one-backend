import { Organization } from '@prisma/client';

export class OrgBO {
  constructor(private readonly org: Organization) {}

  get id(): string {
    return this.org.id;
  }

  get name(): string {
    return this.org.name;
  }

  get type(): string {
    return this.org.type;
  }

  get status(): string {
    return this.org.status;
  }
}
