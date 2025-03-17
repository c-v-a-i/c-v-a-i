import { Chip, Divider, Typography } from '@mui/material';
import { FieldChangeDisplay } from './FieldChangeDisplay';
import type { ItemChange } from './types';
import { getActionColor } from './utils';
import { Box } from '../atoms';

type ItemChangeDisplayProps = {
  item: ItemChange;
  isLast: boolean;
};

export const ItemChangeDisplay = ({ item, isLast }: ItemChangeDisplayProps) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          {item.name}
        </Typography>
        <Chip
          size="small"
          label={item.action}
          color={getActionColor(item.action)}
          sx={{ textTransform: 'capitalize' }}
        />
      </Box>

      {item.fields.map((field, idx) => (
        <FieldChangeDisplay key={`${field.label}-${idx}`} field={field} />
      ))}

      {!isLast && <Divider sx={{ my: 1 }} />}
    </Box>
  );
};
