import type { PaginationArgs } from '@server/common/dto';
import type { FindOptionsWhere } from 'typeorm';
import type { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import type { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

export interface ObjectLiteralWithMetadata {
  id: string;
  version?: number;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface FindOneArgs<Entity extends ObjectLiteralWithMetadata> {
  id?: string;
  pagination?: PaginationArgs;
  relations?: FindOptionsRelations<Entity>;
  searchParams?: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[];
  withDeleted?: boolean;
  select?: FindOptionsSelect<Entity>;
}
