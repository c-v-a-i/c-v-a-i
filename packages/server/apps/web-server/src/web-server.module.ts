import { TypeormConfigService } from '../../../config/typeorm/typeorm.config.service';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { HealthCheckGraphQLModule } from './services/healthcheck-graphql/healthcheck.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateScalar } from '@server/common/graphql/scalars';
import { GoogleAuthService } from './services/google-auth/google-auth.service';
import { GoogleAuthModule } from './services/google-auth/google-auth.module';
import { ExampleService } from './services/example/example.service';
import { ExampleResolver } from './services/example/example.resolver';
import { ExampleModule } from './services/example/example.module';

@Module({
  imports: [
    CoreModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeormConfigService,
    }),
    HealthCheckGraphQLModule,
    GoogleAuthModule,
    ExampleModule,
  ],
  providers: [DateScalar, GoogleAuthService, ExampleService, ExampleResolver],
})
export class WebServerModule {}
