import React from 'react';
import { Box } from '@mui/material';
import { EditableTypography, RemoveEntryButton } from '../../../../atoms';
import type { CvEntryItemProps } from '../../types';

export const ContactInfoEntry = ({
  entry: contactInfo,
  updateField,
  isEditing,
  removeEntry,
}: CvEntryItemProps<'contactInfoEntries'>) => {
  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      // alignItems={'center'}
    >
      <RemoveEntryButton onClick={removeEntry} />

      <Box flex={1} display={'flex'} flexDirection={'column'}>
        <EditableTypography
          id={`contactInfo-category-${contactInfo._id}`}
          value={contactInfo.linkName}
          onSave={(value) =>
            updateField({
              _id: contactInfo._id,
              fieldName: 'linkName',
              value,
            })
          }
          variant="h6"
          sx={{
            width: '100%',
          }}
          isEditing={isEditing}
        />

        {/* TODO: make it actually a link */}
        <EditableTypography
          id={`contactInfo-category-${contactInfo._id}`}
          value={contactInfo.link}
          onSave={(value) =>
            updateField({
              _id: contactInfo._id,
              fieldName: 'link',
              value,
            })
          }
          variant="body1"
          sx={{
            width: '100%',
          }}
          isEditing={isEditing}
        />
      </Box>
    </Box>
  );
};
