import { ObjectType, Field, ID } from '@nestjs/graphql';
import pick from 'lodash/pick';
import {
  AboutMe,
  ContactInfo,
  Cv,
  Education,
  Project,
  Skill,
  WorkExperience,
} from '../../../../../../libs/schemas';

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
}

// convert for getCv-like resolvers, all other fields are fetched on-demand
export function convertCvToObjectType(cv: Cv): CvObjectType {
  return pick(cv, ['_id', 'title', 'userId']);
}
