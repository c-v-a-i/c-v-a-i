import React, { useMemo } from 'react';
import { usePreviewMode } from '../../../../../contexts';
import { Box } from '@mui/material';
import { EditableTypography } from '../../../../atoms';
import type { Maybe } from 'graphql/jsutils/Maybe';

interface LocationAndDateProps {
  id: string;
  location?: Maybe<string>;
  duration?: Maybe<string>;
  updateField: (props: {
    _id: string;
    fieldName: 'location' | 'duration';
    value: string;
  }) => Promise<void>;
  isEditing?: boolean;
}

export const LocationAndDate: React.FC<LocationAndDateProps> = ({
  id,
  location,
  duration,
  updateField,
  isEditing,
}) => {
  const { isPreviewing } = usePreviewMode();

  const shouldShowLocation = useMemo(
    () => !isPreviewing || location,
    [isPreviewing, location]
  );

  const shouldShowDuration = useMemo(
    () => !isPreviewing || duration,
    [isPreviewing, duration]
  );

  return (
    <Box display="flex" flexDirection="column" alignItems="start">
      {shouldShowLocation && (
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
      )}
      {shouldShowDuration && (
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
      )}
    </Box>
  );
};
