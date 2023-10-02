import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  async signup() {
    return { message: 'signup was succesfull' };
  }

  async signin() {
    return { message: 'signin was succesfull' };
  }
  async signout() {
    return { message: 'signout was succesfull' };
  }
}
