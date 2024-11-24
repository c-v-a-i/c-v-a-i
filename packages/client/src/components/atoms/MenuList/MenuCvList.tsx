import React, { useCallback } from 'react';
import { List } from '@mui/material';
import { MenuItem } from './MenuItem';
import type { ListItem } from './types';
import { useCurrentCv } from '../../../contexts/use-current-cv';
import { refetchGetCvsQuery, useCreateCvMutation } from '../../../generated/graphql';

type MenuListProps = {
  items: ListItem[];
  onDeleteItem: (itemId: string) => void;
};

export const MenuCvList = React.memo(({ items, onDeleteItem }: MenuListProps) => {
  const { setCurrentCvId } = useCurrentCv();
  const [createNewCv] = useCreateCvMutation({
    refetchQueries: [refetchGetCvsQuery()],
  });

  const handleSelectCv = useCallback(
    (id: string) => {
      setCurrentCvId(id);
    },
    [setCurrentCvId]
  );
  const onDelete = (id: string) => onDeleteItem(id);
  const onCreateFromThis = (id: string) =>
    createNewCv({
      variables: { templateId: id },
    });

  return (
    <List>
      {items.map((item) => (
        <MenuItem
          key={item.id}
          item={item}
          onSelect={handleSelectCv}
          menuOptions={[
            { label: 'Use as template', action: onCreateFromThis },
            { label: 'Delete', action: onDelete },
          ]}
        />
      ))}
    </List>
  );
});
