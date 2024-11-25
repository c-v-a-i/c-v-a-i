import { BadRequestException, forwardRef, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CV } from '@server/entities/cv-entity/cv.entity';
import { CrudService } from '@server/common/services/crud-service';
import {
  exampleAboutMe,
  exampleContactInfo,
  exampleEducationEntries,
  exampleProjectEntries,
  exampleSkillEntries,
  exampleWorkExperienceEntries,
} from './example-cv-data';
import { ContactInfo, Education, Project, Skill, User, WorkExperience } from '@server/entities';
import { UserService } from '../../user/user.service';
import { AboutMe } from '@server/entities/cv-entity/about-me.entity';

// TODO: use data from user google account:
//  name
//  email
//  phoneNumber if exists
@Injectable()
export class CvService extends CrudService<CV> {
  private readonly logger = new Logger(CvService.name);
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(CV)
    private readonly cvRepository: Repository<CV>,
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
      const templateCv = await manager.findOne(CV, {
        where: { id: templateId, userId },
        relations: {
          educationEntries: true,
          workExperienceEntries: true,
          projectEntries: true,
          skillEntries: true,
          contactInfo: true,
          aboutMe: true,
        },
      });

      if (!templateCv) {
        throw new NotFoundException('Template CV not found');
      }

      const extractInfo = <T extends { id: string; cvId: string }>(obj: T) => {
        const { id, cvId, ...rest } = obj;
        return rest;
      };

      const newCv = manager.create(CV, {
        title: templateCv.title,
        user,
      });

      await manager.save(newCv);

      newCv.educationEntries = await manager.save(
        templateCv.educationEntries.map((x) =>
          manager.create(Education, {
            ...extractInfo(x),
            cv: newCv,
          })
        )
      );

      newCv.workExperienceEntries = await manager.save(
        templateCv.workExperienceEntries.map((x) =>
          manager.create(WorkExperience, {
            ...extractInfo(x),
            cv: newCv,
          })
        )
      );

      newCv.projectEntries = await manager.save(
        templateCv.projectEntries.map((x) =>
          manager.create(Project, {
            ...extractInfo(x),
            cv: newCv,
          })
        )
      );

      newCv.skillEntries = await manager.save(
        templateCv.skillEntries.map((x) =>
          manager.create(Skill, {
            ...extractInfo(x),
            cv: newCv,
          })
        )
      );

      newCv.contactInfo = await manager.save(
        manager.create(ContactInfo, {
          ...extractInfo(templateCv.contactInfo),
          cv: newCv,
        })
      );

      newCv.aboutMe = await manager.save(
        manager.create(AboutMe, {
          ...extractInfo(templateCv.aboutMe),
          cv: newCv,
        })
      );

      return newCv;
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
        })
      );

      const educationEntries = await manager.save(
        exampleEducationEntries.map((x) =>
          manager.create(Education, {
            ...x,
            cv: exampleCv,
            user,
          })
        )
      );

      const workExperienceEntries = await manager.save(
        exampleWorkExperienceEntries.map((x) => manager.create(WorkExperience, { ...x, cv: exampleCv, user }))
      );

      const projects = await manager.save(
        exampleProjectEntries.map((x) =>
          manager.create(Project, {
            ...x,
            cv: exampleCv,
            user,
          })
        )
      );

      const contactInfo = await manager.save(
        manager.create(ContactInfo, {
          ...exampleContactInfo,
          cv: exampleCv,
          user,
        })
      );

      const aboutMe = await manager.save(
        manager.create(AboutMe, {
          ...exampleAboutMe,
          cv: exampleCv,
          user,
        })
      );

      const skills = await manager.save(
        exampleSkillEntries.map((x) =>
          manager.create(Skill, {
            ...x,
            cv: exampleCv,
            user,
          })
        )
      );

      return { ...exampleCv, educationEntries, workExperienceEntries, projects, contactInfo, skills, aboutMe };
    });
  }
}
