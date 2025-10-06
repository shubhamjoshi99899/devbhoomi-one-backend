import { Controller, Post, Body, Get } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { AssignRoleDto } from './dto/assign-role.dto';
import { RolePermissionDto } from './dto/role-permission.dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }

  @Get()
  async getAll() {
    return this.roleService.getRoles();
  }

  @Post('assign')
  async assign(@Body() dto: AssignRoleDto) {
    return this.roleService.assignRole(dto);
  }

  @Post('permission')
  async addPermission(@Body() dto: RolePermissionDto) {
    return this.roleService.addPermission(dto);
  }
}
