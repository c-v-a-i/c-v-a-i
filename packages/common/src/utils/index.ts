export const entries = <T extends object>(obj: T): [keyof T, T[keyof T]][] =>
  (obj ? Object.entries(obj) : []) as [keyof T, T[keyof T]][];
