import { Controller, Get, Req, Session, UseGuards } from '@nestjs/common';
import { SessionGuard } from '../auth/guards/session.guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(SessionGuard)
  @Get()
  async getLocalUser(@Req() req: any) {
    return await this.userService.getUser({ id: req.userId });
  }
}
