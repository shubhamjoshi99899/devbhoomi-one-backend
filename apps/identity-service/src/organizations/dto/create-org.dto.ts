import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOrgDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  type: string; // vendor | fleet | platform

  @IsOptional()
  status?: string;
}
