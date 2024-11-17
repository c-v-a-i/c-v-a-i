import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { WebServerModule } from './web-server.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import passport from 'passport';

const localhostEnvCorsUrls = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  // localhost Gql playground
  'http://localhost:4000',
];

async function bootstrap() {
  const app = await NestFactory.create(WebServerModule);

  const configService = app.get(ConfigService);
  const environment = configService.get<string>('ENVIRONMENT', 'local');
  const port = configService.get<number>('PORT', 4000);

  app.use(passport.initialize());
  app.use(cookieParser());

  const host = '0.0.0.0';

  const origin: string[] = [];

  if (environment === 'local') {
    origin.push(...localhostEnvCorsUrls);
  }

  app.enableCors({
    credentials: true,
    origin,
  });

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

  await app.listen(port, host);
}

void bootstrap();