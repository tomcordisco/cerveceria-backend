import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para permitir peticiones
  app.enableCors({
    origin: 'http://localhost:3001', // La URL de cerveceria-frontend
    methods: 'GET,POST,PUT,DELETE',
    credentials: true, // Habilita el uso de cookies
  });

  app.setGlobalPrefix('api')

  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    })
   );

  await app.listen(3000);
}
bootstrap();