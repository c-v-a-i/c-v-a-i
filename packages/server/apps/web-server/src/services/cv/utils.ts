import { Types } from 'mongoose';
import values from 'lodash/values';
import type { Operation } from 'fast-json-patch';
import type { JsonPatchOperation } from './dto/cv-version-diff.object-type';
import { match } from 'ts-pattern';
import { JsonDiffOperationType } from '../../common/enums';

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

export const createJsonPathOperation = (
  operations: Operation[]
): JsonPatchOperation[] => {
  return operations.flatMap(({ op: opName, path, ...rest }) => {
    return match(opName)
      .returnType<[JsonPatchOperation] | []>()
      .with('_get', () => [])
      .with('test', () => [])
      .with('add', () => [
        {
          op: JsonDiffOperationType.ADD,
          path,
          value: rest['value'],
        },
      ])
      .with('remove', () => [
        {
          op: JsonDiffOperationType.REMOVE,
          path,
        },
      ])
      .with('replace', () => [
        {
          op: JsonDiffOperationType.REPLACE,
          path,
          value: rest['value'],
        },
      ])
      .with('move', () => [
        {
          op: JsonDiffOperationType.MOVE,
          path,
          from: rest['from'],
        },
      ])
      .with('copy', () => [
        {
          op: JsonDiffOperationType.COPY,
          path,
          from: rest['from'],
        },
      ])
      .exhaustive();
  });
};
