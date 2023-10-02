import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  private async hashPassword(password: string) {
    const saltOrRounds = 15;

    const hashedPassword = await hash(password, saltOrRounds);

    return hashedPassword;
  }

  async signup(dto: AuthDto) {
    const { email, password, name } = dto;

    const foundUser = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (foundUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await this.hashPassword(password);

    await this.prismaService.user.create({
      data: {
        email,
        hashedPassword,
        name,
      },
    });

    return { message: 'signup was succesfull' };
  }

  async signin() {
    return { message: 'signin was succesfull' };
  }
  async signout() {
    return { message: 'signout was succesfull' };
  }
}
