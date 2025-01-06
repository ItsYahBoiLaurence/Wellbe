import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.PORTUI, // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Allow cookies
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Automatically strip fields not defined in the DTO
      forbidNonWhitelisted: true, // Throw an error if extra fields are present
      transform: true, // Automatically transform payloads into DTO instances
    }),
  );
  await app.listen(process.env.PORT);
}
bootstrap();
