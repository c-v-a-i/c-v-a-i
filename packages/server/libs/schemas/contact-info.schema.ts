import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Document, Types } from 'mongoose';

@ObjectType()
@Schema()
export class ContactInfo {
  @Field(() => ID)
  @Prop({ type: String, default: () => new Types.ObjectId().toString() })
  _id!: string;

  @Field(() => String)
  @Prop({ required: true })
  name!: string;

  @Field(() => String)
  @Prop({ required: true })
  email!: string;

  @Field(() => String)
  @Prop({ required: true })
  phone!: string;
}

export type ContactInfoDocument = ContactInfo & Document;
export const ContactInfoSchema = SchemaFactory.createForClass(ContactInfo);
