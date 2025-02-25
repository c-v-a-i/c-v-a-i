import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { FileUploader } from '../FileUploader';
import { toast } from 'react-toastify';
import {
  refetchGetCvsQuery,
  useConvertPdfToCvMutation,
} from '../../generated/graphql';

interface ImportPdfDialogProps {
  open: boolean;
  onClose: () => void;
}

export const ImportPdfDialog = ({ open, onClose }: ImportPdfDialogProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [convertPdfToCv, { loading }] = useConvertPdfToCvMutation({
    refetchQueries: [refetchGetCvsQuery()],
    context: {
      hasUpload: true,
    },
  });

  const handleFileUploaded = (uploadedFile: File) => {
    setFile(uploadedFile);
  };

  const handleConvert = async () => {
    if (!file) return;

    await convertPdfToCv({
      variables: { file },
    })
      .then(({ data }) => {
        const comment = data?.convertPdfToCv.comment;
        console.log(comment);
        if (comment) {
          toast.success(comment);
        }
      })
      .catch()
      .finally(() => {});

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Import PDF CV</DialogTitle>
      <DialogContent>
        <FileUploader
          onFileUploaded={handleFileUploaded}
          acceptedFileTypes="application/pdf"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleConvert}
          disabled={!file || loading}
        >
          {loading ? 'Converting...' : 'Convert'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
