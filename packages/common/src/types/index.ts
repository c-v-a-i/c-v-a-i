export type Optional<T> = T | undefined | null;

export type Values<T extends object> = T[keyof T];
