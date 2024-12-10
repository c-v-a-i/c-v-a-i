import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

@Schema()
export class AboutMe {
  @Prop({ type: String, default: () => new Types.ObjectId().toString() })
  _id!: string;

  @Prop({ required: true })
  fieldName!: string;

  @Prop({ required: true })
  description!: string;
}

@Schema()
export class ContactInfo {
  @Prop({ type: String, default: () => new Types.ObjectId().toString() })
  _id!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  email!: string;

  @Prop({ required: true })
  phone!: string;
}

@Schema()
export class Education {
  @Prop({ type: String, default: () => new Types.ObjectId().toString() })
  _id!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  degree!: string;

  @Prop()
  duration?: string;

  @Prop()
  location?: string;

  @Prop()
  type?: string;

  @Prop()
  description?: string;

  @Prop([String])
  skills?: string[];

  @Prop({ required: true })
  positionIndex!: number;
}

@Schema()
export class WorkExperience {
  _id!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  position!: string;

  @Prop()
  duration?: string;

  @Prop()
  location?: string;

  @Prop()
  type?: string;

  @Prop()
  description?: string;

  @Prop([String])
  skills?: string[];

  @Prop({ required: true })
  positionIndex!: number;
}

@Schema()
export class Project {
  @Prop({ type: String, default: () => new Types.ObjectId().toString() })
  _id!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  description!: string;

  @Prop([String])
  skills!: string[];

  @Prop({ required: true })
  positionIndex!: number;
}

@Schema()
export class Skill {
  @Prop({ type: String, default: () => new Types.ObjectId().toString() })
  _id!: string;

  @Prop({ required: true })
  category!: string;

  @Prop([String])
  items!: string[];

  @Prop({ required: true })
  positionIndex!: number;
}

@Schema({ timestamps: true })
export class Cv extends Document {
  @Prop({ type: String, default: () => new Types.ObjectId().toString() })
  _id!: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  userId!: string;

  @Prop()
  aboutMe?: AboutMe;

  @Prop()
  contactInfo?: ContactInfo;

  @Prop({ type: Map, of: SchemaFactory.createForClass(Education) })
  educationEntries?: Map<string, Education>;

  @Prop({ type: Map, of: SchemaFactory.createForClass(WorkExperience) })
  workExperienceEntries?: Map<string, WorkExperience>;

  @Prop({ type: Map, of: SchemaFactory.createForClass(Project) })
  projectEntries?: Map<string, Project>;

  @Prop({ type: Map, of: SchemaFactory.createForClass(Skill) })
  skillEntries?: Map<string, Skill>;
}

export const CvSchema = SchemaFactory.createForClass(Cv);
