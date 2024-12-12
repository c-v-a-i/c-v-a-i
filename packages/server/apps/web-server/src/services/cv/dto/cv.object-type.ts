import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Cv } from '../cv.schema';
import pick from 'lodash/pick';
import { Document } from 'mongoose';
import { AreTypesEqual } from '@server/common/types';

@ObjectType()
export class AboutMeObjectType {
  @Field(() => ID)
  _id!: string;

  @Field(() => String)
  fieldName!: string;

  @Field(() => String)
  description!: string;
}

@ObjectType()
export class ContactInfoObjectType {
  @Field(() => ID)
  _id!: string;

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
  _id!: string;

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

  @Field(() => Int)
  positionIndex!: number;
}

@ObjectType()
export class WorkExperienceObjectType {
  @Field(() => ID)
  _id!: string;

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

  @Field(() => Int)
  positionIndex!: number;
}

@ObjectType()
export class ProjectObjectType {
  @Field(() => ID)
  _id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  description!: string;

  @Field(() => [String])
  skills!: string[];

  @Field(() => Int)
  positionIndex!: number;
}

@ObjectType()
export class SkillObjectType {
  @Field(() => ID)
  _id!: string;

  @Field(() => String)
  category!: string;

  @Field(() => [String])
  items!: string[];

  @Field(() => Int)
  positionIndex!: number;
}

@ObjectType()
export class CvObjectType {
  @Field(() => ID)
  _id!: string;

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

// convert for getCv-like resolvers, all other fields are fetched on-demand
export function convertCvToObjectType(cv: Cv): CvObjectType {
  return pick(cv, ['_id', 'title', 'userId']);
}

type AllCvKeys = keyof Omit<Cv, keyof Document>;
type AllCvObjectTypeKeys = keyof Omit<CvObjectType, '_id'>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _cvCompatibleWithCvObjectType: AreTypesEqual<AllCvKeys, AllCvObjectTypeKeys> = true;
