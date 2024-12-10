import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Cv } from '../cv.schema';

@ObjectType()
export class AboutMeObjectType {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  fieldName!: string;

  @Field(() => String)
  description!: string;
}

@ObjectType()
export class ContactInfoObjectType {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  phone!: string;
}

@ObjectType()
export class EducationObjectType {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  degree!: string;

  @Field(() => String, { nullable: true })
  duration?: string;

  @Field(() => String, { nullable: true })
  location?: string;

  @Field(() => String, { nullable: true })
  type?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => [String], { nullable: true })
  skills?: string[];
}

@ObjectType()
export class WorkExperienceObjectType {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  position!: string;

  @Field(() => String, { nullable: true })
  duration?: string;

  @Field(() => String, { nullable: true })
  location?: string;

  @Field(() => String, { nullable: true })
  type?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => [String], { nullable: true })
  skills?: string[];
}

@ObjectType()
export class ProjectObjectType {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  description!: string;

  @Field(() => [String])
  skills!: string[];
}

@ObjectType()
export class SkillObjectType {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  category!: string;

  @Field(() => [String])
  items!: string[];
}

@ObjectType()
export class CvObjectType {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String)
  userId!: string;

  @Field(() => AboutMeObjectType, { nullable: true })
  aboutMe?: AboutMeObjectType;

  @Field(() => ContactInfoObjectType, { nullable: true })
  contactInfo?: ContactInfoObjectType;

  @Field(() => [EducationObjectType], { nullable: true })
  educationEntries?: EducationObjectType[];

  @Field(() => [WorkExperienceObjectType], { nullable: true })
  workExperienceEntries?: WorkExperienceObjectType[];

  @Field(() => [ProjectObjectType], { nullable: true })
  projectEntries?: ProjectObjectType[];

  @Field(() => [SkillObjectType], { nullable: true })
  skillEntries?: SkillObjectType[];
}

export function convertToObjectType<T extends { _id: string }>(item: T): Omit<T, '_id'> & { id: T['_id'] } {
  const { _id: id, ...rest } = item;
  return { id, ...rest };
}

export function convertCvToObjectType(cv: Cv): CvObjectType {
  return {
    id: cv._id,
    title: cv.title,
    userId: cv.userId,
    aboutMe: cv.aboutMe ? convertToObjectType(cv.aboutMe) : undefined,
    contactInfo: cv.contactInfo ? convertToObjectType(cv.contactInfo) : undefined,
    educationEntries: cv.educationEntries
      ? Array.from(cv.educationEntries.values()).map((e) => convertToObjectType(e))
      : undefined,
    workExperienceEntries: cv.workExperienceEntries
      ? Array.from(cv.workExperienceEntries.values()).map((e) => convertToObjectType(e))
      : undefined,
    projectEntries: cv.projectEntries
      ? Array.from(cv.projectEntries.values()).map((e) => convertToObjectType(e))
      : undefined,
    skillEntries: cv.skillEntries ? Array.from(cv.skillEntries.values()).map((e) => convertToObjectType(e)) : undefined,
  };
}
