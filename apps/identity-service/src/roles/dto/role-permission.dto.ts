import { IsString } from 'class-validator';

export class RolePermissionDto {
  @IsString()
  roleId: string;

  @IsString()
  permission: string;
}
