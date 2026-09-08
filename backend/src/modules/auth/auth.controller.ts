import { Body, Controller } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor() {}

  async login(@Body() body: LoginDto) {}

  async signup(@Body() body: SignupDto) {}
}
