import { join } from 'path';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { EnvVariablesEnum } from '@server/common/constants/env';
import * as entitiesMap from '@server/entities';
import { LoggerOptions } from 'typeorm';

const entities = Object.values(entitiesMap);

@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const type = this.configService.get<'postgres'>(EnvVariablesEnum.TYPEORM_CONNECTION, 'postgres');
    const host = this.configService.get<string>(EnvVariablesEnum.TYPEORM_HOST, 'localhost');
    const logging = this.configService.get<LoggerOptions>(EnvVariablesEnum.TYPEORM_LOGGING);
    const port = +this.configService.get<number>(EnvVariablesEnum.TYPEORM_PORT, 5432);
    const username = this.configService.get<string>(EnvVariablesEnum.TYPEORM_USERNAME, 'postgres');
    const password = this.configService.get<string>(EnvVariablesEnum.TYPEORM_PASSWORD, 'postgres');
    const database = this.configService.get<string>(EnvVariablesEnum.TYPEORM_DATABASE, 'cvb');
    const databaseSSL = this.configService.get<string>(EnvVariablesEnum.DATABASE_SSL, 'false');

    return {
      type,
      host,
      port,
      username,
      password,
      database,
      migrationsRun: true,
      entities,
      autoLoadEntities: true,
      logging,
      useUTC: true,
      extra: {
        ssl: databaseSSL === 'true' ? { rejectUnauthorized: false } : false,
        connectionTimeoutMillis: 60000,
      },
      migrations: [join(__dirname, '../../**', 'migrations/*.{ts,js}')],
    };
  }
}
