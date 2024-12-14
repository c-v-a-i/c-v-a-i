import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { AboutMeDocument, AboutMeSchema } from './about-me.schema';
import { ContactInfoDocument, ContactInfoSchema } from './contact-info.schema';
import { EducationDocument, EducationSchema } from './education.schema';
import {
  WorkExperienceDocument,
  WorkExperienceSchema,
} from './work-experience.schema';
import { ProjectDocument, ProjectSchema } from './project.schema';
import { SkillDocument, SkillSchema } from './skill.schema';

@Schema({ timestamps: true })
export class Cv {
  @Prop({ type: String, default: () => new Types.ObjectId().toString() })
  _id!: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  userId!: string;

  @Prop({ type: AboutMeSchema })
  aboutMe?: AboutMeDocument;

  @Prop({ type: ContactInfoSchema })
  contactInfo?: ContactInfoDocument;

  @Prop({ type: Map, of: EducationSchema })
  educationEntries!: Map<string, EducationDocument>;

  @Prop({ type: Map, of: WorkExperienceSchema })
  workExperienceEntries!: Map<string, WorkExperienceDocument>;

  @Prop({ type: Map, of: ProjectSchema })
  projectEntries!: Map<string, ProjectDocument>;

  @Prop({ type: Map, of: SkillSchema })
  skillEntries!: Map<string, SkillDocument>;
}

export type CvDocument = Cv & Document;
export const CvSchema = SchemaFactory.createForClass(Cv);
