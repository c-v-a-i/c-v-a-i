import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Document, Types } from 'mongoose';

@ObjectType()
@Schema()
export class AboutMe {
  @Field(() => ID)
  @Prop({ type: String, default: () => new Types.ObjectId().toString() })
  _id!: string;

  @Field(() => String)
  @Prop({ required: true })
  name!: string;

  @Field(() => String)
  @Prop({ required: true })
  fieldName!: string;

  @Field(() => String)
  @Prop({ required: true })
  description!: string;
}

export type AboutMeDocument = AboutMe & Document;
export const AboutMeSchema = SchemaFactory.createForClass(AboutMe);
