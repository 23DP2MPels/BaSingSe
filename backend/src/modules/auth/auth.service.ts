import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signup.dto';
import { User } from '@prisma/client';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  private SALT_ROUNDS = 10;

  async login(loginDto: LoginDto) {
    const user = await this.userService.getUser({
      OR: [{ username: loginDto.username }, { email: loginDto.email }],
    });

    if (!user) throw new UnauthorizedException('Incorrect login or password');

    if (!user.password)
      throw new UnauthorizedException('This account does not use password');

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid)
      throw new UnauthorizedException('Incorrect login or password');
  }

  async signup(signupDto: SignupDto) {
    const hashedPassword = await bcrypt.hash(
      signupDto.password,
      this.SALT_ROUNDS,
    );

    const user: User | null = await this.userService.createUser({
      ...signupDto,
      password: hashedPassword,
    });

    return {
      user,
      password: null,
    };
  }
}
