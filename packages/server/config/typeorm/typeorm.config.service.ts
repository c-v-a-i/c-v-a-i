import { Injectable, Inject } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import { typeormConfig } from './typeorm.config';

@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {
  constructor(
    @Inject(typeormConfig.KEY)
    private readonly typeormConfiguration: ConfigType<typeof typeormConfig>
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return this.typeormConfiguration;
  }
}
