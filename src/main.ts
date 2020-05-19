import 'dotenv/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, HttpException } from '@nestjs/common';
import { ValidationExceptionFilter } from'./filters/validation-exception.filter';
import { ValidationPipe } from './pipes/validation.pipe'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { RolesGuard } from './guards/roles.guard';
import { UsersService } from './users/users.service'
import { AuthGuard } from './guards/auth.guard';
import cors from 'cors';

const port = process.env.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  app.useGlobalFilters(new ValidationExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalGuards(new AuthGuard());

  await app.listen(port);
  Logger.log(`Server is running on http://localhost:${port}`,'Boostrap');
}
bootstrap();
