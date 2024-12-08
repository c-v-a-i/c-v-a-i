import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CV } from '@server/entities/cv-entity/cv.entity';
import { CvService } from './cv.service';
import { CvResolver } from './cv.resolver';
import { ContactInfo, Education, Project, Skill, WorkExperience } from '@server/entities';
import { UserModule } from '../../user/user.module';
import { AboutMe } from '@server/entities/cv-entity/about-me.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CV, Education, WorkExperience, Project, ContactInfo, Skill, AboutMe]),
    forwardRef(() => UserModule),
  ],
  providers: [CvService, CvResolver],
  exports: [CvService],
})
export class CvModule {}
