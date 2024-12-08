import React from 'react';
import { Typography, Grid, Box, IconButton, useTheme, Tooltip } from '@mui/material';
import { grey } from '@mui/material/colors';
import { EditableTypography } from '../../EditableTypography';
import type { UpdateWorkExperienceEntryMutationVariables } from '../../../../generated/graphql';

import type { WorkExperienceEntry as WorkExperienceEntryType } from '../types';
import RemoveIcon from '@mui/icons-material/Remove';

interface WorkExperienceEntryProps {
  job: WorkExperienceEntryType;
  isEditing?: boolean;
  cvId: string;
  removeEntry: () => Promise<void>;
  updateField: (
    id: string,
    fieldName: keyof UpdateWorkExperienceEntryMutationVariables,
    value: string
  ) => Promise<void>;
}

export const WorkExperienceEntry = ({ job, updateField, isEditing, removeEntry }: WorkExperienceEntryProps) => {
  const theme = useTheme();

  return (
    <Box>
      <Grid container justifyContent="space-between">
        <Grid item xs={12} sm={8}>
          <Box display="flex" alignContent={'center'} height={'4ch'}>
            <EditableTypography
              id={`job-name-${job.id}`}
              value={job.name}
              onSave={(value) => updateField(job.id, 'name', value)}
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
            id={`job-position-${job.id}`}
            value={job.position}
            onSave={(value) => updateField(job.id, 'position', value)}
            variant="body1"
            isEditing={isEditing}
          />
          {job.type && (
            <EditableTypography
              id={`job-type-${job.id}`}
              value={job.type}
              onSave={(value) => updateField(job.id, 'type', value)}
              variant="body2"
              sx={{
                color: grey[700],
              }}
              isEditing={isEditing}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={4} textAlign="right" display={'flex'} flexDirection={'column'} alignItems={'end'}>
          {job.location && (
            <EditableTypography
              id={`job-location-${job.id}`}
              value={job.location}
              onSave={(value) => updateField(job.id, 'location', value)}
              variant="body2"
              isEditing={isEditing}
            />
          )}
          {job.duration && (
            <EditableTypography
              id={`job-duration-${job.id}`}
              value={job.duration}
              onSave={(value) => updateField(job.id, 'duration', value)}
              variant="body2"
              isEditing={isEditing}
            />
          )}
        </Grid>
      </Grid>
      {job.description && (
        <EditableTypography
          id={`job-description-${job.id}`}
          value={job.description}
          onSave={(value) => updateField(job.id, 'description', value)}
          multiline
          isEditing={isEditing}
        />
      )}
      {job.skills && job.skills.length > 0 && (
        // TODO: Implement editing functionality for skills array
        <Typography variant="body2" color={grey[600]}>
          Skills: {job.skills.join(', ')}
        </Typography>
      )}
    </Box>
  );
};
