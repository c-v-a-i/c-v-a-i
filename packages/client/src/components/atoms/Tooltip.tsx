import type { TooltipProps } from '@mui/material';
import { Typography, Tooltip as MuiTooltip } from '@mui/material';

export const Tooltip = ({ title, ...props }: TooltipProps) => (
  <MuiTooltip
    title={
      <Typography color="black" variant={'caption'}>
        {title}
      </Typography>
    }
    componentsProps={{
      tooltip: {
        sx: {
          background: 'background.paper',
          color: 'text.primary',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '12px',
        },
      },
    }}
    {...props}
  />
);
