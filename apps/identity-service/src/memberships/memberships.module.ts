import { Module } from '@nestjs/common';
import { MembershipController } from './memberships.controller';
import { MembershipService } from './memberships.service';
import { MembershipDao } from './membership.dao';
import { CommonModule } from '../auth/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [MembershipController],
  providers: [MembershipService, MembershipDao],
  exports: [MembershipService],
})
export class MembershipsModule {}
