import { Injectable } from '@nestjs/common';
import { Skill } from '@server/entities';
import { CrudService } from '@server/common/services/crud-service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SkillService extends CrudService<Skill> {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>
  ) {
    super(
      Skill.name,
      {
        updatedAt: 'DESC',
      },
      skillRepository,
      'userId'
    );
  }
}
