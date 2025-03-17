import React from 'react';
import {
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DifferenceIcon from '@mui/icons-material/Difference';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { StandardListItem } from '../../atoms/List';
import type { CvVersionHistoryEntry } from '../../../generated/graphql';

interface VersionHistoryItemProps {
  version: CvVersionHistoryEntry;
  onCompareClick?: (versionId: string) => void;
  onCreateFromClick: (versionId: string) => void;
  onClick?: (versionId: string) => void;
}

export const VersionHistoryItem: React.FC<VersionHistoryItemProps> = ({
  version,
  onCompareClick,
  onCreateFromClick,
  onClick,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCompareClick = () => {
    if (onCompareClick) {
      onCompareClick(version._id);
    }
    handleClose();
  };

  const handleCreateFromClick = () => {
    onCreateFromClick(version._id);
    handleClose();
  };

  const renderVersionLabel = () => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography variant="body1">
        Version {version.versionNumber}
        {version.isCurrentVersion && (
          <Chip
            size="small"
            label="Current"
            color="primary"
            sx={{ ml: 1, height: 18, fontSize: 10 }}
          />
        )}
      </Typography>
      <IconButton
        size="small"
        onClick={handleMenuClick}
        aria-label="more"
        aria-controls={open ? 'version-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>
    </Box>
  );

  const formattedDate = `Created: ${format(
    new Date(version.createdAt),
    'MMM d, yyyy HH:mm'
  )}`;

  const renderActions = () => (
    <Menu
      id="version-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      onClick={(e) => e.stopPropagation()}
      MenuListProps={{
        'aria-labelledby': 'version-actions-button',
      }}
    >
      {onCompareClick && (
        <MenuItem onClick={handleCompareClick}>
          <DifferenceIcon fontSize="small" sx={{ mr: 1 }} />
          Compare with current
        </MenuItem>
      )}
      <MenuItem onClick={handleCreateFromClick}>
        <ContentCopyIcon fontSize="small" sx={{ mr: 1 }} />
        Create new CV from this version
      </MenuItem>
    </Menu>
  );

  return (
    <StandardListItem
      _id={version._id}
      item={version}
      primary={renderVersionLabel()}
      secondary={formattedDate}
      highlight={version.isCurrentVersion}
      onClick={onClick}
      actions={renderActions()}
    />
  );
};
