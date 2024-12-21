import React from 'react';
import { EditableTypography } from '../../../../atoms';
import type { CvEntryItemProps } from '../../types';
import {
  RightCvColumnEntriesContainer,
  SkillsForItemizedEntryEditor,
  WithRemoveEntryButton,
} from '../../../components';
import { DescriptionTextSection } from '../../../components';
import { LocationAndDate } from '../WorkExperience/LocationAndDate';

export const EducationEntry = ({
  entry: ed,
  updateField,
  isEditing,
  removeEntry,
}: CvEntryItemProps<'educationEntries'>) => {
  return (
    <RightCvColumnEntriesContainer>
      <WithRemoveEntryButton
        removeEntry={removeEntry}
        flexDirection={'row-reverse'}
      >
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
      </WithRemoveEntryButton>

      <LocationAndDate
        id={ed._id}
        location={ed.location}
        duration={ed.duration}
        updateField={updateField}
        isEditing={isEditing}
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
        variant="body1"
        isEditing={isEditing}
        sx={{
          width: '100%',
        }}
      />

      <DescriptionTextSection
        id={ed._id}
        isEditing={isEditing}
        value={ed.description}
        onSave={(value) =>
          updateField({
            _id: ed._id,
            fieldName: 'description',
            value,
          })
        }
      />

      <SkillsForItemizedEntryEditor
        id={`education-skills-${ed._id}`}
        isEditing={isEditing}
        value={ed.skills?.length ? ed.skills?.join(', ') : undefined}
        onSave={async (value) =>
          updateField({
            _id: ed._id,
            fieldName: 'skills',
            value: value.split(',').map((s) => s.trim()),
          })
        }
      />
    </RightCvColumnEntriesContainer>
  );
};
