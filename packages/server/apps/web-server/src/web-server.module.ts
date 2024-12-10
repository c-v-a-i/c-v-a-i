import { TypeormConfigService } from '../../../config/typeorm/typeorm.config.service';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { HealthCheckGraphQLModule } from './services/healthcheck-graphql/healthcheck.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateScalar } from '@server/common/graphql/scalars';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeormConfig } from '../../../config/typeorm/typeorm.config';
import { UserModule } from './entity-modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CvModule } from './services/cv/cv.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig],
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeormConfigService,
    }),
    HealthCheckGraphQLModule,
    CoreModule,
    AuthModule,
    UserModule,
    CvModule,
  ],
  providers: [DateScalar],
})
export class WebServerModule {}
