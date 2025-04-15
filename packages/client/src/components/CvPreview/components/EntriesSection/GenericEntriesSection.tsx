import React from 'react';
import type { BoxProps, TypographyProps } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { AddEntryButton } from '../../CvVisualizer/CvFields/WorkExperience/AddEntryButton';
import type { CvEntryItem } from '../../CvVisualizer/types';

type GenericEntriesSectionProps<TEntry extends CvEntryItem> = {
  title?: string;
  loading: boolean;
  entries: TEntry[];
  noEntriesText: string;
  renderEntry: (entry: TEntry) => React.ReactNode;
  onAdd?: () => void;
  titleStyles?: TypographyProps['sx'];
  flexDirection?: 'row' | 'column';
  sx?: BoxProps['sx'];
  gap?: BoxProps['gap'];
};

export function GenericEntriesSection<TEntry extends CvEntryItem>({
  title,
  loading,
  entries,
  noEntriesText,
  renderEntry,
  onAdd,
  titleStyles,
  flexDirection = 'column',
  sx,
  gap = 2,
}: GenericEntriesSectionProps<TEntry>) {
  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={sx}>
      {title && (
        <Box display="flex" justifyContent="space-between" width={'100%'}>
          <Typography variant="h4" gutterBottom sx={titleStyles}>
            {title}
          </Typography>
        </Box>
      )}

      <Box
        display="flex"
        flexDirection={flexDirection}
        gap={gap}
        flexWrap="wrap"
      >
        {entries.map((entry) => renderEntry(entry))}
        {!entries.length && <Typography>{noEntriesText}</Typography>}
        {onAdd && (
          <AddEntryButton
            onAddEntry={async () => onAdd()}
            sx={{ alignSelf: 'center' }}
          />
        )}
      </Box>
    </Box>
  );
}
