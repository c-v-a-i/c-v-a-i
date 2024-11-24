import React from 'react';
import { Typography, Box } from '@mui/material';

type Entry = {
  id: string;
  [key: string]: any;
};

type EntrySectionProps = {
  title: string;
  data: Entry[];
  onUpdateEntry: (id: string, field: string, value: any) => Promise<void>;
  renderFields: (entry: Entry) => React.ReactNode;
};

export const EntrySection: React.FC<EntrySectionProps> = ({ title, data, onUpdateEntry, renderFields }) => {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        {data.map((entry) => (
          <Box key={entry.id}>{renderFields(entry)}</Box>
        ))}
      </Box>
    </Box>
  );
};
