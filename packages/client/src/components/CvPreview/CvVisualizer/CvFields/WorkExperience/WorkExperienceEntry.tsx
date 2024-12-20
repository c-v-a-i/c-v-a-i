import React from 'react';
import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import { EditableTypography, RemoveEntryButton } from '../../../../atoms';
import type { CvEntryItemProps, UpdateItemizedFieldProps } from '../../types';
import { SkillsForItemizedEntryEditor } from '../../../components';
import type { Maybe } from '../../../../../generated/graphql';

interface LocationAndDateProps {
  id: string;
  location?: Maybe<string>;
  duration?: Maybe<string>;
  updateField: (
    update: UpdateItemizedFieldProps<'workExperienceEntries'>
  ) => Promise<void>;
  isEditing?: boolean;
}

const LocationAndDate: React.FC<LocationAndDateProps> = ({
  id,
  location,
  duration,
  updateField,
  isEditing,
}) => (
  <Box display="flex" flexDirection="column" alignItems="start" pt={'4px'}>
    <EditableTypography
      id={`we-location-${id}`}
      valueRender={(v) => v ?? 'Location (empty)'}
      value={location}
      onSave={async (value) =>
        updateField({
          _id: id,
          fieldName: 'location',
          value,
        })
      }
      variant="body2"
      isEditing={isEditing}
    />
    <EditableTypography
      id={`we-duration-${id}`}
      valueRender={(v) => v ?? 'Duration (empty)'}
      value={duration}
      onSave={async (value) =>
        updateField({
          _id: id,
          fieldName: 'duration',
          value,
        })
      }
      variant="body2"
      isEditing={isEditing}
    />
  </Box>
);

export const WorkExperienceEntry = ({
  entry: we,
  updateField,
  isEditing,
  removeEntry,
}: CvEntryItemProps<'workExperienceEntries'>) => {
  return (
    <Box display="flex" gap={1}>
      <Box flex={1}>
        <Box display="flex" flexDirection="column" gap={1}>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'start'}
          >
            <Box display={'flex'} flexDirection={'column'}>
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

              <EditableTypography
                id={`we-type-${we._id}`}
                valueRender={(v) => v ?? 'Type (empty)'}
                value={we.type}
                onSave={(value) =>
                  updateField({
                    _id: we._id,
                    fieldName: 'type',
                    value,
                  })
                }
                variant="body2"
                sx={{
                  color: grey[700],
                }}
                isEditing={isEditing}
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

          <EditableTypography
            id={`we-description-${we._id}`}
            valueRender={(v) => v ?? 'Description (empty)'}
            value={we.description}
            onSave={(value) =>
              updateField({
                _id: we._id,
                fieldName: 'description',
                value,
              })
            }
            multiline
            isEditing={isEditing}
            textFieldProps={{
              sx: {
                width: '100%',
              },
            }}
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
      </Box>
      <RemoveEntryButton onClick={removeEntry} />
    </Box>
  );
};
