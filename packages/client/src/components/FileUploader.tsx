import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Typography, Paper } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFileName(file.name);
      onFileUpload(file);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
  });

  const handlePaste = (event: React.ClipboardEvent) => {
    const items = event.clipboardData?.items;
    if (items) {
      for (const item of items) {
        if (item.type === 'application/pdf') {
          const file = item.getAsFile();
          if (file) {
            setFileName(file.name);
            onFileUpload(file);
          }
        }
      }
    }
  };

  return (
    <Paper
      {...getRootProps()}
      onPaste={handlePaste}
      elevation={2}
      sx={{
        p: 3,
        border: '2px dashed #ccc',
        borderRadius: 2,
        textAlign: 'center',
        cursor: 'pointer',
        bgcolor: isDragActive ? '#f5f5f5' : '#fff',
        transition: 'background-color 0.3s',
        '&:hover': { bgcolor: '#fafafa' },
      }}
    >
      <input {...getInputProps()} />
      <UploadFileIcon sx={{ fontSize: 40, color: '#888', mb: 1 }} />
      {fileName ? (
        <Typography variant="body1" color="text.primary">
          {fileName}
        </Typography>
      ) : (
        <>
          <Typography variant="body1" color="text.secondary">
            {isDragActive
              ? 'Drop your PDF here...'
              : 'Drag & drop a PDF, paste it, or click to select'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            (Only *.pdf files are accepted)
          </Typography>
        </>
      )}
    </Paper>
  );
};