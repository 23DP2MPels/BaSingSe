import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Incorrect email format' })
  email: string;

  @IsString()
  password: string;

  @IsString()
  username: string;
}
