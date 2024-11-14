import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { EnvVariablesEnum } from '@server/common/constants/env';
import cookieParser from 'cookie-parser';
import { WebServerModule } from './web-server.module';

const localhostEnvCorsUrls = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  // localhost Gql playground
  'http://localhost:4000',
];

async function bootstrap() {
  const app = await NestFactory.create(WebServerModule);

  const configService = app.get(ConfigService);
  const environment = configService.get<'demo' | 'local' | 'prod'>(EnvVariablesEnum.ENVIRONMENT, 'local');
  const port = configService.get<string>(EnvVariablesEnum.PORT, '4000');

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
  await app.listen(port, host);
}

void bootstrap();
