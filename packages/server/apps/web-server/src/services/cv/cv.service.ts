import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  createObjectType,
  CvEntryType,
  cvEntryTypeToCvEntryNameMap,
  CvObjectType,
  CvVersionHistoryEntry,
  isCvObjectTypeKeyForItemizedEntries,
  PaginatedCvVersionHistoryObjectType,
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

  async getCvVersionHistory({
    userId,
    cvId,
    page = 1,
    limit = 10,
  }: CvManagerMethodProps & {
    page?: number;
    limit?: number;
  }): Promise<PaginatedCvVersionHistoryObjectType> {
    const cv = await this.validateUserOwnership(cvId, userId);

    const totalCount = cv.versions.length;

    const startIndex = (page - 1) * limit;
    const endIndex = Math.min(startIndex + limit, totalCount);

    const sortedVersions = cv.versions.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );

    const paginatedVersions = sortedVersions
      .slice(startIndex, endIndex)
      .map((version): CvVersionHistoryEntry => {
        return {
          _id: version._id,
          versionNumber: version.versionNumber,
          createdAt: version.createdAt,
          isCurrentVersion: version._id === cv.currentVersionId,
        };
      });

    return {
      items: paginatedVersions,
      paginationMetadata: {
        totalItems: totalCount,
        currentPage: page,
        pageSize: limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  }

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
