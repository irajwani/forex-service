import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors);
      },
    }),
  );

  const appConfig = app.get(ConfigService).get('app');
  if (appConfig.swaggerEnabled) {
    const config = new DocumentBuilder()
      .setTitle('Xanpool Server')
      .setDescription('REST and GraphQL API to fetch currency rate pairs')
      .setVersion('0.0.1')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('documentation', app, document);
  }

  const port: string | number = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
