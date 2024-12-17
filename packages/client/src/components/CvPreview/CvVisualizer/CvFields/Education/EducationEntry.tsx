import React from 'react';
import { Box, Typography } from '@mui/material';
import { EditableTypography, RemoveEntryButton } from '../../../../atoms';
import { grey } from '@mui/material/colors';
import { GeneralEducationInformation } from './GeneralEducationInformation';
import type { CvEntryItemProps } from '../../types';

export const EducationEntry = ({
  entry: ed,
  updateField,
  isEditing,
  removeEntry,
}: CvEntryItemProps<'educationEntries'>) => {
  return (
    <Box display={'flex'} flexDirection={'row'} gap={1}>
      <RemoveEntryButton onClick={removeEntry} />

      <Box
        display={'flex'}
        flexDirection={'column'}
        textAlign={'right'}
        flex={1}
      >
        <GeneralEducationInformation
          ed={ed}
          isEditing={isEditing}
          updateField={updateField}
        />

        {ed.description && (
          <EditableTypography
            id={`education-description-${ed._id}`}
            value={ed.description}
            onSave={(value) =>
              updateField({
                _id: ed._id,
                fieldName: 'description',
                value,
              })
            }
            multiline
            sx={{
              width: '100%',
              textAlign: 'right',
            }}
            isEditing={isEditing}
          />
        )}
        {ed.skills && ed.skills.length > 0 && (
          <Typography variant="body2" color={grey[600]}>
            Skills: {ed.skills.join(', ')}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
