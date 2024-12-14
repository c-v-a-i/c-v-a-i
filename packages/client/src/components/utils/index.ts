import sortBy from 'lodash/sortBy';

export function widthToPerc(fraction: number): `${number}%` {
  if (fraction > 1) {
    throw Error(widthToPerc.name);
  }
  return `${fraction * 100}%`;
}

export const sortByPosition = <T extends { positionIndex: number }>(
  arr: Array<T>
) => sortBy(arr, 'positionIndex');
