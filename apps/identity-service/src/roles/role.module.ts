import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleDao } from './role.dao';
import { CommonModule } from '../auth/common/common.module';

@Module({
  imports: [CommonModule], // ✅ to use PrismaService, JwtService etc.
  controllers: [RoleController],
  providers: [RoleService, RoleDao], // ✅ provide service + DAO
  exports: [RoleService], // ✅ make RoleService available to other modules
})
export class RolesModule {} // ✅ match naming convention (plural is fine)
