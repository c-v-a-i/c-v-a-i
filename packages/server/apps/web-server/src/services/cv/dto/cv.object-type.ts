import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  AboutMe,
  ContactInfo,
  Cv,
  CvVersion,
  Education,
  Project,
  Skill,
  WorkExperience,
} from '../../../../../../libs/schemas';
import { mapToArray } from '../utils';

@ObjectType()
export class CvObjectType {
  @Field(() => ID)
  _id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String)
  userId!: string;

  @Field(() => AboutMe, { nullable: true })
  aboutMe?: AboutMe;

  @Field(() => [Education], { nullable: true })
  educationEntries?: Education[];

  @Field(() => [WorkExperience], { nullable: true })
  workExperienceEntries?: WorkExperience[];

  @Field(() => [Project], { nullable: true })
  projectEntries?: Project[];

  @Field(() => [Skill], { nullable: true })
  skillEntries?: Skill[];

  @Field(() => [ContactInfo], { nullable: true })
  contactInfoEntries?: ContactInfo[];

  @Field(() => ID)
  versionId!: string;

  @Field(() => Number)
  versionNumber!: number;

  @Field(() => Date)
  versionCreatedAt!: Date;
}

export const createObjectType = ({
  cv,
  cvVersion,
}: {
  cv: Cv;
  cvVersion: CvVersion;
}): CvObjectType => {
  return {
    _id: String(cv._id),
    userId: cv.userId,
    title: cvVersion.data.title,
    aboutMe: cvVersion.data.aboutMe,
    educationEntries: mapToArray(cvVersion.data.educationEntries),
    workExperienceEntries: mapToArray(cvVersion.data.workExperienceEntries),
    projectEntries: mapToArray(cvVersion.data.projectEntries),
    skillEntries: mapToArray(cvVersion.data.skillEntries),
    contactInfoEntries: mapToArray(cvVersion.data.contactInfoEntries),
    versionId: cvVersion._id.toString(),
    versionNumber: cvVersion.versionNumber,
    versionCreatedAt: cvVersion.createdAt,
  };
};
