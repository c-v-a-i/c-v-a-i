import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CV } from '@server/entities/cv-entity/cv.entity';
import { CvService } from './cv.service';
import { CvResolver } from './cv.resolver';
import { ContactInfo, Education, Project, Skill, WorkExperience } from '@server/entities';

@Module({
  imports: [TypeOrmModule.forFeature([CV, Education, WorkExperience, Project, ContactInfo, Skill])],
  providers: [CvService, CvResolver],
  exports: [CvService],
})
export class CvModule {}
