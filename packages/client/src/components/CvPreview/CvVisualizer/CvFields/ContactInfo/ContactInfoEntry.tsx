import React from 'react';
import { Column, EditableTypography } from '../../../../atoms';
import type { CvEntryItemProps } from '../../types';

export const ContactInfoEntry = ({
  entry: contactInfo,
  updateField,
  isEditing,
}: CvEntryItemProps<'contactInfoEntries'>) => {
  return (
    <Column>
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
        variant="body1"
        isEditing={isEditing}
        sx={{
          textAlign: 'center',
        }}
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
        variant="body2"
        isEditing={isEditing}
        sx={{
          color: 'primary.main',
        }}
      />
    </Column>
  );
};
