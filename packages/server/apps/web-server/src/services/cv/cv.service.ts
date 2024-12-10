import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cv } from './cv.schema';
import { CvEntryType } from './dto';
import { match } from 'ts-pattern';
import {
  exampleAboutMe,
  exampleContactInfo,
  exampleEducationEntries,
  exampleProjectEntries,
  exampleSkillEntries,
  exampleWorkExperienceEntries,
} from './example-cv-data';
import { arrayToMap } from './utils';
import { UpdateCvInput } from './dto/update-cv.input-type';

export const entries = <T extends object>(obj: T): [keyof T, T[keyof T]][] =>
  Object.entries(obj) as [keyof T, T[keyof T]][];

type CvManagerProps = {
  cvId: string;
  userId: string;
};

type CvEntryItemManagerProps = CvManagerProps & {
  entryItemId: string;
  entryType: CvEntryType;
};

@Injectable()
export class CvService {
  constructor(@InjectModel(Cv.name) private readonly cvModel: Model<Cv>) {}

  async getCv({ cvId, userId }: CvManagerProps): Promise<Cv> {
    const cv = await this.cvModel.findOne({ _id: cvId, userId }).exec();
    if (!cv) {
      throw new NotFoundException(`CV not found or not owned by user`);
    }
    return cv;
  }

  async getCvs({ userId }: Pick<CvManagerProps, 'userId'>): Promise<Cv[]> {
    return this.cvModel.find({ userId }).exec();
  }

  async deleteCv({ userId, cvId }: CvManagerProps): Promise<boolean> {
    const res = await this.cvModel.deleteOne({ _id: cvId, userId }).exec();
    return res.deletedCount === 1;
  }

  async deleteEntryItem({ cvId, userId, entryItemId, entryType }: CvEntryItemManagerProps): Promise<boolean> {
    const cv = await this.getCv({ cvId, userId });

    const entryMap = match(entryType)
      .with(CvEntryType.EDUCATION, () => cv.educationEntries)
      .with(CvEntryType.WORK_EXPERIENCE, () => cv.workExperienceEntries)
      .with(CvEntryType.PROJECT, () => cv.projectEntries)
      .with(CvEntryType.SKILL, () => cv.skillEntries)
      .exhaustive();

    if (!entryMap?.has(entryItemId)) {
      return false;
    }

    entryMap.delete(entryItemId);
    await cv.save();
    return true;
  }

  async generateCvFromTemplate({ userId, cvId }: { userId: string; cvId: string }): Promise<Cv> {
    const templateCv = await this.getCv({ cvId, userId });

    const newCv = new this.cvModel({
      ...templateCv.toObject(),
      _id: undefined,
      userId,
      createdAt: undefined,
      updatedAt: undefined,
    });

    return newCv.save();
  }

  async generateExampleCv({ userId }: Pick<CvManagerProps, 'userId'>): Promise<Cv> {
    const example = new this.cvModel({
      title: 'Example CV',
      userId,
      aboutMe: exampleAboutMe,
      contactInfo: exampleContactInfo,
      educationEntries: arrayToMap(exampleEducationEntries),
      workExperienceEntries: arrayToMap(exampleWorkExperienceEntries),
      projectEntries: arrayToMap(exampleProjectEntries),
      skillEntries: arrayToMap(exampleSkillEntries),
    });

    return example.save();
  }

  async updateCv({ cvId, userId, data }: CvManagerProps & { data: UpdateCvInput }): Promise<Cv> {
    const cv = await this.getCv({ cvId, userId });

    // move this outside
    const cvEntryKeys: (keyof Cv)[] = ['educationEntries', 'workExperienceEntries', 'projectEntries', 'skillEntries'];

    for (const [key, value] of entries(data)) {
      // TODO: use ts-pattern
      // match()

      if (cvEntryKeys.includes(key)) {
        const updates = value as { id: string }[]; // Type narrowed to Update*Input[]
        const map = cv[key as keyof Cv];

        if (!map) {
          throw new BadRequestException(`Field '${key}' does not exist in the CV.`);
        }

        updates.forEach(({ id, ...fieldsToUpdate }) => {
          const existingEntry = map.get(id);
          if (!existingEntry) {
            throw new NotFoundException(`Entry with ID '${id}' not found in '${key}'.`);
          }
          map.set(id, { ...existingEntry, ...fieldsToUpdate });
        });
      } else {
        cv[key] = value;
      }
    }

    await cv.save();
    return cv;
  }

  async generateNewEntryItem({ entryType, cvId, userId }: Omit<CvEntryItemManagerProps, 'entryItemId'>): Promise<Cv> {
    const cv = await this.getCv({ cvId, userId });

    match(entryType)
      .with(CvEntryType.EDUCATION, () => {
        if (!cv.educationEntries) {
          cv.educationEntries = new Map();
        }
        const newId = new Types.ObjectId().toString();
        const positionIndex = cv.educationEntries.size;
        cv.educationEntries.set(newId, {
          _id: newId,
          name: 'New Institution',
          degree: 'B.Sc',
          duration: '2020',
          location: 'Prague',
          description: 'Description',
          skills: [],
          positionIndex,
        });
      })
      .with(CvEntryType.WORK_EXPERIENCE, () => {
        if (!cv.workExperienceEntries) {
          cv.workExperienceEntries = new Map();
        }
        const newId = new Types.ObjectId().toString();
        const positionIndex = cv.workExperienceEntries.size;
        cv.workExperienceEntries.set(newId, {
          _id: newId,
          name: 'New Company',
          position: 'Developer',
          positionIndex,
        });
      })
      .with(CvEntryType.PROJECT, () => {
        if (!cv.projectEntries) {
          cv.projectEntries = new Map();
        }
        const newId = new Types.ObjectId().toString();
        const positionIndex = cv.projectEntries.size;
        cv.projectEntries.set(newId, {
          _id: newId,
          name: 'New Project',
          description: 'A new project description',
          skills: [],
          positionIndex,
        });
      })
      .with(CvEntryType.SKILL, () => {
        if (!cv.skillEntries) {
          cv.skillEntries = new Map();
        }
        const newId = new Types.ObjectId().toString();
        const positionIndex = cv.skillEntries.size;
        cv.skillEntries.set(newId, {
          _id: newId,
          category: 'Soft Skills',
          items: ['Adaptability'],
          positionIndex,
        });
      })
      .exhaustive();

    return cv.save();
  }
}
