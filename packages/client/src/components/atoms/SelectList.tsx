import { useCallback, useState } from 'react';
import type { SelectChangeEvent } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

type SelectListItem = {
  id: string;
  label: string;
};

type SelectListProps<T extends SelectListItem> = {
  label: string;
  onSelect?: (itemId: string) => void;
  items: T[];
  defaultState?: string;
};

export const SelectList = <T extends SelectListItem>({
  label,
  defaultState,
  onSelect,
  items,
}: SelectListProps<T>) => {
  const [value, setValue] = useState<string>(defaultState ?? '');

  const onChange = useCallback(
    ({ target: { value } }: SelectChangeEvent) => {
      if (!value) {
        return;
      }
      setValue(value);
      onSelect?.(value);
    },
    [onSelect]
  );

  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Select<string>
        onChange={onChange}
        label={label}
        variant={'outlined'}
        autoFocus
        value={value}
      >
        {items.map(({ id, label }) => (
          <MenuItem value={id} key={id}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
