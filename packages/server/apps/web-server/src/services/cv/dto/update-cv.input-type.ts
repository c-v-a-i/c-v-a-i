import {
  Field,
  ID,
  InputType,
  IntersectionType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import {
  AboutMe,
  ContactInfo,
  Education,
  Project,
  Skill,
  WorkExperience,
} from '../../../../../../libs/schemas';

@InputType()
class BaseUpdateInput {
  @Field(() => ID)
  _id!: string;
}

@InputType()
export class UpdateAboutMeInput extends PartialType(AboutMe, InputType) {}

@InputType()
export class UpdateContactInfoInput extends IntersectionType(
  BaseUpdateInput,
  PartialType(OmitType(ContactInfo, ['positionIndex'])),
  InputType
) {}

@InputType()
export class UpdateEducationInput extends IntersectionType(
  BaseUpdateInput,
  PartialType(OmitType(Education, ['positionIndex'])),
  InputType
) {}

@InputType()
export class UpdateWorkExperienceInput extends IntersectionType(
  BaseUpdateInput,
  PartialType(OmitType(WorkExperience, ['positionIndex'])),
  InputType
) {}

@InputType()
export class UpdateProjectInput extends IntersectionType(
  BaseUpdateInput,
  PartialType(OmitType(Project, ['positionIndex'])),
  InputType
) {}

@InputType()
export class UpdateSkillInput extends IntersectionType(
  BaseUpdateInput,
  PartialType(Skill),
  InputType
) {}

@InputType()
export class UpdateCvInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => UpdateAboutMeInput, { nullable: true })
  aboutMe?: UpdateAboutMeInput;

  @Field(() => UpdateContactInfoInput, { nullable: true })
  contactInfoEntries?: UpdateContactInfoInput[];

  @Field(() => [UpdateEducationInput], { nullable: true })
  educationEntries?: UpdateEducationInput[];

  @Field(() => [UpdateWorkExperienceInput], { nullable: true })
  workExperienceEntries?: UpdateWorkExperienceInput[];

  @Field(() => [UpdateProjectInput], { nullable: true })
  projectEntries?: UpdateProjectInput[];

  @Field(() => [UpdateSkillInput], { nullable: true })
  skillEntries?: UpdateSkillInput[];
}
