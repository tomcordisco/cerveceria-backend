import { Controller, Post, Body, Delete, Param, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationPipe } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    const { email, password, name } = createUserDto;

    // Check if user already exists
    const existingUser = await this.userService.findOneByEmail(email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    // Hash the password and create the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userService.create({ email, password: hashedPassword, name });
    return { message: 'User created successfully', user };
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') id: string) {
    await this.userService.deleteUser(id);
    return { message: 'User deleted successfully' };
  }
}
