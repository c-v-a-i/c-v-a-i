import React from 'react';
import { Box } from '@mui/material';
import type { EducationInformationBlockProps } from './types';
import { EditableTypography } from '../../../../atoms';

export const DateAndLocationDetails: React.FC<
  EducationInformationBlockProps
> = ({ ed, isEditing, updateField }) => {
  return (
    <Box display={'flex'} gap={2} justifyContent={'end'} textAlign="right">
      {ed.location && (
        <EditableTypography
          id={`education-location-${ed.location}`}
          value={ed.location}
          onSave={(value) =>
            updateField({
              _id: ed._id,
              fieldName: 'location',
              value,
            })
          }
          variant="body2"
          isEditing={isEditing}
          sx={{
            width: '100%',
          }}
        />
      )}
      {ed.duration && (
        <EditableTypography
          id={`education-duration-${ed.duration}`}
          value={ed.duration}
          onSave={(value) =>
            updateField({
              _id: ed._id,
              fieldName: 'duration',
              value,
            })
          }
          variant="body2"
          isEditing={isEditing}
          sx={{
            width: '100%',
          }}
        />
      )}
    </Box>
  );
};
