import React from 'react';
import { Box, Typography } from '@mui/material';
import { EditableTypography, Row } from '../../../../atoms';
import type { CvEntryItemProps } from '../../types';
import {
  DescriptionTextSection,
  SkillsForItemizedEntryEditor,
} from '../../../components';
import { LocationAndDate } from '../WorkExperience/LocationAndDate';

export const EducationEntry = ({
  entry: ed,
  updateField,
  isEditing,
}: CvEntryItemProps<'educationEntries'>) => {
  return (
    <Box display="flex" flexDirection="column" gap={1} width={'100%'}>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'start'}
      >
        <Box display={'flex'} flexDirection={'column'}>
          <Row gap={1}>
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
              variant="h6"
              isEditing={isEditing}
              sx={{
                textWrap: 'nowrap',
                alignItems: 'center',
              }}
            />
            <Typography variant={'h6'}>@</Typography>
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
                textWrap: 'nowrap',
              }}
            />
          </Row>

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
        </Box>

        <LocationAndDate
          id={ed._id}
          location={ed.location}
          duration={ed.duration}
          updateField={updateField}
          isEditing={isEditing}
        />
      </Box>

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
    </Box>
  );
};
