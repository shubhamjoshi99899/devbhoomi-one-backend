import { Module } from '@nestjs/common';
import { OrgController } from './org.controller';
import { OrgService } from './org.service';
import { OrgDao } from './org.dao';
import { CommonModule } from '../auth/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [OrgController],
  providers: [OrgService, OrgDao],
  exports: [OrgService],
})
export class OrganizationModule {}
