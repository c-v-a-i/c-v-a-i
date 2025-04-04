import { registerAs } from '@nestjs/config';
import { getCorsUrls } from '../cors-urls';
import type { CookieOptions } from 'express';

export type UploadConfig = {
  maxFileSize: number;
  maxFiles: number;
};

export type CorsConfig = {
  credentials: boolean;
  origin: string[];
};

export type GraphQLConfig = {
  playground: boolean;
  introspection: boolean;
};

export type CookieConfig = {};

export type AppConfig = {
  environment: string;
  port: number;
  host: string;
  frontendUrl: string;
  isProduction: boolean;
  cors: CorsConfig;
  graphql: GraphQLConfig;
  upload: UploadConfig;
  cookieOptions: CookieOptions;
};

export const appConfig = registerAs('app', (): AppConfig => {
  const environment = process.env.NODE_ENV ?? 'local';
  const isProduction = environment !== 'local';

  return {
    environment,
    port: parseInt(process.env.PORT ?? '4000', 10),
    host: '0.0.0.0',
    frontendUrl: process.env.FRONTEND_URL ?? '/',
    isProduction,
    cors: {
      credentials: true,
      origin: getCorsUrls(environment),
    },
    cookieOptions: {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      domain: process.env.APEX_URL,
    },
    graphql: {
      playground: environment === 'local',
      introspection: environment === 'local',
    },
    upload: {
      maxFileSize: 10 * 1024 * 1024,
      maxFiles: 3,
    },
  };
});
