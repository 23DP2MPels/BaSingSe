import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async createUser(user: Prisma.UserCreateInput): Promise<User | null> {
    return await this.prisma.user.create({ data: user });
  }

  async getUser(where: Prisma.UserWhereInput): Promise<User | null> {
    return await this.prisma.user.findFirst({ where });
  }

  async updateUser(id: string): Promise<void> {
    // return await this.prisma.user.update({ where });
  }
}
