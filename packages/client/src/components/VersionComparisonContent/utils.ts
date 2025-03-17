import type {
  ChangeAction,
  FieldChange,
  ItemAction,
  SectionChange,
} from './types';

export const createFieldChange = (
  label: string,
  oldValue: string | null,
  newValue: string | null
): FieldChange => {
  const action: ChangeAction = !oldValue
    ? 'added'
    : !newValue
      ? 'removed'
      : 'changed';

  return { label, oldValue, newValue, action };
};

export const compareValues = <T>(
  label: string,
  oldValue: T | null | undefined,
  newValue: T | null | undefined
): FieldChange | null => {
  const strOldValue = oldValue?.toString() ?? null;
  const strNewValue = newValue?.toString() ?? null;

  if (strOldValue === strNewValue) return null;

  return createFieldChange(label, strOldValue, strNewValue);
};

export const compareArrays = (
  label: string,
  oldArray: string[] | null | undefined,
  newArray: string[] | null | undefined
): FieldChange | null => {
  const oldValue = oldArray?.join(', ') || null;
  const newValue = newArray?.join(', ') || null;

  if (oldValue === newValue) return null;

  return createFieldChange(label, oldValue, newValue);
};

export const getActionColor = (action: ItemAction | ChangeAction) => {
  const colorMap = {
    added: 'success',
    removed: 'error',
    changed: 'warning',
    modified: 'warning',
  } as const;

  return colorMap[action] || 'default';
};

// Generic function to compare array entries by _id
export const compareEntries = <T extends { _id: string }>(
  sectionName: string,
  leftEntries: T[] | null | undefined,
  rightEntries: T[] | null | undefined,
  getItemName: (item: T) => string,
  getItemFields: (left: T | null, right: T | null) => FieldChange[]
): SectionChange | null => {
  if (!leftEntries?.length && !rightEntries?.length) return null;

  const leftMap = new Map(
    (leftEntries ?? []).map((entry) => [entry._id, entry])
  );
  const rightMap = new Map(
    (rightEntries ?? []).map((entry) => [entry._id, entry])
  );

  const allIds = new Set([
    ...(leftEntries ?? []).map((e) => e._id),
    ...(rightEntries ?? []).map((e) => e._id),
  ]);

  const sectionItems = Array.from(allIds)
    .map((id) => {
      const leftEntry = leftMap.get(id) ?? null;
      const rightEntry = rightMap.get(id) ?? null;

      const action: ItemAction = !leftEntry
        ? 'added'
        : !rightEntry
          ? 'removed'
          : 'modified';

      const fields = getItemFields(leftEntry, rightEntry);

      if (fields.length === 0) return null;

      return {
        name: getItemName(leftEntry ?? rightEntry!),
        action,
        fields,
      };
    })
    .flatMap((x) => (x ? [x] : []));

  if (sectionItems.length === 0) return null;

  return {
    section: sectionName,
    items: sectionItems,
  };
};
