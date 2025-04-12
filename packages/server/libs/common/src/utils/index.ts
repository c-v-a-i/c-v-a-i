export * from './try-catch';

export const entries = <T extends object>(obj: T): [keyof T, T[keyof T]][] =>
  Object.entries(obj) as [keyof T, T[keyof T]][];

export const keys = <T extends object>(obj: T): (keyof T)[] =>
  Object.keys(obj) as (keyof T)[];
