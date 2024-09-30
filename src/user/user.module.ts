import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET ?? 'NuevoToken',
      signOptions: { expiresIn: '600s' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],  // Exporta UserService
})
export class UserModule {}
