import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getMyUser(uuid: string, req: Request) {
    const user = await this.prismaService.user.findUnique({
      where: {
        uuid,
      },
      select: {
        uuid: true,
        email: true,
        name: true,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    // To ensure that the logged user is asking for himself
    const decodedUser = req.user as { uuid: string };

    if (user.uuid !== decodedUser.uuid) {
      throw new ForbiddenException();
    }

    return { user };
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
