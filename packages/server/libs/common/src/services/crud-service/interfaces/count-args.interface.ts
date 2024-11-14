import type { FindAllArgs } from './find-all-args.interface';
import type { ObjectLiteralWithMetadata } from './find-one-args.interface';

export type CountArgs<Entity extends ObjectLiteralWithMetadata> = Pick<
  FindAllArgs<Entity>,
  'searchParams' | 'withDeleted'
>;
