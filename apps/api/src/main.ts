import { otelSDK } from './infrastructure/tracing/tracing';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './application/exceptions-filters/httpExceptionFilter';

async function bootstrap() {
  await otelSDK.start();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT') || 3000;
  Logger.log(`Environment: ${process.env.NODE_ENV}`, 'Bootstrap');
  Logger.log(`Listening in port: ${PORT}`, 'Bootstrap');

  const APP_NAME = configService.get('APP_NAME');
  const APP_DESCRIPTION = configService.get('APP_DESCRIPTION');
  const API_VERSION = configService.get('API_VERSION', 'v1');

  const options = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription(APP_DESCRIPTION)
    .setVersion(API_VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-pos', app, document);

  Logger.log('Mapped {/api-pos, GET} Swagger api route', 'RouterExplorer');

  await app.listen(PORT);
}
bootstrap();
