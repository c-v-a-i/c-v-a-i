import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

type DeleteConfirmationDialogProps = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> =
  React.memo(({ open, onConfirm, onCancel }) => {
    return (
      <Dialog open={open} onClose={onCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={onConfirm} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  });
