import { Injectable } from '@nestjs/common';
import { MembershipDao } from './membership.dao';
import { MembershipBO } from './membership.bo';
import { AddMembershipDto } from './dto/add-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';

@Injectable()
export class MembershipService {
  constructor(private readonly dao: MembershipDao) {}

  async add(dto: AddMembershipDto): Promise<MembershipBO> {
    const membership = await this.dao.addMembership({
      userId: dto.userId,
      organizationId: dto.organizationId,
      roleId: dto.roleId,
    });
    return new MembershipBO(membership);
  }

  async update(id: string, dto: UpdateMembershipDto): Promise<MembershipBO> {
    const membership = await this.dao.updateMembership(id, dto);
    return new MembershipBO(membership);
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.dao.removeMembership(id);
    return { message: 'Membership removed successfully' };
  }

  async listForUser(userId: string): Promise<MembershipBO[]> {
    const memberships = await this.dao.listByUser(userId);
    return memberships.map((m) => new MembershipBO(m));
  }
}
