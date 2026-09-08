import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileDTO } from './dto/create-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async createProfile(profile: CreateProfileDTO) {
    return await this.prisma.profile.create({
      data: profile,
    });
  }
}
