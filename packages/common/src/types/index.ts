export type Optional<T> = T | undefined | null;

export type Values<T extends object> = T[keyof T];

// eslint-disable-next-line
export type ConvertOrTypeToAndType<T> = (
  T extends any ? (x: T) => void : never
) extends (x: infer R) => void
  ? R
  : never;
