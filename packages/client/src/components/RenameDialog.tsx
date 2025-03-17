import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useState } from 'react';

type RenameDialogProps = {
  open: boolean;
  onClose: () => void;
  initialName: string;
  onRename: (newName: string) => void;
};

export const RenameDialog = ({
  open,
  onClose,
  initialName,
  onRename,
}: RenameDialogProps) => {
  const [name, setName] = useState(initialName);

  const handleSubmit = () => {
    if (name.trim()) {
      onRename(name);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Rename CV</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="CV Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={!name.trim() || name === initialName}
        >
          Rename
        </Button>
      </DialogActions>
    </Dialog>
  );
};
