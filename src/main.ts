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

const port = process.env.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new ValidationExceptionFilter());
  // app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new AuthGuard());
  // app.useGlobalGuards(new RolesGuard(Reflector));

  const options = new DocumentBuilder()
    .setTitle('API example')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  Logger.log(`Server is running on http://localhost:${port}`,'Boostrap');
}
bootstrap();
