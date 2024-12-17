import React from 'react';
import { Box } from '@mui/material';
import { EditableTypography } from '../../../../atoms';
import type { EducationInformationBlockProps } from './types';

export const GeneralEducationInformation: React.FC<
  EducationInformationBlockProps
> = ({ ed, isEditing, updateField }) => {
  return (
    <Box display={'flex'} flexDirection={'column'}>
      <EditableTypography
        id={`education-name-${ed._id}`}
        value={ed.name}
        onSave={(value) =>
          updateField({
            _id: ed._id,
            fieldName: 'name',
            value,
          })
        }
        variant="h6"
        isEditing={isEditing}
        sx={{
          width: '100%',
        }}
      />
      <EditableTypography
        id={`education-degree-${ed._id}`}
        value={ed.degree || ''}
        onSave={(value) =>
          updateField({
            _id: ed._id,
            fieldName: 'degree',
            value,
          })
        }
        variant="body2"
        isEditing={isEditing}
        sx={{
          width: '100%',
        }}
      />
    </Box>
  );
};
