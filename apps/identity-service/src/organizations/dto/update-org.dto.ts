import { IsString, IsOptional } from 'class-validator';

export class UpdateOrgDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  status?: string;
}
