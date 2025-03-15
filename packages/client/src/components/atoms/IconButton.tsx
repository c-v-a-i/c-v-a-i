import type { IconButtonProps } from '@mui/material';
import { IconButton as MuiIconButton, Tooltip } from '@mui/material';

export const IconButton = ({
  children,
  title,
  ...iconButtonProps
}: React.PropsWithChildren & { title: string } & IconButtonProps) => {
  // TODO: tooltip doesn't work correctly :(
  return (
    <Tooltip title={title}>
      <MuiIconButton title={title} {...iconButtonProps}>
        {children}
      </MuiIconButton>
    </Tooltip>
  );
};
