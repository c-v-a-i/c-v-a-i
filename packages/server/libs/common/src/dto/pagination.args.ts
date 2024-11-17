import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';

@ArgsType()
export class PaginationArgs {
  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  public limit?: number;

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  public offset?: number;
}
