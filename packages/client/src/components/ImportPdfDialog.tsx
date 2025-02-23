import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { FileUploader } from './FileUploader';

interface ImportPdfDialogProps {
  open: boolean;
  onClose: () => void;
}

export const ImportPdfDialog = ({ open, onClose }: ImportPdfDialogProps) => {
  const [file, setFile] = useState<File | null>(null);
  // const [importPdfCv, { loading }] = useImportPdfCvMutation();
  const [loading, setLoading] = useState(false);

  const handleFileUploaded = (uploadedFile: File) => {
    setFile(uploadedFile);
  };

  const handleConvert = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Data = (reader.result as string).split(',')[1];
      try {
        // await importPdfCv({
        //   variables: { input: { pdfBase64: base64Data } },
        //   refetchQueries: [refetchGetCvsQuery()],
        // });
        // Show success toast
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 5000));
      } catch (error) {
        // Show error toast
      } finally {
        onClose();
      }
    };
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
