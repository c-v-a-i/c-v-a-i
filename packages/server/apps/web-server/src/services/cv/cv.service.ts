import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  CvEntryType,
  cvEntryTypeToCvEntryNameMap,
  isCvKeyForPrimitiveValue,
  isCvObjectTypeKeyForItemizedEntries,
  isCvObjectTypeKeyForObjectEntries,
  UpdateCvInput,
  UpdateEducationInput,
  UpdateProjectInput,
  UpdateSkillInput,
  UpdateWorkExperienceInput,
} from './dto';
import { match } from 'ts-pattern';
import {
  exampleAboutMe,
  exampleEducationEntries,
  exampleContactInfoEntries,
  exampleProjectEntries,
  exampleSkillEntries,
  exampleWorkExperienceEntries,
} from './example-cv-data';
import { arrayToMap } from './utils';
import { entries } from '@server/common/utils';
import { ConvertOrTypeToAndType, Values } from '@server/common/types';
import {
  ContactInfo,
  Cv,
  CvDocument,
  Education,
  Project,
  Skill,
  WorkExperience,
} from '../../../../../libs/schemas';

type CvManagerProps = {
  cvId: string;
  userId: string;
};

type EntryItemSelectorProps = {
  entryItemId: string;
  entryType: CvEntryType;
};
type CvEntryItemManagerProps = CvManagerProps & EntryItemSelectorProps;

type CreateEntryItemProps = { entryType: CvEntryType; positionIndex: number };

@Injectable()
export class CvService {
  constructor(@InjectModel(Cv.name) private readonly cvModel: Model<Cv>) {}

  async getCv({ cvId, userId }: CvManagerProps): Promise<CvDocument> {
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

  async getTopLevelProperty<T extends keyof Cv>(cvId: string, propertyName: T) {
    const cv = await this.cvModel.findById(cvId).select(propertyName).exec();
    const property = cv?.get(propertyName);

    if (!property) {
      return undefined;
    }

    return property as Cv[typeof propertyName];
  }

  async deleteEntryItem({
    cvId,
    userId,
    entryItemId,
    entryType,
  }: CvEntryItemManagerProps): Promise<boolean> {
    const cv = await this.getCv({ cvId, userId });

    const entryMap = cv[cvEntryTypeToCvEntryNameMap[entryType]];

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
  }) {
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

  async generateExampleCv({ userId }: Pick<CvManagerProps, 'userId'>) {
    const example = new this.cvModel({
      title: 'Example CV',
      userId,
      aboutMe: exampleAboutMe,
      educationEntries: arrayToMap(exampleEducationEntries),
      workExperienceEntries: arrayToMap(exampleWorkExperienceEntries),
      projectEntries: arrayToMap(exampleProjectEntries),
      skillEntries: arrayToMap(exampleSkillEntries),
      contactInfoEntries: arrayToMap(exampleContactInfoEntries),
    });

    return example.save();
  }

  async updateCv({
    cvId,
    userId,
    data,
  }: CvManagerProps & { data: UpdateCvInput }) {
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
            const { _id, ...fieldsToUpdate } = newFields;

            const existingEntry = cvEntryItemsMap.get(_id);
            if (!existingEntry) {
              throw new NotFoundException(
                `Entry with ID '${_id}' not found in '${key}'.`
              );
            }

            existingEntry.set(fieldsToUpdate);
          }
        );
      } else if (isCvKeyForPrimitiveValue(key)) {
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
        cv[key] = existingObject;
      }
    }

    await cv.save();
    return cv;
  }

  private createEntryItem({ entryType, positionIndex }: CreateEntryItemProps) {
    const _id = new Types.ObjectId().toString();

    return match(entryType)
      .returnType<Education | Project | Skill | WorkExperience | ContactInfo>()
      .with(CvEntryType.EDUCATION, () => {
        const item: Education = {
          _id,
          name: 'Brno University of Technology',
          degree: 'Bc',
          duration: '2020',
          location: 'Prague',
          description: 'Description',
          skills: [],
          positionIndex,
        };
        return item;
      })
      .with(CvEntryType.PROJECT, () => {
        const item: Project = {
          _id,
          name: 'New Project',
          description: 'A new project description',
          skills: ['Programming', 'Cheating'],
          positionIndex,
        };
        return item;
      })
      .with(CvEntryType.SKILL, () => {
        const item: Skill = {
          _id,
          category: 'Soft Skills',
          skills: ['Adaptability'],
          positionIndex,
        };
        return item;
      })
      .with(CvEntryType.WORK_EXPERIENCE, () => {
        const item: WorkExperience = {
          _id,
          name: 'New Company',
          position: 'Developer',
          positionIndex,
        };
        return item;
      })
      .with(CvEntryType.CONTACT_INFO, () => {
        const item: ContactInfo = {
          _id,
          linkName: 'GitHub',
          link: 'github.com/SkuratovichA',
          positionIndex,
        };
        return item;
      })
      .exhaustive();
  }

  async generateNewEntryItem({
    entryType,
    cvId,
    userId,
  }: Omit<CvEntryItemManagerProps, 'entryItemId'>) {
    const cv = await this.getCv({ cvId, userId });

    const cvEntryName = cvEntryTypeToCvEntryNameMap[entryType];
    const cvEntryMap = cv[cvEntryName];

    const positionIndex = cvEntryMap.size;

    const newEntryItem = this.createEntryItem({ entryType, positionIndex });

    // @ts-ignore it expects SomethingDocument, but actually Something is enough, and Document is generated on the runtime
    cvEntryMap.set(newEntryItem._id, newEntryItem);

    return cv.save();
  }
}
