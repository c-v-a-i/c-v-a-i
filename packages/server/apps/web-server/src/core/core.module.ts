import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { HealthcheckController } from './healthcheck.controller';
import { appConfig, AppConfig } from '../config/app.config';
import { TimeoutInterceptor } from '@server/core/interceptors';
import { SentryGlobalFilter } from '@sentry/nestjs/setup';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig],
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const appConfig = configService.get<AppConfig>('app');

        if (!appConfig) {
          throw new Error('App configuration not found');
        }

        return {
          autoSchemaFile: true,
          installSubscriptionHandlers: true,
          autoTransformHttpErrors: true,
          introspection: appConfig.graphql.introspection,
          playground: appConfig.graphql.playground,
          cors: appConfig.cors,
        };
      },
    }),
  ],
  providers: [
    { provide: APP_PIPE, useClass: ValidationPipe },
    { provide: APP_FILTER, useClass: SentryGlobalFilter },
    { provide: APP_INTERCEPTOR, useClass: TimeoutInterceptor },
  ],
  controllers: [HealthcheckController],
})
export class CoreModule {}
