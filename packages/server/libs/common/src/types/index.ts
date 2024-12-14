export type Values<T extends object> = T[keyof T];

export type ConvertOrTypeToAndType<T> = // eslint-disable-next-line
(T extends any ? (x: T) => void : never) extends (x: infer R) => void
  ? R
  : never;

export type Diff<T, U> = T extends U ? never : T;

export type AreTypesEqual<T, U> = T extends U ? true : Diff<T, U>;

export type MapValues<T> =
  T extends Map<string, infer ValueType> ? ValueType : never;
