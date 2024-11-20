import { CV } from '@server/entities';
import { createPaginatedGqlResponse } from '@server/common/utils';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginatedCvObjectType extends createPaginatedGqlResponse(CV) {}
