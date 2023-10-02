import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(
    @Body() dto: AuthDto,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    return this.authService.signin(dto, request, response);
  }

  @Post('signout')
  signout() {
    return this.authService.signout();
  }
}
