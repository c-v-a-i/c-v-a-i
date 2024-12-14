import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { HealthcheckController } from './healthcheck.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => ({
        autoSchemaFile: true,
        installSubscriptionHandlers: true,
        autoTransformHttpErrors: true,
        introspection: true, // take from env variables
        playground: false, // take from env variables
        // {
        //   settings: {
        //     'request.credentials': 'include',
        //   },
        // },
        cors: {
          credentials: true,
          origin: true,
        },
      }),
    }),
  ],
  providers: [{ provide: APP_PIPE, useClass: ValidationPipe }],
  controllers: [HealthcheckController],
})
export class CoreModule {}
