export function widthToPerc(fraction: number): `${number}%` {
  if (fraction > 1) {
    throw Error(widthToPerc.name);
  }
  return `${fraction * 100}%`;
}
