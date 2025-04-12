import React, { useCallback, useMemo, useState } from 'react';
import { PopupMenu } from '../atoms';
import { useCurrentCv, useCvCreationFlow, useDialog } from '../../contexts';
import { BaseList, ListContainer, StandardListItem } from '../atoms/List';
import { useUpdateCvMutation } from '../../generated/graphql';
import { RenameDialog } from '../RenameDialog';

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

    // State for rename dialog
    const [renameDialogOpen, setRenameDialogOpen] = useState(false);
    const [cvToRename, setCvToRename] = useState<ListItem | null>(null);

    const [updateCv] = useUpdateCvMutation();

    const handleRename = useCallback(
      (cvId: string) => {
        const cvItem = items.find((item) => item._id === cvId);
        if (cvItem) {
          setCvToRename(cvItem);
          setRenameDialogOpen(true);
        }
      },
      [items]
    );

    const handleRenameSubmit = useCallback(
      (newName: string) => {
        if (cvToRename) {
          updateCv({
            variables: {
              cvId: cvToRename._id,
              data: {
                title: newName,
              },
            },
          });
        }
      },
      [cvToRename, updateCv]
    );

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
        {
          label: 'Rename',
          action: handleRename,
        },
        { label: 'Delete', action: onDeleteItem },
        { label: 'Duplicate', action: onDuplicateItem },
      ],
      [onDeleteItem, onDuplicateItem, setTemplateId, openDialog, handleRename]
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
      <>
        <ListContainer>
          <BaseList
            items={items}
            renderItem={renderCvItem}
            emptyMessage="No CVs available. Create your first CV!"
          />
        </ListContainer>

        {cvToRename && (
          <RenameDialog
            open={renameDialogOpen}
            onClose={() => {
              setRenameDialogOpen(false);
              setCvToRename(null);
            }}
            initialName={cvToRename.name}
            onRename={handleRenameSubmit}
          />
        )}
      </>
    );
  }
);
