import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';
import { FileUploader } from './FileUploader';

interface ImportPdfDialogProps {
  open: boolean;
  onClose: () => void;
}

export const ImportPdfDialog: React.FC<ImportPdfDialogProps> = ({
  open,
  onClose,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // const [importPdfCv] = useMutation(ImportPdfCvDocument, {
  //   refetchQueries: [{ query: GetCvsDocument }],
  //   onCompleted: (data) => {
  //     if (data.importPdfCv.success) {
  //       showToast('CV uploaded successfully!', 'success');
  //     } else {
  //       showToast(data.importPdfCv.message || 'Failed to upload CV', 'error');
  //     }
  //   },
  //   onError: (error) => showToast(`Error: ${error.message}`, 'error'),
  // });

  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
  };

  const handleConvert = async () => {
    if (!file) return;

    setUploading(true);
    try {
      const pdfBase64 = await fileToBase64(file);
      // await importPdfCv({
      //   variables: { input: { pdf: pdfBase64 } },
      // });
      alert('PDF uploaded successfully!');
      setFile(null); // Reset file after upload
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Import PDF CV</DialogTitle>
      <DialogContent>
        <FileUploader onFileUpload={handleFileUpload} />
        {uploading && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Uploading... You can close the dialog now. You’ll see a new CV in
            the list on the left side.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={uploading}>
          Cancel
        </Button>
        <Button
          onClick={handleConvert}
          variant="contained"
          disabled={!file || uploading}
          startIcon={uploading ? <CircularProgress size={20} /> : null}
        >
          Convert
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = (error) => reject(error);
  });
};
