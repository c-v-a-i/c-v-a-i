import { Module } from '@nestjs/common';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '@server/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  providers: [ProjectResolver, ProjectService],
})
export class ProjectModule {}
