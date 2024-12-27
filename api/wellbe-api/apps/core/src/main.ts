require('dotenv').config();
import './setup/sentry';
import {
  BaseExceptionFilter,
  HttpAdapterHost,
  NestApplication,
  NestFactory,
} from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerService } from '@x/logging';
import * as fs from 'fs';
import * as Sentry from '@sentry/node';
import { resolve } from 'path';
import { AppModule } from './app/app.module';
import { ConfigOptions } from './config-options';
import configuration from './configuration';

const PORT = parseInt(process.env.PORT, 10);

async function bootstrap() {
  const config = configuration() as ConfigOptions;

  // App setup
  const app = await NestFactory.create<NestApplication>(
    AppModule.register(config)
  );
  const { httpAdapter } = app.get(HttpAdapterHost);
  Sentry.setupNestErrorHandler(app, new BaseExceptionFilter(httpAdapter));
  app.enableCors({ origin: '*' });
  app.useLogger(app.get(LoggerService));
  app.setGlobalPrefix('api');

  // Open Api setup
  const options = new DocumentBuilder()
    .setTitle('Wellbe API')
    .setDescription('Handles wellness related features')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/v1/explorer', app, document);

  // Generate OpenAPI spec file
  fs.writeFileSync(
    resolve(__dirname, 'openapi-spec.json'),
    JSON.stringify(document, null, 2)
  );

  await app.listen(PORT ?? 80);
}

bootstrap();
