import type { FindAllArgs } from './find-all-args.interface';
import type { ObjectLiteralWithMetadata } from './find-one-args.interface';

export interface FindAllByIdsArgs<Entity extends ObjectLiteralWithMetadata> extends FindAllArgs<Entity> {
  ids: string[];
}
