import { Injectable } from '@nestjs/common';
import { Project } from '@server/entities';
import { CrudService } from '@server/common/services/crud-service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService extends CrudService<Project> {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>
  ) {
    super(
      Project.name,
      {
        updatedAt: 'DESC',
      },
      projectRepository,
      'userId'
    );
  }
}
