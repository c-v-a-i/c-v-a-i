import React, { useCallback, useMemo } from 'react';
import { PopupMenu } from '../atoms';
import { useCurrentCv, useCvCreationFlow, useDialog } from '../../contexts';
import { BaseList, ListContainer, StandardListItem } from '../atoms/List';

export type ListItem = {
  _id: string;
  name: string;
};

type MenuListProps = {
  items: ListItem[];
  onDeleteItem: (itemId: string) => void;
  onDuplicateItem: (itemId: string) => void;
};

export const CvList = React.memo(
  ({ items, onDeleteItem, onDuplicateItem }: MenuListProps) => {
    const { setCurrentCvId, currentCvId } = useCurrentCv();
    const { open: openDialog } = useDialog();
    const { setTemplateId } = useCvCreationFlow();

    const handleSelectCv = useCallback(
      (id: string) => {
        setCurrentCvId(id);
      },
      [setCurrentCvId]
    );

    const menuOptions = useMemo(
      () => [
        {
          label: 'Use as template',
          action: (id: string) => {
            setTemplateId(id);
            openDialog();
          },
        },
        { label: 'Delete', action: onDeleteItem },
        { label: 'Duplicate', action: onDuplicateItem },
      ],
      [onDeleteItem, onDuplicateItem, setTemplateId, openDialog]
    );

    const renderCvItem = useCallback(
      (item: ListItem) => (
        <StandardListItem
          _id={item._id}
          key={item._id}
          item={item}
          primary={item.name}
          onClick={handleSelectCv}
          actions={<PopupMenu id={item._id} options={[...menuOptions]} />}
          highlight={currentCvId === item._id}
        />
      ),
      [currentCvId, handleSelectCv, menuOptions]
    );

    return (
      <ListContainer>
        <BaseList
          items={items}
          renderItem={renderCvItem}
          emptyMessage="No CVs available. Create your first CV!"
        />
      </ListContainer>
    );
  }
);
