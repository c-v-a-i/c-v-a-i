import { BadRequestException, forwardRef, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CV } from '@server/entities/cv-entity/cv.entity';
import { CrudService } from '@server/common/services/crud-service';
import {
  exampleContactInfo,
  exampleEducationEntries,
  exampleProjectEntries,
  exampleSkillEntries,
  exampleWorkExperienceEntries,
} from './example-cv-data';
import { ContactInfo, Education, Project, Skill, User, WorkExperience } from '@server/entities';
import { UserService } from '../../user/user.service';

@Injectable()
export class CvService extends CrudService<CV> {
  private readonly logger = new Logger(CvService.name);
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(CV)
    private readonly cvRepository: Repository<CV>,
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,
    @InjectRepository(WorkExperience)
    private readonly workExperienceRepository: Repository<WorkExperience>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(ContactInfo)
    private readonly contactInfoRepository: Repository<ContactInfo>,
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService
  ) {
    super(CV.name, { updatedAt: 'DESC' }, cvRepository, 'userId');
  }

  async findAllByUserAndCount(userId: string): Promise<[CV[], number]> {
    return this.cvRepository.findAndCount({ where: { userId } });
  }

  async generateCvFromTemplate({ userId, templateId }: { userId: User['id']; templateId: string }): Promise<CV> {
    const user = await this.userService.findOneBy({ id: userId });

    if (!user) {
      throw new BadRequestException('No user found and cannot generate a cv from a template');
    }

    return this.dataSource.transaction(async (manager) => {
      const templateCV = await manager.findOne(CV, {
        where: { id: templateId },
        relations: [
          'educationEntries',
          'workExperienceEntries',
          'projectEntries',
          'skillEntries',
          'achievements',
          'contactInfo',
        ],
      });

      if (!templateCV) {
        this.logger.error(`Template CV not found - aborting.`);
        throw new NotFoundException('Template CV not found');
      }

      const extractInfo = <T extends { id: string; cvId: string }>(obj: T) => {
        const { id, cvId, ...rest } = obj;
        return rest;
      };

      const newCV = manager.create(CV, {
        title: templateCV.title,
        user,
      });

      await manager.save(newCV);

      newCV.educationEntries = await manager.save(
        templateCV.educationEntries.map((x) =>
          manager.create(Education, {
            ...extractInfo(x),
            cv: newCV,
          })
        )
      );

      newCV.workExperienceEntries = await manager.save(
        templateCV.workExperienceEntries.map((x) =>
          manager.create(WorkExperience, {
            ...extractInfo(x),
            cv: newCV,
          })
        )
      );

      newCV.projectEntries = await manager.save(
        templateCV.projectEntries.map((x) =>
          manager.create(Project, {
            ...extractInfo(x),
            cv: newCV,
          })
        )
      );

      newCV.skillEntries = await manager.save(
        templateCV.skillEntries.map((x) =>
          manager.create(Skill, {
            ...extractInfo(x),
            cv: newCV,
          })
        )
      );

      newCV.contactInfo = await manager.save(
        manager.create(ContactInfo, {
          ...templateCV.contactInfo,
          cv: newCV,
        })
      );

      return newCV;
    });
  }

  async generateExampleCv({ userId }: { userId: User['id'] }): Promise<CV> {
    const user = await this.userService.findOneBy({ id: userId });
    if (!user) {
      throw new BadRequestException(`Cannot generate example CV because user with id "${userId}" not found`);
    }

    return this.dataSource.transaction(async (manager) => {
      const exampleCv = await manager.save(
        CV,
        manager.create(CV, {
          title: 'Example CV',
          user,
          userId: user.id,
        })
      );

      const educationEntries = await manager.save(
        exampleEducationEntries.map((x) =>
          manager.create(Education, {
            ...x,
            cv: exampleCv,
            cvId: exampleCv.id,
          })
        )
      );

      this.logger.debug(`added education entries: ${educationEntries.length}`);

      const workExperienceEntries = await manager.save(
        exampleWorkExperienceEntries.map((x) =>
          manager.create(WorkExperience, { ...x, cv: exampleCv, cvId: exampleCv.id })
        )
      );
      this.logger.debug(`added work experience entries: ${workExperienceEntries.length}`);

      const projects = await manager.save(
        exampleProjectEntries.map((x) =>
          manager.create(Project, {
            ...x,
            cv: exampleCv,
            cvId: exampleCv.id,
          })
        )
      );
      this.logger.debug(`Added project entries: ${projects.length}`);

      const contactInfo = await manager.save(
        manager.create(ContactInfo, {
          ...exampleContactInfo,
          cv: exampleCv,
          cvId: exampleCv.id,
        })
      );
      this.logger.debug(`Added contactInfo: ${!!contactInfo}`);

      const skills = await manager.save(
        exampleSkillEntries.map((x) => manager.create(Skill, { ...x, cv: exampleCv, cvId: exampleCv.id }))
      );

      this.logger.debug(`added skills ${skills.length}`);

      return { ...exampleCv, educationEntries, workExperienceEntries, projects, contactInfo, skills };
    });
  }
}
