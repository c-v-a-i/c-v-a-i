import type { z } from 'zod';

export type OmitId<T> = Omit<T, '_id'>;
export type WithAutoId<T> = T & { _id: string };

export type ZodArray<T extends z.ZodTypeAny> = Array<z.infer<T>>;
