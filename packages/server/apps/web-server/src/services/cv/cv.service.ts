import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import {
  isCvObjectTypeKeyForItemizedEntries,
  isCvObjectTypeKeyForObjectEntries,
  isCvObjectTypeKeyForPrimitiveValue,
  UpdateCvInput,
  UpdateEducationInput,
  UpdateProjectInput,
  UpdateSkillInput,
  UpdateWorkExperienceInput,
} from './dto/update-cv.input-type';
import { entries } from '@server/common/utils';
import { ConvertOrTypeToAndType, Values } from '@server/common/types';

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

  async getTopLevelProperty(
    cvId: string,
    propertyName: keyof Cv
  ): Promise<Cv[typeof propertyName]> {
    const cv = await this.cvModel.findById(cvId).select(propertyName).exec();
    const property = cv?.[propertyName];

    if (!property) {
      return undefined;
    }

    if (isCvObjectTypeKeyForItemizedEntries(propertyName)) {
      return Array.from(property.values());
    }

    return property;
  }

  async deleteEntryItem({
    cvId,
    userId,
    entryItemId,
    entryType,
  }: CvEntryItemManagerProps): Promise<boolean> {
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

  async generateCvFromTemplate({
    userId,
    cvId,
  }: {
    userId: string;
    cvId: string;
  }): Promise<Cv> {
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

  async generateExampleCv({
    userId,
  }: Pick<CvManagerProps, 'userId'>): Promise<Cv> {
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

  async updateCv({
    cvId,
    userId,
    data,
  }: CvManagerProps & { data: UpdateCvInput }): Promise<Cv> {
    const cv = await this.getCv({ cvId, userId });

    for (const [key, value] of entries(data)) {
      if (!cv[key]) {
        throw new BadRequestException(`Cv[${key}] is undefined`);
      }

      if (isCvObjectTypeKeyForItemizedEntries(key)) {
        const partialItemsForCvEntry = value as Values<
          Pick<UpdateCvInput, typeof key>
        >;
        const cvEntryItemsMap = cv[key];

        if (!partialItemsForCvEntry) {
          throw new BadRequestException(`UpdateInput[${key}] is empty`);
        }

        partialItemsForCvEntry.forEach(
          (
            newFields:
              | UpdateEducationInput
              | UpdateWorkExperienceInput
              | UpdateProjectInput
              | UpdateSkillInput
          ) => {
            const { id, ...fieldsToUpdate } = newFields;

            const existingEntry = cvEntryItemsMap.get(id);
            if (!existingEntry) {
              throw new NotFoundException(
                `Entry with ID '${id}' not found in '${key}'.`
              );
            }

            cvEntryItemsMap.set(id, {
              ...(existingEntry as ConvertOrTypeToAndType<
                typeof existingEntry
              >),
              ...(fieldsToUpdate as ConvertOrTypeToAndType<
                typeof fieldsToUpdate
              >),
            });
          }
        );
      } else if (isCvObjectTypeKeyForPrimitiveValue(key)) {
        cv[key] = value as ConvertOrTypeToAndType<
          Values<Pick<UpdateCvInput, typeof key>>
        >;
      } else if (isCvObjectTypeKeyForObjectEntries(key)) {
        const existingObject = cv[key];

        const partialValue = value as NonNullable<
          Partial<UpdateCvInput[typeof key]>
        >;

        for (const [subKey, subValue] of entries(partialValue)) {
          existingObject[subKey] = subValue ?? existingObject[subKey];
        }

        // store back. not sure we need that here implicitly
        cv[key] = existingObject as ConvertOrTypeToAndType<
          typeof existingObject
        >;
      }
    }

    await cv.save();
    return cv;
  }

  async generateNewEntryItem({
    entryType,
    cvId,
    userId,
  }: Omit<CvEntryItemManagerProps, 'entryItemId'>): Promise<Cv> {
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
