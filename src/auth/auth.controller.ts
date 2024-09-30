import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() body) {
      const { email, password } = body;
      const user = await this.authService.validateUser(email, password);
      if (user) {
        return this.authService.login(user);
      }
      return { message: 'Invalid credentials' };
    }
}
