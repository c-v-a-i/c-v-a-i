import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { AboutMe } from './about-me.schema';
import { Education } from './education.schema';
import { ContactInfo } from './contact-info.schema';
import { WorkExperience } from './work-experience.schema';
import { Skill } from './skill.schema';
import { Project } from './project.schema';
import { Field, Int, ObjectType } from '@nestjs/graphql';

// TODO: is a record gonna be serialized correctly if used as ObjectType() ?
@ObjectType()
export class CvData {
  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  aboutMe?: AboutMe;

  // TODO: we need to annotate it as map or record for graphql
  educationEntries!: Record<string, Education>;
  workExperienceEntries!: Record<string, WorkExperience>;
  projectEntries!: Record<string, Project>;
  skillEntries!: Record<string, Skill>;
  contactInfoEntries!: Record<string, ContactInfo>;
}

@ObjectType()
export class CvVersion {
  @Field(() => String)
  _id!: string;

  @Field(() => String)
  data!: CvData;

  @Field(() => Int)
  versionNumber!: number;

  @Field(() => Date)
  createdAt!: Date;
  // diff?: SomeRfcJsonDiffFormat; // TODO: should we store diffs? if so, why? what's the use case?
}

@Schema({ timestamps: true })
// @ObjectType() // TODO: now, we use CvObjectType for that. But, it's not needed.
export class Cv {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  _id!: Types.ObjectId;

  @Prop({ required: true })
  userId!: string;

  @Prop({ required: true })
  currentVersionId!: string; // Just the string ID, references internal versions array

  @Prop({ type: [Object], required: true })
  versions!: Array<CvVersion>;

  createdAt?: Date;
  updatedAt?: Date;
}

export type CvDocument = Cv & Document;
export const CvSchema = SchemaFactory.createForClass(Cv);
