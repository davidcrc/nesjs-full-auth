import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { hash, compare } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private async hashPassword(password: string) {
    const saltOrRounds = 15;

    const hashedPassword = await hash(password, saltOrRounds);

    return hashedPassword;
  }

  private async comparePasswords(password: string, hash: string) {
    return await compare(password, hash);
  }

  private async signToken(uuid: string) {
    const payload = { uuid };

    return this.jwtService.signAsync(payload);
  }

  async signup(dto: CreateUserDto) {
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

  async signin(dto: AuthDto, req: Request, res: Response) {
    const { email, password } = dto;

    const foundUser = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!foundUser) {
      throw new BadRequestException('Wrong credentials');
    }

    const isMatch = await this.comparePasswords(
      password,
      foundUser.hashedPassword,
    );

    if (!isMatch) {
      throw new BadRequestException('Wrong credentials');
    }

    // sign jwt and return to the user
    // const token = await this.signToken(foundUser.uuid);
    // return { token };

    // sign jwt and return to the user in a cookie
    const token = await this.signToken(foundUser.uuid);

    if (!token) {
      throw new ForbiddenException();
    }

    res.cookie('token', token);

    return res.send({
      message: 'Logged in successfully',
    });
  }

  async signout() {
    return { message: 'signout was succesfull' };
  }
}
