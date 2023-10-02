import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getMyUser(uuid: string) {
    return this.prismaService.user.findUnique({
      where: {
        uuid,
      },
    });
  }

  async getUsers() {
    return await this.prismaService.user.findMany({
      select: {
        uuid: true,
        email: true,
      },
    });
  }
}
