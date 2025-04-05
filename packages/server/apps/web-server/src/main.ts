import * as Sentry from "@sentry/nestjs";

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { WebServerModule } from './web-server.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import passport from 'passport';
import { graphqlUploadExpress } from 'graphql-upload-ts';
import type { AppConfig } from './config/app.config';
import type { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(WebServerModule);
  const configService = app.get(ConfigService);

  const appConfig = configService.get<AppConfig>('app');

  if (!appConfig) {
    throw new Error('App configuration not found');
  }

  app.use(passport.initialize());
  app.use(cookieParser());
  app.use(graphqlUploadExpress(appConfig.upload));

  app.enableCors(appConfig.cors);
  app.set('trust proxy', true)

  Sentry.init(appConfig.sentry);

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API endpoints and schemas')
    .setVersion('1.0')
    .addCookieAuth('accessToken')
    .addCookieAuth('refreshToken')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.use('/api-docs-json', (_req: Request, res: Response) => {
    res.json(document);
  });

  await app.listen(appConfig.port, appConfig.host);
}

void bootstrap();