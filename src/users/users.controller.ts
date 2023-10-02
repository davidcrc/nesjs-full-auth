import { Controller, Get, Param, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':uuid')
  getMyUser(@Param('uuid') uuid: string, @Req() request: Request) {
    return this.usersService.getMyUser(uuid, request);
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }
}
