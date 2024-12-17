import type { IconButtonProps} from "@mui/material";
import {IconButton, Tooltip} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import React from "react";

export const RemoveEntryButton = ({ onClick }: IconButtonProps) => (
  <Tooltip title={'Remove entry'}>
    <IconButton
      onClick={onClick}
      sx={(theme) => ({
        color: theme.palette.error.light,
        height: 'fit-content',
      })}
    >
      <RemoveIcon />
    </IconButton>
  </Tooltip>
);
