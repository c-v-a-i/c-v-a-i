import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

@ObjectType()
class PaginationMetadataObjectType {
  @Field(() => Int)
  public totalItems!: number;

  @Field(() => Int)
  public currentPage!: number;

  @Field(() => Int)
  public pageSize!: number;

  @Field(() => Int)
  public totalPages!: number;
}

export function createPaginatedObjectType<T>(classRef: Type<T>) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [classRef])
    public items!: T[];

    @Field(() => PaginationMetadataObjectType)
    public paginationMetadata!: PaginationMetadataObjectType;
  }

  return PaginatedType;
}
