import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

export default new DataSource({
  type: (process.env.TYPEORM_CONNECTION as 'postgres') ?? 'postgres',
  host: process.env.TYPEORM_HOST ?? 'localhost',
  port: process.env.TYPEORM_PORT
    ? parseInt(process.env.TYPEORM_PORT, 10)
    : 5432,
  username: process.env.TYPEORM_USERNAME ?? 'postgres',
  password: process.env.TYPEORM_PASSWORD ?? 'postgres',
  database: process.env.TYPEORM_DATABASE ?? 'cvai',
  synchronize: false,
  ssl:
    process.env.DATABASE_SSL === 'false'
      ? false
      : {
          rejectUnauthorized: false,
        },
  logging: 'all',
  entities: ['./libs/entities/**/*.entity.ts'],
  migrations: ['./apps/web-server/src/migrations/*.ts'],
  subscribers: [],
});
