import { TypeormConfigService } from '../../../config/typeorm/typeorm.config.service';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { HealthCheckGraphQLModule } from './services/healthcheck-graphql/healthcheck.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateScalar } from '@server/common/graphql/scalars';
import { ConfigModule } from '@nestjs/config';
import { typeormConfig } from '../../../config/typeorm/typeorm.config';
import { UserModule } from './entity-modules/user/user.module';
import { CvModule } from './entity-modules/cv/cv/cv.module';
import { EducationModule } from './entity-modules/education/education.module';
import { AboutMeModule } from './entity-modules/about-me/about-me.module';
import { ContactInfoModule } from './entity-modules/contact-info/contact-info.module';
import { ProjectModule } from './entity-modules/project/project.module';
import { SkillModule } from './entity-modules/skill/skill.module';
import { WorkExperienceModule } from './entity-modules/work-experience/work-experience.module';

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
    AboutMeModule,
    ContactInfoModule,
    ProjectModule,
    SkillModule,
    WorkExperienceModule,
    EducationModule,
  ],
  providers: [DateScalar],
})
export class WebServerModule {}
