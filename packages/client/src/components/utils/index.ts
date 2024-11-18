export function toPerc(fraction: number): `${number}%` {
  if (fraction > 1) {
    throw Error(toPerc.name);
  }
  return `${fraction * 100}%`;
}
