import { Types } from 'mongoose';

/**
 * Generates a unique `_id` string.
 */
const generateId = (): string => new Types.ObjectId().toString();

/**
 * Converts an array of entries into a Map, automatically assigning unique `_id`s.
 * @param entries Array of entry objects
 * @returns A Map with `_id` as keys and entry objects with `_id` included as values
 */
export const arrayToMap = <T extends Record<string, any>>(entries: T[]): Map<string, T & { _id: string, positionIndex: number }> => {
  return new Map(
    entries.map((entry, idx) => {
      const id = generateId();
      return [
        id,
        {
          _id: id,
          positionIndex: idx,
          ...entry,
        },
      ];
    })
  );
};
