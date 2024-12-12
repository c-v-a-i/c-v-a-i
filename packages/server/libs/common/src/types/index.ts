export type Values<T extends object> = T[keyof T];

// eslint-disable-next-line
export type ConvertOrTypeToAndType<T> = (T extends any ? (x: T) => void : never) extends (x: infer R) => void
  ? R
  : never;

export type Diff<T, U> = T extends U ? never : T;

export type AreTypesEqual<T, U> = T extends U ? true : Diff<T, U>;
