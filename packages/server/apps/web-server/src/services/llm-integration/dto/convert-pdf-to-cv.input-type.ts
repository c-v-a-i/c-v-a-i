import { ArgsType, Field } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import { Exclude } from 'class-transformer';

@ArgsType()
export class ConvertPdfInput {
  @Exclude()
  @Field(() => GraphQLUpload)
  readonly file!: Promise<FileUpload>;
}
