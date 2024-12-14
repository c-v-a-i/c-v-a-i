import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Document, Types } from 'mongoose';

@ObjectType()
@Schema()
export class Education {
  @Field(() => ID)
  @Prop({ type: String, default: () => new Types.ObjectId().toString() })
  _id!: string;

  @Field(() => String)
  @Prop({ required: true })
  name!: string;

  @Field(() => String)
  @Prop({ required: true })
  degree!: string;

  @Field(() => String, { nullable: true })
  @Prop()
  duration?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  location?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  type?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  description?: string;

  @Field(() => [String], { nullable: true })
  @Prop([String])
  skills?: string[];

  @Field(() => Int)
  @Prop({ required: true })
  positionIndex!: number;
}

export type EducationDocument = Education & Document;
export const EducationSchema = SchemaFactory.createForClass(Education);
