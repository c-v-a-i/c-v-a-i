import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export enum EnvVariablesEnum {
  PORT = 'PORT',

  TYPEORM_CONNECTION = 'TYPEORM_CONNECTION',
  TYPEORM_DATABASE = 'TYPEORM_DATABASE',
  TYPEORM_HOST = 'TYPEORM_HOST',
  TYPEORM_PASSWORD = 'TYPEORM_PASSWORD',
  TYPEORM_PORT = 'TYPEORM_PORT',
  TYPEORM_USERNAME = 'TYPEORM_USERNAME',
  TYPEORM_LOGGING = 'TYPEORM_LOGGING',

  DATABASE_SSL = 'DATABASE_SSL',
  ENVIRONMENT = 'ENVIRONMENT',
}

export class EnvVariables {
  @IsNumber()
  public readonly [EnvVariablesEnum.PORT]!: number;

  @IsString()
  public readonly [EnvVariablesEnum.TYPEORM_CONNECTION]!: string;

  @IsString()
  public readonly [EnvVariablesEnum.TYPEORM_DATABASE]!: string;

  @IsString()
  public readonly [EnvVariablesEnum.TYPEORM_HOST]!: string;

  @IsString()
  public readonly [EnvVariablesEnum.TYPEORM_PASSWORD]!: string;

  @IsNumber()
  public readonly [EnvVariablesEnum.TYPEORM_PORT]!: number;

  @IsString()
  public readonly [EnvVariablesEnum.TYPEORM_USERNAME]!: string;

  @IsString()
  public readonly [EnvVariablesEnum.ENVIRONMENT]!: 'demo' | 'local' | 'prod';

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  public readonly [EnvVariablesEnum.DATABASE_SSL]?: boolean;

  @IsOptional()
  @IsString({ each: true })
  public readonly [EnvVariablesEnum.TYPEORM_LOGGING]?: string | string[];
}
