import { IsPhoneNumber, IsNotEmpty } from 'class-validator';

export class LoginOtpDto {
  @IsPhoneNumber('IN')
  @IsNotEmpty()
  phone: string;
}
