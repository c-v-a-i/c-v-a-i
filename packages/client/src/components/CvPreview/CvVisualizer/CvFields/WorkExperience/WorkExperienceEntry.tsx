import React from 'react';
import {
  Typography,
  Grid,
  Box,
  IconButton,
  useTheme,
  Tooltip,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { EditableTypography } from '../../../../atoms';
import type {
  UpdateWorkExperienceEntryMutationVariables,
  WorkExperience,
} from '../../../../../generated/graphql';

import type { UpdateItemizedFieldProps } from '../../types';
import RemoveIcon from '@mui/icons-material/Remove';

interface WorkExperienceEntryProps {
  we: WorkExperience;
  isEditing?: boolean;
  cvId: string;
  removeEntry: () => Promise<void>;
  updateField: (
    props: UpdateItemizedFieldProps<UpdateWorkExperienceEntryMutationVariables>
  ) => Promise<void>;
}

export const WorkExperienceEntry = ({
  we,
  updateField,
  isEditing,
  removeEntry,
}: WorkExperienceEntryProps) => {
  const theme = useTheme();

  return (
    <Box>
      <Grid container justifyContent="space-between">
        <Grid item xs={12} sm={8}>
          <Box display="flex" alignContent={'center'} height={'4ch'}>
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
            <Tooltip title={'Remove item'}>
              <IconButton
                onClick={removeEntry}
                sx={{
                  color: theme.palette.error.light,
                }}
              >
                <RemoveIcon />
              </IconButton>
            </Tooltip>
          </Box>

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
          {we.type && (
            <EditableTypography
              id={`we-type-${we._id}`}
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
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          textAlign="right"
          display={'flex'}
          flexDirection={'column'}
          alignItems={'end'}
        >
          {we.location && (
            <EditableTypography
              id={`we-location-${we._id}`}
              value={we.location}
              onSave={(value) =>
                updateField({
                  _id: we._id,
                  fieldName: 'location',
                  value,
                })
              }
              variant="body2"
              isEditing={isEditing}
            />
          )}
          {we.duration && (
            <EditableTypography
              id={`we-duration-${we._id}`}
              value={we.duration}
              onSave={(value) =>
                updateField({
                  _id: we._id,
                  fieldName: 'duration',
                  value,
                })
              }
              variant="body2"
              isEditing={isEditing}
            />
          )}
        </Grid>
      </Grid>
      {we.description && (
        <EditableTypography
          id={`we-description-${we._id}`}
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
        />
      )}
      {we.skills && we.skills.length > 0 && (
        // TODO: Implement editing functionality for skills array
        <Typography variant="body2" color={grey[600]}>
          Skills: {we.skills.join(', ')}
        </Typography>
      )}
    </Box>
  );
};
