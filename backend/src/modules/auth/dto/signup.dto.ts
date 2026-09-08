import { IsEmail, IsOptional, IsString } from 'class-validator';

export class SignupDto {
  @IsEmail({}, { message: 'Incorrect email format' })
  email: string;

  @IsString()
  password: string;

  @IsString()
  username: string;

  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;
}
