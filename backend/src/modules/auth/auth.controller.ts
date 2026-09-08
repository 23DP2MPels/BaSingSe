import { Body, Controller, Post, Session } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() body: SignupDto,
    @Session() session: Record<string, any>,
  ) {
    const userId = await this.authService.signup(body);
    session.userId = userId;
    return { message: 'OK' };
  }

  @Post('login')
  async login(@Body() body: LoginDto, @Session() session: Record<string, any>) {
    const userId = await this.authService.login(body);
    session.userId = userId;
    return { message: 'OK' };
  }
}
