import React, { useCallback, useEffect, useMemo } from 'react';
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';
import {
  useGetCvsQuery,
  useDeleteCvMutation,
  refetchGetCvsQuery,
} from '../../generated/graphql';
import { useCurrentCv } from '../../contexts';
import { CvList } from './CvList';

export const CvMenuList = () => {
  const {
    data: cvQueryData,
    loading: cvQueryLoading,
    error: cvsQueryError,
  } = useGetCvsQuery();

  const [deleteCv] = useDeleteCvMutation({
    refetchQueries: [refetchGetCvsQuery()],
  });
  const { setCurrentCvId } = useCurrentCv();

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedItemId, setSelectedItemId] = React.useState<string | null>(
    null
  );

  const memoizedItems = useMemo(
    () => (cvQueryLoading ? [] : (cvQueryData?.getCvs ?? [])),
    [cvQueryData, cvQueryLoading]
  );

  useEffect(() => {
    setCurrentCvId((currentCvId) =>
      !memoizedItems.length ||
      memoizedItems.find((it) => it._id === currentCvId)
        ? currentCvId
        : null
    );
  }, [setCurrentCvId, memoizedItems]);

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
      variables: { cvId: selectedItemId },
    });
    cleanupDeleteDialog();
  }, [deleteCv, selectedItemId, cleanupDeleteDialog]);

  const handleDuplicateCv = useCallback((templateId: string) => {
    void templateId;
    alert('TODO: duplicate CV');
  }, []);

  if (cvsQueryError) {
    return <div>cv menu list error</div>;
  }

  if (cvQueryLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <CvList
        items={memoizedItems}
        onDeleteItem={(id) => toggleDeleteDialog(id)}
        onDuplicateItem={handleDuplicateCv}
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
