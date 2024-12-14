import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Document, Types } from 'mongoose';

@ObjectType()
@Schema()
export class Project {
  @Field(() => ID)
  @Prop({ type: String, default: () => new Types.ObjectId().toString() })
  _id!: string;

  @Field(() => String)
  @Prop({ required: true })
  name!: string;

  @Field(() => String, { nullable: true })
  @Prop({ required: true })
  description?: string;

  @Field(() => [String], { nullable: true })
  @Prop([String])
  skills?: string[];

  @Field(() => Int)
  @Prop({ required: true })
  positionIndex!: number;
}

export type ProjectDocument = Project & Document;
export const ProjectSchema = SchemaFactory.createForClass(Project);
