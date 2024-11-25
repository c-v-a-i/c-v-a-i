import { Injectable } from '@nestjs/common';
import { CrudService } from '@server/common/services/crud-service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AboutMe } from '@server/entities/cv-entity/about-me.entity';

@Injectable()
export class AboutMeService extends CrudService<AboutMe> {
  constructor(
    @InjectRepository(AboutMe)
    private readonly aboutMeRepository: Repository<AboutMe>
  ) {
    super(
      AboutMe.name,
      {
        updatedAt: 'DESC',
      },
      aboutMeRepository,
      'userId'
    );
  }
}
