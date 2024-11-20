import React, { useCallback, useMemo } from 'react';
import { MenuList } from '../atoms';
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';
import { useGetCvsQuery, useDeleteCvMutation, refetchGetCvsQuery } from '../../generated/graphql';

export const CvMenuList = () => {
  const { data: cvQueryData, loading: cvQueryLoading, error: cvsQueryError } = useGetCvsQuery();
  const [deleteCv] = useDeleteCvMutation({
    refetchQueries: [refetchGetCvsQuery()],
  });

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedItemId, setSelectedItemId] = React.useState<string | null>(null);

  const memoizedItems = useMemo(
    () => (cvQueryLoading || !cvQueryData?.getCvs?.items ? [] : cvQueryData.getCvs.items),
    [cvQueryData, cvQueryLoading]
  );

  const toggleDeleteDialog = useCallback((id: string) => {
    setSelectedItemId(id);
    setDeleteDialogOpen(true);
  }, []);

  const cleanupDeleteDialog = useCallback(() => {
    setDeleteDialogOpen(false);
    setSelectedItemId(null);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (!selectedItemId) return;

    void deleteCv({
      variables: { id: selectedItemId },
    });
    cleanupDeleteDialog();
  }, [deleteCv, selectedItemId, cleanupDeleteDialog]);

  if (cvsQueryError) {
    console.log('error: ', cvsQueryError);
    return <div>cv menu list error</div>;
  }

  if (cvQueryLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <MenuList
        items={memoizedItems}
        onDeleteItem={(id) => toggleDeleteDialog(id)}
        // onAddNewItem={handleGenerateNewCv}
      />
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onConfirm={handleConfirmDelete}
        onCancel={cleanupDeleteDialog}
      />
    </>
  );
};
