import { Injectable } from '@nestjs/common';
import { Education } from '@server/entities';
import { CrudService } from '@server/common/services/crud-service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EducationService extends CrudService<Education> {
  constructor(
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>
  ) {
    super(
      Education.name,
      {
        updatedAt: 'DESC',
      },
      educationRepository,
      'cvId'
    );
  }
}
