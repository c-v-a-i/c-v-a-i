import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, styled } from '@mui/material';
import { UploadFile } from '@mui/icons-material';

const DropzoneContainer = styled(Box)<{ isDragActive: boolean }>(
  ({ theme, isDragActive }) => ({
    border: `2px dashed ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(4),
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: isDragActive ? theme.palette.action.hover : 'transparent',
    transition: 'background-color 0.2s ease',
  })
);

interface FileUploaderProps {
  onFileUploaded: (file: File) => void;
  acceptedFileTypes?: string;
  maxFiles?: number;
}

export const FileUploader = ({
  onFileUploaded,
  acceptedFileTypes = 'application/pdf',
  maxFiles = 1,
}: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const uploadedFile = acceptedFiles[0];
      setFile(uploadedFile);
      onFileUploaded(uploadedFile);
    },
    [onFileUploaded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes ? { [acceptedFileTypes]: [] } : undefined,
    maxFiles,
  });

  return (
    <DropzoneContainer {...getRootProps()} isDragActive={isDragActive}>
      <input {...getInputProps()} />
      <UploadFile fontSize="large" color="action" />
      <Typography variant="body1" mt={2}>
        {file ? file.name : 'Drag & drop file here, or click to select'}
      </Typography>
      <Typography variant="caption" color="textSecondary">
        Supported formats: PDF
      </Typography>
    </DropzoneContainer>
  );
};
