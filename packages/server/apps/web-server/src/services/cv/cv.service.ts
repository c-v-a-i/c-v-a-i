import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  createObjectType,
  CvEntryType,
  cvEntryTypeToCvEntryNameMap,
  CvObjectType,
  isCvObjectTypeKeyForItemizedEntries,
  UpdateCvInput,
} from './dto';
import {
  ContactInfo,
  Cv,
  CvData,
  CvDocument,
  CvVersion,
  Education,
  Project,
  Skill,
  WorkExperience,
} from '../../../../../libs/schemas';
import cloneDeep from 'lodash/cloneDeep';

import {
  CreateEntryItemProps,
  CvEntryItemManagerProps,
  CvManagerMethodProps,
} from './types';
import { keys } from '@server/common/utils';
import { ConvertOrTypeToAndType } from '@c-v-a-i/common/lib';
import { match } from 'ts-pattern';
import {
  exampleAboutMe,
  exampleContactInfoEntries,
  exampleEducationEntries,
  exampleProjectEntries,
  exampleSkillEntries,
  exampleWorkExperienceEntries,
} from './example-cv-data';
import { arrayToMap } from './utils';
import { CreateCvParams } from './create-cv-params';

@Injectable()
export class CvService {
  constructor(
    @InjectModel(Cv.name)
    private readonly cvModel: Model<CvDocument>
  ) {}

  private getCurrentVersionFromCv(cv: CvDocument): CvVersion {
    const currentVersion = cv.versions.find(
      (v) => v._id === cv.currentVersionId
    );
    if (!currentVersion) {
      throw new NotFoundException('Current version not found');
    }
    return currentVersion;
  }

  private async validateUserOwnership(
    cvId: string,
    userId: string
  ): Promise<CvDocument> {
    const cv = await this.cvModel.findOne({ _id: cvId, userId }).exec();

    if (!cv) {
      throw new NotFoundException('CV not found or not owned by user');
    }

    return cv;
  }

  async getCv({
    cvId,
    userId,
    versionId = null,
  }: CvManagerMethodProps & {
    versionId?: string | null;
  }): Promise<CvObjectType> {
    const cv = await this.cvModel.findOne({ _id: cvId, userId }).lean().exec();

    if (!cv) {
      throw new NotFoundException('CV not found');
    }

    const targetVersionId = versionId ?? cv.currentVersionId;
    const version = cv.versions.find((v) => v._id === targetVersionId);

    if (!version) {
      throw new NotFoundException('CV version not found');
    }

    return createObjectType({
      cv,
      cvVersion: {
        _id: version._id,
        data: version.data,
        versionNumber: version.versionNumber,
        createdAt: version.createdAt,
        // cvId: cv._id.toString(),
      },
    });
  }

  async getCvs({
    userId,
  }: Pick<CvManagerMethodProps, 'userId'>): Promise<CvObjectType[]> {
    const cvs = await this.cvModel.find({ userId }).lean().exec();

    return cvs.map((cv) => {
      const currentVersion = cv.versions.find(
        (v) => v._id === cv.currentVersionId
      );
      if (!currentVersion) {
        throw new NotFoundException(
          `Current version not found for CV ${cv._id}`
        );
      }

      return createObjectType({
        cv,
        cvVersion: {
          _id: currentVersion._id,
          data: currentVersion.data,
          versionNumber: currentVersion.versionNumber,
          createdAt: currentVersion.createdAt,
          // cvId: cv._id.toString(),
        },
      });
    });
  }

  async generateNewEntryItem({
    entryFieldName,
    cvId,
    userId,
  }: Omit<CvEntryItemManagerProps, 'entryItemId'>) {
    const cv = await this.validateUserOwnership(cvId, userId);

    // Get the current version
    const currentVersion = this.getCurrentVersionFromCv(cv);
    const entryMapKey = cvEntryTypeToCvEntryNameMap[entryFieldName];

    // Create new entry
    const newEntry = this.createEntryItem({
      entryFieldName,
      positionIndex: keys(currentVersion.data[entryMapKey]).length,
    });

    // Clone and update data
    const newData = cloneDeep(currentVersion.data);
    newData[entryMapKey][newEntry._id] = newEntry as ConvertOrTypeToAndType<
      typeof newEntry
    >;

    // Create a new version
    const newVersionId = new Types.ObjectId().toString();
    const newVersion: CvVersion = {
      _id: newVersionId,
      data: newData,
      versionNumber: currentVersion.versionNumber + 1,
      createdAt: new Date(),
    };

    // Update the CV with the new version
    await this.cvModel
      .findByIdAndUpdate(cvId, {
        $push: { versions: newVersion },
        $set: {
          currentVersionId: newVersionId,
          currentTitle: newData.title,
        },
      })
      .exec();

    return newEntry;
  }

  private async createNewCvWithVersion(
    userId: string,
    versionData: CvData
  ): Promise<CvObjectType> {
    const cvId = new Types.ObjectId().toString();
    const versionId = new Types.ObjectId().toString();

    const newVersion: CvVersion = {
      _id: versionId,
      data: cloneDeep(versionData),
      versionNumber: 1,
      createdAt: new Date(),
    };

    const cv = await this.cvModel.create({
      _id: cvId,
      userId,
      currentVersionId: versionId,
      versions: [newVersion],
      currentTitle: versionData.title,
    });

    return createObjectType({
      cv,
      cvVersion: {
        _id: versionId,
        data: newVersion.data,
        versionNumber: newVersion.versionNumber,
        createdAt: newVersion.createdAt,
        // cvId,
      },
    });
  }

  async createCv(
    userId: string,
    params: CreateCvParams
  ): Promise<CvObjectType> {
    const versionData: CvData = {
      title: params.title,
      aboutMe: params.aboutMe ?? undefined,
      educationEntries: arrayToMap(params.educationEntries ?? []),
      workExperienceEntries: arrayToMap(params.workExperienceEntries ?? []),
      projectEntries: arrayToMap(params.projectEntries ?? []),
      skillEntries: arrayToMap(params.skillEntries ?? []),
      contactInfoEntries: arrayToMap(params.contactInfoEntries ?? []),
    };

    return this.createNewCvWithVersion(userId, versionData);
  }

  async deleteCv({ userId, cvId }: CvManagerMethodProps): Promise<boolean> {
    await this.validateUserOwnership(cvId, userId);

    const res = await this.cvModel.deleteOne({ _id: cvId }).exec();

    return res.deletedCount === 1;
  }

  private createEntryItem({
    entryFieldName,
    positionIndex,
  }: CreateEntryItemProps) {
    const _id = new Types.ObjectId().toString();

    return match(entryFieldName)
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

  async deleteEntryItem({
    cvId,
    userId,
    entryItemId,
    entryFieldName,
  }: CvEntryItemManagerProps): Promise<boolean> {
    const cv = await this.validateUserOwnership(cvId, userId);

    const currentVersion = this.getCurrentVersionFromCv(cv);
    const entryMapKey = cvEntryTypeToCvEntryNameMap[entryFieldName];
    const entryMap = currentVersion.data[entryMapKey];

    if (!entryMap?.[entryItemId]) {
      return false;
    }

    const newData = cloneDeep(currentVersion.data);
    delete newData[entryMapKey][entryItemId];

    const newVersionId = new Types.ObjectId().toString();
    const newVersion: CvVersion = {
      _id: newVersionId,
      data: newData,
      versionNumber: currentVersion.versionNumber + 1,
      createdAt: new Date(),
    };

    await this.cvModel
      .findByIdAndUpdate(cvId, {
        $push: { versions: newVersion },
        $set: {
          currentVersionId: newVersionId,
          currentTitle: newData.title,
        },
      })
      .exec();

    return true;
  }

  async updateCv({
    cvId,
    userId,
    data,
  }: CvManagerMethodProps & { data: UpdateCvInput }): Promise<CvObjectType> {
    const cv = await this.validateUserOwnership(cvId, userId);

    const currentVersion = this.getCurrentVersionFromCv(cv);

    const newData = this.applyUpdatesToVersionData(currentVersion.data, data);

    const newVersionId = new Types.ObjectId().toString();
    const newVersion: CvVersion = {
      _id: newVersionId,
      data: newData,
      versionNumber: currentVersion.versionNumber + 1,
      createdAt: new Date(),
    };

    await this.cvModel
      .findByIdAndUpdate(cvId, {
        $push: { versions: newVersion },
        $set: {
          currentVersionId: newVersionId,
          currentTitle: newData.title,
        },
      })
      .exec();

    return this.getCv({ cvId, userId });
  }

  private applyUpdatesToVersionData(
    baseData: CvData,
    updates: UpdateCvInput
  ): CvData {
    const newData = cloneDeep(baseData);

    for (const [key, value] of Object.entries(updates)) {
      if (key === 'title') {
        newData.title = value as string;
      } else if (isCvObjectTypeKeyForItemizedEntries(key)) {
        const updates = value as Array<{ _id: string }>;
        updates.forEach((update) => {
          const entry = newData[key][update._id];
          if (!entry) {
            throw new NotFoundException(`Entry ${update._id} not found`);
          }
          Object.assign(entry, update);
        });
      }
    }

    return newData;
  }

  async generateExampleCv({
    userId,
  }: Pick<CvManagerMethodProps, 'userId'>): Promise<CvObjectType> {
    return this.createCv(userId, {
      title: 'Example CV',
      aboutMe: exampleAboutMe,
      educationEntries: exampleEducationEntries,
      workExperienceEntries: exampleWorkExperienceEntries,
      projectEntries: exampleProjectEntries,
      skillEntries: exampleSkillEntries,
      contactInfoEntries: exampleContactInfoEntries,
    });
  }

  async generateCvFromTemplate({
    userId,
    cvId,
  }: {
    userId: string;
    cvId: string;
  }): Promise<CvObjectType> {
    // Get template CV
    const templateCv = await this.cvModel.findById(cvId).exec();
    if (!templateCv) {
      throw new NotFoundException('Template CV not found');
    }

    // Get current version from template
    const templateVersion = this.getCurrentVersionFromCv(templateCv);

    // Create new CV using template data
    return this.createNewCvWithVersion(userId, templateVersion.data);
  }

  async getTopLevelProperty<T extends keyof CvData>(
    cvId: string,
    propertyName: T
  ): Promise<CvData[T] | undefined> {
    const cv = await this.cvModel.findById(cvId).exec();
    if (!cv) {
      throw new NotFoundException('CV not found');
    }

    const currentVersion = this.getCurrentVersionFromCv(cv);
    const dataValue = currentVersion.data[propertyName];

    if (dataValue === undefined) {
      throw new NotFoundException(
        `Property '${String(propertyName)}' not found in CV data`
      );
    }

    return dataValue;
  }
}

// @Injectable()
// export class CvService {
//   constructor(
//     @InjectModel(Cv.name)
//     private readonly cvModel: Model<Cv>,
//     @InjectModel(CvVersion.name)
//     private readonly cvVersionModel: Model<CvVersion>
//   ) {}
//
//   async getCv({
//     cvId,
//     userId,
//     versionId = null,
//   }: CvManagerMethodProps & {
//     versionId?: string | null;
//   }): Promise<CvObjectType> {
//     return this.withTransaction(async (session) => {
//       const cv = await this.cvModel
//         .findOne({ _id: cvId, userId })
//         .session(session)
//         .lean()
//         .exec();
//
//       if (!cv) {
//         throw new NotFoundException('CV not found');
//       }
//
//       // Use specific version if provided, otherwise use current version
//       const versionObjectId = versionId
//         ? new Types.ObjectId(versionId)
//         : cv.currentVersionId;
//
//       const cvVersion = await this.cvVersionModel
//         .findById<CvVersion>(versionObjectId)
//         .session(session)
//         .lean()
//         .exec();
//
//       if (!cvVersion) {
//         throw new NotFoundException('CV version not found');
//       }
//
//       return createObjectType({
//         cv,
//         cvVersion,
//       });
//     });
//   }
//
//   async getCvs({
//     userId,
//   }: Pick<CvManagerMethodProps, 'userId'>): Promise<CvObjectType[]> {
//     const cvs = await this.cvModel
//       .find({ userId })
//       .populate('currentVersionId')
//       .lean()
//       .exec();
//
//     return cvs.map((cv) => {
//       const cvVersion = cv.currentVersionId as unknown as CvVersion;
//       return createObjectType({
//         cv,
//         cvVersion,
//       });
//     });
//   }
//
//   private createWithAutoId<T>(item: OmitId<T>): WithAutoId<T> {
//     return {
//       _id: new Types.ObjectId().toString(),
//       ...item,
//     } as WithAutoId<T>;
//   }
//
//   private createEntryItem({
//     entryFieldName,
//     positionIndex,
//   }: CreateEntryItemProps) {
//     const _id = new Types.ObjectId().toString();
//
//     return match(entryFieldName)
//       .returnType<Education | Project | Skill | WorkExperience | ContactInfo>()
//       .with(CvEntryType.EDUCATION, () => {
//         const item: Education = {
//           _id,
//           name: 'Brno University of Technology',
//           degree: 'Bc',
//           duration: '2020',
//           location: 'Prague',
//           description: 'Description',
//           skills: [],
//           positionIndex,
//         };
//         return item;
//       })
//       .with(CvEntryType.PROJECT, () => {
//         const item: Project = {
//           _id,
//           name: 'New Project',
//           description: 'A new project description',
//           skills: ['Programming', 'Cheating'],
//           positionIndex,
//         };
//         return item;
//       })
//       .with(CvEntryType.SKILL, () => {
//         const item: Skill = {
//           _id,
//           category: 'Soft Skills',
//           skills: ['Adaptability'],
//           positionIndex,
//         };
//         return item;
//       })
//       .with(CvEntryType.WORK_EXPERIENCE, () => {
//         const item: WorkExperience = {
//           _id,
//           name: 'New Company',
//           position: 'Developer',
//           positionIndex,
//         };
//         return item;
//       })
//       .with(CvEntryType.CONTACT_INFO, () => {
//         const item: ContactInfo = {
//           _id,
//           linkName: 'GitHub',
//           link: 'github.com/SkuratovichA',
//           positionIndex,
//         };
//         return item;
//       })
//       .exhaustive();
//   }
//
//   async generateNewEntryItem({
//     entryFieldName,
//     cvId,
//     userId,
//   }: Omit<CvEntryItemManagerProps, 'entryItemId'>) {
//     return this.withTransaction(async (session) => {
//       const currentVersion = await this.getCurrentVersion(cvId, session);
//       const entryMapKey = cvEntryTypeToCvEntryNameMap[entryFieldName];
//
//       const newEntry = this.createEntryItem({
//         entryFieldName,
//         positionIndex: keys(currentVersion.data[entryMapKey]).length,
//       });
//
//       const newData = cloneDeep(currentVersion.data);
//       newData[entryMapKey][newEntry._id] = newEntry as ConvertOrTypeToAndType<
//         typeof newEntry
//       >;
//
//       const newVersion = await this.createNewVersion(
//         cvId,
//         userId,
//         newData,
//         currentVersion,
//         session
//       );
//
//       await this.updateCvMetadata(
//         cvId,
//         {
//           $set: { currentVersionId: newVersion._id },
//           $push: { versions: newVersion._id },
//         },
//         session
//       );
//
//       return newEntry;
//     });
//   }
//
//   private async getCurrentVersion(
//     cvId: string,
//     session: ClientSession
//   ): Promise<CvVersionDocument> {
//     const cv = await this.cvModel.findById(cvId).session(session).exec();
//     if (!cv) throw new NotFoundException('CV not found');
//
//     const version = await this.cvVersionModel
//       .findById(cv.currentVersionId)
//       .session(session)
//       .exec();
//
//     if (!version) throw new NotFoundException('Current version not found');
//     return version;
//   }

//   private async withTransaction<T>(
//     operation: (session: ClientSession) => Promise<T>
//   ): Promise<T> {
//     const session = await this.cvModel.db.startSession();
//     session.startTransaction();
//
//     try {
//       const result = await operation(session);
//       await session.commitTransaction();
//       return result;
//     } catch (error) {
//       await session.abortTransaction();
//       throw new BadRequestException(
//         `Operation failed: ${(error as Error).message}`
//       );
//     } finally {
//       await session.endSession();
//     }
//   }
//
//   private async createNewVersion(
//     cvId: string,
//     userId: string,
//     data: CvData,
//     baseVersion?: CvVersionDocument,
//     session?: ClientSession
//   ): Promise<CvVersionDocument> {
//     const versionNumber = (baseVersion?.versionNumber ?? 0) + 1;
//     const [newVersion] = await this.cvVersionModel.create(
//       [
//         {
//           cvId,
//           userId,
//           data: cloneDeep(data),
//           versionNumber,
//           diffs: baseVersion ? this.generateDiffs(baseVersion.data, data) : [],
//         },
//       ],
//       { session }
//     );
//     return newVersion;
//   }
//
//   private generateDiffs(prevData: CvData, newData: CvData): object[] {
//     void prevData;
//     void newData;
//     // TODO: Implement actual diff generation logic
//     return [];
//   }
//
//   private async updateCvMetadata(
//     cvId: string,
//     update: UpdateQuery<CvDocument>,
//     session?: ClientSession
//   ): Promise<CvDocument | null> {
//     return this.cvModel
//       .findByIdAndUpdate(cvId, update, { new: true, session })
//       .exec();
//   }
//
//   private async createNewCvWithVersion(
//     userId: string,
//     versionData: CvData,
//     session: ClientSession
//   ): Promise<CvObjectType> {
//     const cvId = new Types.ObjectId().toString();
//
//     const cvVersion = await this.createNewVersion(
//       cvId,
//       userId,
//       versionData,
//       undefined,
//       session
//     );
//
//     const [cv] = await this.cvModel.create(
//       [
//         {
//           _id: cvId,
//           userId,
//           currentVersionId: cvVersion._id,
//           versions: [cvVersion._id],
//           currentTitle: versionData.title,
//         },
//       ],
//       { session }
//     );
//
//     return createObjectType({
//       cv,
//       cvVersion,
//     });
//   }
//
//   async createCv(
//     userId: string,
//     params: CreateCvParams
//   ): Promise<CvObjectType> {
//     return this.withTransaction(async (session) => {
//       const versionData: CvData = {
//         title: params.title,
//         aboutMe: params.aboutMe
//           ? this.createWithAutoId(params.aboutMe)
//           : undefined,
//         educationEntries: arrayToMap(params.educationEntries ?? []),
//         workExperienceEntries: arrayToMap(params.workExperienceEntries ?? []),
//         projectEntries: arrayToMap(params.projectEntries ?? []),
//         skillEntries: arrayToMap(params.skillEntries ?? []),
//         contactInfoEntries: arrayToMap(params.contactInfoEntries ?? []),
//       };
//
//       return this.createNewCvWithVersion(userId, versionData, session);
//     });
//   }
//
//

//
//

//
//   private async validateUserOwnership(
//     cvId: string,
//     userId: string,
//     session: ClientSession
//   ): Promise<void> {
//     const cv = await this.cvModel
//       .findOne({ _id: cvId, userId })
//       .session(session)
//       .exec();
//
//     if (!cv) {
//       throw new NotFoundException('CV not found or not owned by user');
//     }
//   }
//
//   async deleteCv({ userId, cvId }: CvManagerMethodProps): Promise<boolean> {
//     return this.withTransaction(async (session) => {
//       await this.validateUserOwnership(cvId, userId, session);
//
//       const res = await this.cvModel
//         .deleteOne({ _id: cvId })
//         .session(session)
//         .exec();
//
//       await this.cvVersionModel.deleteMany({ cvId }).session(session).exec();
//
//       return res.deletedCount === 1;
//     });
//   }
// }
