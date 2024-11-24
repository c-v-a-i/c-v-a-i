import { registerAs } from '@nestjs/config';
import type { JwtModuleOptions } from '@nestjs/jwt';

export const refreshJwtConfig = registerAs(
  'refresh-jwt',
  (): JwtModuleOptions => ({
    secret: process.env.REFRESH_JWT_SECRET,
    signOptions: {
      expiresIn: process.env.REFRESH_JWT_EXPIRE_IN ?? '7d',
    },
  })
);
