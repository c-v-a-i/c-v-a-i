import { BadRequestException, forwardRef, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CV } from '@server/entities/cv-entity/cv.entity';
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
import CvEntryType from '../../../../../../libs/common/src/enums/cv-entry-type.enum';
import { match } from 'ts-pattern';

// TODO:
//  1. use data from user google account, when creating an example cv
//    name
//    email
//    phoneNumber if exists
//  2. Use mongoDB so there's no need to have this much of relations, because it's a complete shit :(

type CvEntryTypeToEntryMap = {
  [CvEntryType.WORK_EXPERIENCE]: WorkExperience;
  [CvEntryType.EDUCATION]: Education;
  [CvEntryType.PROJECT]: Project;
};

type GenerateNewEntryItemProps = {
  type: CvEntryType;
  cvId: string;
  userId: string;
};

@Injectable()
export class CvService {
  private readonly logger = new Logger(CvService.name);
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(CV)
    private readonly cvRepository: Repository<CV>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService
  ) {}

  async findOne(where: Pick<CV, 'id' | 'userId'>): Promise<CV> {
    return this.cvRepository.findOneOrFail({ where: where });
  }

  async removeOne(where: Pick<CV, 'id' | 'userId'>) {
    const entityToRemove = await this.findOne(where);
    if (!entityToRemove) {
      return false;
    }
    await this.cvRepository.remove([entityToRemove]);
    return true;
  }

  generateNewEntryItem = async ({
    type,
    cvId,
    userId,
  }: GenerateNewEntryItemProps): Promise<CvEntryTypeToEntryMap[CvEntryType]> => {
    const cv = await this.cvRepository.findOne({
      where: { id: cvId, userId },
      relations: ['workExperienceEntries'],
    });
    if (!cv) {
      throw new BadRequestException('No CV found');
    }

    return match(type)
      .with(CvEntryType.WORK_EXPERIENCE, async () => {
        const repo = this.dataSource.getRepository(WorkExperience);
        const newEntry = await repo.save(
          repo.create({
            cvId,
            userId,
            position: 'New Position',
            name: 'New Co',
            duration: '2020',
          })
        );

        cv.workExperienceEntries.push(newEntry);
        await this.cvRepository.save(cv);

        return newEntry;
      })
      .with(CvEntryType.PROJECT, async () => {
        // Create a new Project entry
        const repo = this.dataSource.getRepository(Project);
        return repo.save(
          repo.create({
            cvId,
            userId,
            name: 'New Project',
            description: 'A new project',
          })
        );
      })
      .with(CvEntryType.EDUCATION, async () => {
        // Create a new Education entry
        const repo = this.dataSource.getRepository(Education);
        return repo.save(
          repo.create({
            cvId,
            userId,
            name: 'Brno University of Technology',
            degree: 'B.Sc',
            duration: '2020',
          })
        );
      })
      .exhaustive();
  };

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
