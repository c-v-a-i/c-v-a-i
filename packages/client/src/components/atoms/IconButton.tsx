import type { IconButtonProps } from '@mui/material';
import { IconButton as MuiIconButton } from '@mui/material';
import { Tooltip } from './Tooltip';

export const IconButton = ({
  children,
  title,
  ...iconButtonProps
}: React.PropsWithChildren & { title: string } & IconButtonProps) => {
  return (
    <Tooltip title={title}>
      <MuiIconButton {...iconButtonProps}>{children}</MuiIconButton>
    </Tooltip>
  );
};
