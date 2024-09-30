import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';  // Importa UserModule
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,  // Asegúrate de que UserModule está aquí
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET ?? 'NuevoToken',
      signOptions: { expiresIn: '600s' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
