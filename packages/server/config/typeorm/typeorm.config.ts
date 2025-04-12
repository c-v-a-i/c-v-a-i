import { registerAs } from '@nestjs/config';
import { join } from 'path';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as entitiesMap from '@server/entities';
import type { LoggerOptions } from 'typeorm';

const entities = Object.values(entitiesMap);

export const typeormConfig = registerAs(
  'typeorm',
  (): TypeOrmModuleOptions => ({
    // @ts-expect-error No need to be afraid
    type: process.env.TYPEORM_CONNECTION ?? 'postgres',
    host: process.env.TYPEORM_HOST ?? 'localhost',
    port: parseInt(process.env.TYPEORM_PORT ?? '5432', 10) || 5432,
    username: process.env.TYPEORM_USERNAME ?? 'postgres',
    password: process.env.TYPEORM_PASSWORD ?? 'postgres',
    database: process.env.TYPEORM_DATABASE ?? 'cvb',
    logging: (process.env.TYPEORM_LOGGING as LoggerOptions) || false,
    migrationsRun: true,
    entities,
    autoLoadEntities: true,
    useUTC: true,
    extra: {
      ssl:
        process.env.DATABASE_SSL === 'true'
          ? { rejectUnauthorized: false }
          : false,
      connectionTimeoutMillis: 60000,
    },
    migrations: [join(__dirname, '../../**', 'migrations/*.{ts,js}')],
  })
);
