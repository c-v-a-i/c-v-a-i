import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CV } from '@server/entities/cv-entity/cv.entity';
import { CrudService } from '@server/common/services/crud-service';
import {
  exampleContactInfo,
  exampleEducationEntries,
  exampleProjectEntries,
  exampleSkillEntries,
  exampleWorkExperienceEntries,
} from './example-cv-data';
import { ContactInfo, Education, Project, Skill, WorkExperience } from '@server/entities';

@Injectable()
export class CvService extends CrudService<CV> {
  constructor(
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
    private readonly skillRepository: Repository<Skill>
  ) {
    super(CV.name, { updatedAt: 'DESC' }, cvRepository, 'userId');
  }

  async findAllByUser(userId: string): Promise<CV[]> {
    return this.cvRepository.find({ where: { userId } });
  }

  async generateCvFromTemplate(userId: string, cvTemplateId: string): Promise<CV> {
    const templateCV = await this.cvRepository.findOne({
      where: { id: cvTemplateId },
      relations: ['educationEntries', 'workExperienceEntries', 'projects', 'skills', 'achievements', 'contactInfo'],
    });

    if (!templateCV) {
      throw new NotFoundException('Template CV not found');
    }

    const extractInfo = <T extends { id: string; cvId: string }>(obj: T) => {
      const { id, cvId, ...rest } = obj;
      return rest;
    };

    const newCV = this.cvRepository.create({
      title: templateCV.title,
      userId,
    });

    newCV.educationEntries = templateCV.educationEntries.map((x) =>
      this.educationRepository.create({
        ...extractInfo(x),
        cv: newCV,
      })
    );
    newCV.workExperienceEntries = templateCV.workExperienceEntries.map((x) =>
      this.workExperienceRepository.create({
        ...extractInfo(x),
        cv: newCV,
      })
    );
    newCV.projects = templateCV.projects.map((x) =>
      this.projectRepository.create({
        ...extractInfo(x),
        cv: newCV,
      })
    );
    newCV.skills = templateCV.skills.map((x) =>
      this.skillRepository.create({
        ...extractInfo(x),
        cv: newCV,
      })
    );
    newCV.contactInfo = this.contactInfoRepository.create({
      ...templateCV.contactInfo,
      cv: newCV,
    });

    return this.cvRepository.save(newCV);
  }

  async generateExampleCv(userId: string): Promise<CV> {
    const exampleCv = this.cvRepository.create({
      title: 'Example CV',
      userId,
    });

    return this.cvRepository.save({
      ...exampleCv,
      educationEntries: exampleEducationEntries.map((x) => this.educationRepository.create(x)),
      workExperienceEntries: exampleWorkExperienceEntries.map((x) => this.workExperienceRepository.create(x)),
      projects: exampleProjectEntries.map((x) =>
        this.projectRepository.create({
          cv: exampleCv,
          ...x,
        })
      ),

      contactInfo: this.contactInfoRepository.create(exampleContactInfo),
      skills: exampleSkillEntries.map((x) => this.skillRepository.create(x)),
    });
  }
}
