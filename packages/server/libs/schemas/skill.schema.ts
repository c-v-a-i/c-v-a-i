import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Document, Types } from 'mongoose';

@ObjectType()
@Schema()
export class Skill {
  @Field(() => ID)
  @Prop({ type: String, default: () => new Types.ObjectId().toString() })
  _id!: string;

  @Field(() => String)
  @Prop({ required: true })
  category!: string;

  @Field(() => [String])
  @Prop([String])
  skills!: string[];

  @Field(() => Int)
  @Prop({ required: true })
  positionIndex!: number;
}

export type SkillDocument = Skill & Document;
export const SkillSchema = SchemaFactory.createForClass(Skill);
