import { Paper, Typography } from '@mui/material';
import { ItemChangeDisplay } from './ItemChangeDisplay';
import type { SectionChange } from './types';
import { Column } from '../atoms';

type SectionChangeDisplayProps = {
  section: SectionChange;
};

export const SectionChangeDisplay = ({
  section,
}: SectionChangeDisplayProps) => (
  <Paper elevation={2} sx={{ p: 2 }}>
    <Typography variant="h6" gutterBottom>
      {section.section}
    </Typography>

    <Column gap={2}>
      {section.items.map((item, idx) => (
        <ItemChangeDisplay
          key={`${item.name}-${idx}`}
          item={item}
          isLast={idx === section.items.length - 1}
        />
      ))}
    </Column>
  </Paper>
);
