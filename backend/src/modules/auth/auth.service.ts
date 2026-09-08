import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signup.dto';
import { Profile, User } from '@prisma/client';
import { LoginDto } from './dto/login.dto';
import { ProfileService } from '../user/profile.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
  ) {}

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

    return user.id;
  }

  async signup(signupDto: SignupDto) {
    let user: User | null = await this.userService.getUser({
      OR: [{ username: signupDto.username }, { email: signupDto.email }],
    });

    if (user)
      throw new BadRequestException(
        'User with this username or email already exist',
      );

    const hashedPassword = await bcrypt.hash(
      signupDto.password,
      this.SALT_ROUNDS,
    );

    user = await this.userService.createUser({
      email: signupDto.email,
      username: signupDto.username,
      password: hashedPassword,
    });

    await this.profileService.createProfile({
      userId: user.id,
      firstName: signupDto.firstName,
    });

    return user.id;
  }
}
