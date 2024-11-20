import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactInfo, Education, Project, Skill, User, WorkExperience } from '@server/entities';
import { DataloaderService } from './dataloader.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Education, WorkExperience, Project, Skill, ContactInfo])],
  providers: [DataloaderService],
  exports: [DataloaderService],
})
export class DataloaderModule {}
