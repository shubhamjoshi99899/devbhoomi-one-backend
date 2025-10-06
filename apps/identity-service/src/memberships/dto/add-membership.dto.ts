import { IsString, IsOptional } from 'class-validator';

export class AddMembershipDto {
  @IsString()
  userId: string;

  @IsString()
  organizationId: string;

  @IsOptional()
  @IsString()
  roleId?: string;
}
