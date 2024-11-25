import { Injectable } from '@nestjs/common';
import { WorkExperience } from '@server/entities';
import { CrudService } from '@server/common/services/crud-service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WorkExperienceService extends CrudService<WorkExperience> {
  constructor(
    @InjectRepository(WorkExperience)
    private readonly workExperienceRepository: Repository<WorkExperience>
  ) {
    super(
      WorkExperience.name,
      {
        updatedAt: 'DESC',
      },
      workExperienceRepository,
      'userId'
    );
  }
}
