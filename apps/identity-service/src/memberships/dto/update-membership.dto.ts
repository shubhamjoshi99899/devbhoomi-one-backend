import { IsString, IsOptional } from 'class-validator';

export class UpdateMembershipDto {
  @IsOptional()
  @IsString()
  roleId?: string;
}
