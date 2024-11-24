import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactInfo, Education, Project, Skill, User, WorkExperience } from '@server/entities';
import { DataloaderService } from './dataloader.service';
import { AboutMe } from '@server/entities/cv-entity/about-me.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Education, WorkExperience, Project, Skill, ContactInfo, AboutMe])],
  providers: [DataloaderService],
  exports: [DataloaderService],
})
export class DataloaderModule {}
