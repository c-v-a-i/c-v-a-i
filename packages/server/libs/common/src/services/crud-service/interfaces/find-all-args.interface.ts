import type { PaginationArgs } from '../../../dto';
import type { FindOneArgs, ObjectLiteralWithMetadata } from './find-one-args.interface';
import type { FindOneOptions, FindOptionsWhere } from 'typeorm';

export interface FindAllArgs<Entity extends ObjectLiteralWithMetadata>
  extends Omit<FindOneArgs<Entity>, 'id' | 'searchParams'> {
  pagination?: PaginationArgs;
  searchParams?: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[];
  order?: FindOneOptions<Entity>['order'];
}
