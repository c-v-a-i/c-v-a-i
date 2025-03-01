import { ArgsType, Field } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import { Exclude } from 'class-transformer';

@ArgsType()
export class ConvertPdfInputType {
  @Exclude()
  @Field(() => GraphQLUpload)
  readonly file!: Promise<FileUpload>;
}
