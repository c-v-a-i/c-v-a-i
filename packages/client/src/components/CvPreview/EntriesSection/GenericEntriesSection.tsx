import React from 'react';
import type { TypographyProps } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { NewEntryManager } from '../CvVisualizer/CvFields/WorkExperience/NewEntryManager';
import type { CvEntryItem } from '../CvVisualizer/types';

type GenericEntriesSectionProps<TEntry extends CvEntryItem> = {
  title: string;
  loading: boolean;
  entries: TEntry[];
  noEntriesText: string;
  renderEntry: (entry: TEntry) => React.ReactNode;
  onAdd?: () => void;
  titleStyles?: TypographyProps['sx'];
};

export function GenericEntriesSection<TEntry extends CvEntryItem>({
  title,
  loading,
  entries,
  noEntriesText,
  renderEntry,
  onAdd,
  titleStyles,
}: GenericEntriesSectionProps<TEntry>) {
  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" width={'100%'}>
        <Typography variant="h4" gutterBottom sx={titleStyles}>
          {title}
        </Typography>
      </Box>

      <Box display="flex" flexDirection="column" gap={2}>
        {entries.map((entry) => renderEntry(entry))}
        {!entries.length && <Typography>{noEntriesText}</Typography>}
        {onAdd && <NewEntryManager onAddEntry={async () => onAdd()} />}
      </Box>
    </Box>
  );
}
