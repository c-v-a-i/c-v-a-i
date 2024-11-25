import { Module } from '@nestjs/common';
import { WorkExperienceResolver } from './work-experience.resolver';
import { WorkExperienceService } from './work-experience.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkExperience } from '@server/entities';

@Module({
  imports: [TypeOrmModule.forFeature([WorkExperience])],
  providers: [WorkExperienceResolver, WorkExperienceService],
})
export class WorkExperienceModule {}
