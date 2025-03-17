import { Types } from 'mongoose';
import values from 'lodash/values';

/**
 * Generates a unique `_id` string.
 */
const generateId = (): string => new Types.ObjectId().toString();

/**
 * Converts an array of entries into a PJO, automatically assigning unique `_id`s.
 * @param entries Array of entry objects
 * @returns An object with `_id` as keys and entry objects with `_id` included as values
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const arrayToMap = <T extends Record<string, any>>(
  entries: T[]
): Record<string, T & { _id: string; positionIndex: number }> => {
  return Object.fromEntries(
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

export const mapToArray = <T>(
  map: Map<string, T> | Record<string, T> | undefined
): T[] =>
  map ? Array.from(map instanceof Map ? map.values() : values(map)) : [];
