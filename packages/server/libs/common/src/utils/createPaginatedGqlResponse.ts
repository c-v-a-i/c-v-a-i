import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';

export function createPaginatedGqlResponse<T>(
  classRef: Type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [classRef])
    public items!: T[];

    @Field(() => Int)
    public count!: number;
  }

  return PaginatedType;
}
