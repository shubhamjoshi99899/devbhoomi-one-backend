import { IsString, IsPhoneNumber, Length, IsEnum } from 'class-validator';

export class VerifyOtpDto {
  @IsPhoneNumber('IN')
  phone: string;

  @IsString()
  @Length(6, 6)
  otp: string;

  @IsEnum({ ADMIN: 'ADMIN', MEMBER: 'MEMBER', END_USER: 'END_USER' })
  role: 'ADMIN' | 'MEMBER' | 'END_USER';
}
