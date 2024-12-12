import { Field, ID, InputType, IntersectionType, OmitType, PartialType } from '@nestjs/graphql';
import {
  AboutMeObjectType,
  ContactInfoObjectType,
  EducationObjectType,
  ProjectObjectType,
  SkillObjectType,
  WorkExperienceObjectType,
} from './cv.object-type';
import { AreTypesEqual } from '@server/common/types';

@InputType()
class BaseUpdateInput {
  @Field(() => ID)
  id!: string;
}

@InputType()
export class UpdateAboutMeInput extends PartialType(AboutMeObjectType, InputType) {}

@InputType()
export class UpdateContactInfoInput extends PartialType(ContactInfoObjectType, InputType) {}

@InputType()
export class UpdateEducationInput extends IntersectionType(
  BaseUpdateInput,
  PartialType(OmitType(EducationObjectType, ['positionIndex'])),
  InputType
) {}

@InputType()
export class UpdateWorkExperienceInput extends IntersectionType(
  BaseUpdateInput,
  PartialType(OmitType(WorkExperienceObjectType, ['positionIndex'])),
  InputType
) {}

@InputType()
export class UpdateProjectInput extends IntersectionType(
  BaseUpdateInput,
  PartialType(OmitType(ProjectObjectType, ['positionIndex'])),
  InputType
) {}

@InputType()
export class UpdateSkillInput extends IntersectionType(BaseUpdateInput, PartialType(SkillObjectType), InputType) {}

@InputType()
export class UpdateCvInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => UpdateAboutMeInput, { nullable: true })
  aboutMe?: UpdateAboutMeInput;

  @Field(() => UpdateContactInfoInput, { nullable: true })
  contactInfo?: UpdateContactInfoInput;

  @Field(() => [UpdateEducationInput], { nullable: true })
  educationEntries?: UpdateEducationInput[];

  @Field(() => [UpdateWorkExperienceInput], { nullable: true })
  workExperienceEntries?: UpdateWorkExperienceInput[];

  @Field(() => [UpdateProjectInput], { nullable: true })
  projectEntries?: UpdateProjectInput[];

  @Field(() => [UpdateSkillInput], { nullable: true })
  skillEntries?: UpdateSkillInput[];
}

export const cvKeys = {
  itemizedEntries: [
    'educationEntries',
    'workExperienceEntries',
    'projectEntries',
    'skillEntries',
  ] as const satisfies (keyof UpdateCvInput)[],

  primitiveEntries: ['title'] as const satisfies (keyof UpdateCvInput)[],

  objectEntries: ['aboutMe', 'contactInfo'] as const satisfies (keyof UpdateCvInput)[],
};

export const isCvObjectTypeKeyForObjectEntries = (key: string): key is (typeof cvKeys)['objectEntries'][number] =>
  cvKeys.objectEntries.includes(key as (typeof cvKeys)['objectEntries'][number]);

export const isCvObjectTypeKeyForItemizedEntries = (key: string): key is (typeof cvKeys)['itemizedEntries'][number] =>
  cvKeys.itemizedEntries.includes(key as (typeof cvKeys)['itemizedEntries'][number]);

export const isCvObjectTypeKeyForPrimitiveValue = (key: string) =>
  cvKeys.primitiveEntries.includes(key as (typeof cvKeys)['primitiveEntries'][number]);

type ItemizedAndPrimitiveKeys = (typeof cvKeys)[keyof typeof cvKeys][number];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _allKeysCovered: AreTypesEqual<keyof UpdateCvInput, ItemizedAndPrimitiveKeys> = true;
