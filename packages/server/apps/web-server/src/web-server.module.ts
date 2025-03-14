import { TypeormConfigService } from '../../../config/typeorm/typeorm.config.service';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeormConfig } from '../../../config/typeorm/typeorm.config';
import { UserModule } from './entity-modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CvModule } from './services/cv/cv.module';
import { LlmIntegrationModule } from './services/llm-integration/llm-integration.module';

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
    CoreModule,
    AuthModule,
    UserModule,
    CvModule,
    LlmIntegrationModule,
  ],
  providers: [],
})
export class WebServerModule {}
