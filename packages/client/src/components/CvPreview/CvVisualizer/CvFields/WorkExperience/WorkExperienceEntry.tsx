import React from 'react';
import { Box } from '@mui/material';
import { EditableTypography } from '../../../../atoms';
import type { CvEntryItemProps } from '../../types';
import {
  DescriptionTextSection,
  JobTypeTextSection,
  SkillsForItemizedEntryEditor,
  WithRemoveEntryButton,
} from '../../../components';
import { LocationAndDate } from './LocationAndDate';

export const WorkExperienceEntry = ({
  entry: we,
  updateField,
  isEditing,
  removeEntry,
}: CvEntryItemProps<'workExperienceEntries'>) => {
  return (
    <Box display="flex" flexDirection="column" gap={1} width={'100%'}>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'start'}
        width={'100%'}
      >
        <Box display={'flex'} flexDirection={'column'}>
          <WithRemoveEntryButton removeEntry={removeEntry}>
            <EditableTypography
              id={`we-name-${we._id}`}
              value={we.name}
              onSave={(value) =>
                updateField({
                  _id: we._id,
                  fieldName: 'name',
                  value,
                })
              }
              variant="h6"
              isEditing={isEditing}
            />
          </WithRemoveEntryButton>

          <EditableTypography
            id={`we-position-${we._id}`}
            value={we.position}
            onSave={(value) =>
              updateField({
                _id: we._id,
                fieldName: 'position',
                value,
              })
            }
            variant="body1"
            isEditing={isEditing}
          />

          <JobTypeTextSection
            id={we._id}
            value={we.type}
            isEditing={isEditing}
            onSave={(value) =>
              updateField({
                _id: we._id,
                fieldName: 'type',
                value,
              })
            }
          />
        </Box>

        <LocationAndDate
          id={we._id}
          location={we.location}
          duration={we.duration}
          updateField={updateField}
          isEditing={isEditing}
        />
      </Box>

      <DescriptionTextSection
        id={we._id}
        isEditing={isEditing}
        value={we.description}
        onSave={(value) =>
          updateField({
            _id: we._id,
            fieldName: 'description',
            value,
          })
        }
      />

      <SkillsForItemizedEntryEditor
        id={`we-skills-${we._id}`}
        isEditing={isEditing}
        value={we.skills?.length ? we.skills?.join(', ') : undefined}
        onSave={async (value) =>
          updateField({
            _id: we._id,
            fieldName: 'skills',
            value: value.split(',').map((s) => s.trim()),
          })
        }
      />
    </Box>
  );
};
