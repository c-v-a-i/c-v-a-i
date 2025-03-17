import { Box, Typography } from '@mui/material';
import type { FieldChange } from './types';

type FieldChangeDisplayProps = {
  field: FieldChange;
};

export const FieldChangeDisplay = ({ field }: FieldChangeDisplayProps) => {
  const renderContent = () => {
    switch (field.action) {
      case 'added':
        return (
          <Box
            sx={{ pl: 2, borderLeft: '2px solid', borderColor: 'success.main' }}
          >
            <Typography sx={{ color: 'success.main' }}>
              {field.newValue ?? '(empty)'}
            </Typography>
          </Box>
        );
      case 'removed':
        return (
          <Box
            sx={{ pl: 2, borderLeft: '2px solid', borderColor: 'error.main' }}
          >
            <Typography
              sx={{ color: 'error.main', textDecoration: 'line-through' }}
            >
              {field.oldValue ?? '(empty)'}
            </Typography>
          </Box>
        );
      case 'changed':
        return (
          <Box
            sx={{ pl: 2, borderLeft: '2px solid', borderColor: 'warning.main' }}
          >
            <Typography
              sx={{ color: 'text.secondary', textDecoration: 'line-through' }}
            >
              {field.oldValue ?? '(empty)'}
            </Typography>
            <Typography sx={{ color: 'warning.dark' }}>
              {field.newValue ?? '(empty)'}
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Box sx={{ mb: 1 }}>
      <Typography variant="subtitle2">{field.label}</Typography>
      {renderContent()}
    </Box>
  );
};
