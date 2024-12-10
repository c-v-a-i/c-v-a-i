import { Field, ID, InputType, IntersectionType, OmitType, PartialType } from '@nestjs/graphql';
import {
  AboutMeObjectType,
  ContactInfoObjectType,
  CvObjectType,
  EducationObjectType,
  ProjectObjectType,
  SkillObjectType,
  WorkExperienceObjectType,
} from './cv.object-type';

@InputType()
class BaseUpdateInput {
  @Field(() => ID)
  id!: string;
}

@InputType()
export class UpdateAboutMeInput extends PartialType(AboutMeObjectType) {}

@InputType()
export class UpdateContactInfoInput extends PartialType(ContactInfoObjectType) {}

@InputType()
export class UpdateEducationInput extends IntersectionType(BaseUpdateInput, PartialType(EducationObjectType)) {}

@InputType()
export class UpdateWorkExperienceInput extends IntersectionType(
  BaseUpdateInput,
  PartialType(WorkExperienceObjectType)
) {}

@InputType()
export class UpdateProjectInput extends IntersectionType(BaseUpdateInput, PartialType(ProjectObjectType)) {}

@InputType()
export class UpdateSkillInput extends IntersectionType(BaseUpdateInput, PartialType(SkillObjectType)) {}

@InputType()
export class UpdateCvInput extends PartialType(
  OmitType(CvObjectType, ['educationEntries', 'workExperienceEntries', 'projectEntries', 'skillEntries'])
) {
  @Field(() => [UpdateEducationInput], { nullable: true })
  educationEntries?: UpdateEducationInput[];

  @Field(() => [UpdateWorkExperienceInput], { nullable: true })
  workExperienceEntries?: UpdateWorkExperienceInput[];

  @Field(() => [UpdateProjectInput], { nullable: true })
  projectEntries?: UpdateProjectInput[];

  @Field(() => [UpdateSkillInput], { nullable: true })
  skillEntries?: UpdateSkillInput[];
}
