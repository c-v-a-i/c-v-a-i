import React from 'react';
import { EditableTypography } from '../../../../atoms';
import type { CvEntryItemProps } from '../../types';
import {
  RightCvColumnEntriesContainer,
  WithRemoveEntryButton,
} from '../../../components';

export const ContactInfoEntry = ({
  entry: contactInfo,
  updateField,
  isEditing,
  removeEntry,
}: CvEntryItemProps<'contactInfoEntries'>) => {
  return (
    <RightCvColumnEntriesContainer>
      <WithRemoveEntryButton
        removeEntry={removeEntry}
        flexDirection={'row-reverse'}
      >
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
      </WithRemoveEntryButton>

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
    </RightCvColumnEntriesContainer>
  );
};
