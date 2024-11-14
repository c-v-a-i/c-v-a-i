import type { ObjectLiteralWithMetadata } from './find-one-args.interface';
import type { FindOptionsWhere } from 'typeorm';

export interface RemoveOneArgs<Entity extends ObjectLiteralWithMetadata> {
  id: string;
  searchParams?: FindOptionsWhere<Entity>;
}
