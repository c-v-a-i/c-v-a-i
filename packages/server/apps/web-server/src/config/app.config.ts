import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  frontendUrl: process.env.FRONTEND_URL ?? '/',
  isProduction: process.env.NODE_ENV === 'production',
}));
