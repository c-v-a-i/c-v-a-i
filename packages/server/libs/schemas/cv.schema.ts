import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { AboutMe } from './about-me.schema';
import { Education } from './education.schema';
import { ContactInfo } from './contact-info.schema';
import { WorkExperience } from './work-experience.schema';
import { Skill } from './skill.schema';
import { Project } from './project.schema';

export class CvData {
  title!: string;
  aboutMe?: AboutMe;
  educationEntries!: Record<string, Education>;
  workExperienceEntries!: Record<string, WorkExperience>;
  projectEntries!: Record<string, Project>;
  skillEntries!: Record<string, Skill>;
  contactInfoEntries!: Record<string, ContactInfo>;
}

export class CvVersion {
  _id!: string;
  data!: CvData;
  versionNumber!: number;
  createdAt!: Date;
}

@Schema({ timestamps: true })
export class Cv {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  _id!: Types.ObjectId;

  @Prop({ required: true })
  userId!: string;

  @Prop({ required: true })
  currentVersionId!: string; // Just the string ID, references internal versions array

  @Prop({ type: Number, required: true, default: 0 })
  versionCursor!: number;

  @Prop({ type: [Object], required: true })
  versions!: Array<CvVersion>;

  createdAt?: Date;
  updatedAt?: Date;
}

export type CvDocument = Cv & Document;
export const CvSchema = SchemaFactory.createForClass(Cv);
