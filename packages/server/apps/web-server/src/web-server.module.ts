import { TypeormConfigService } from '../../../config/typeorm/typeorm.config.service';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { HealthCheckGraphQLModule } from './services/healthcheck-graphql/healthcheck.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateScalar } from '@server/common/graphql/scalars';
import { ExampleService } from './services/example/example.service';
import { ExampleResolver } from './services/example/example.resolver';
import { ExampleModule } from './services/example/example.module';
import { ConfigModule } from '@nestjs/config';
import { typeormConfig } from '../../../config/typeorm/typeorm.config';
import { UserModule } from './entity-modules/user/user.module';
import { CvModule } from './entity-modules/cv/cv/cv.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeormConfigService,
    }),
    HealthCheckGraphQLModule,
    CoreModule,
    AuthModule,
    UserModule,
    CvModule,
    ExampleModule,
  ],
  providers: [DateScalar, ExampleService, ExampleResolver],
})
export class WebServerModule {}
