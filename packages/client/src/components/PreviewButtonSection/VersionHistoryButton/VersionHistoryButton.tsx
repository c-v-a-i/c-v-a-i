import { useCurrentCv } from '../../../contexts';
import { useMemo, useState } from 'react';
import { IconButton } from '../../atoms';
import HistoryIcon from '@mui/icons-material/History';
import { VersionHistoryPopover } from './VersionHistoryPopover';

export const VersionHistoryButton = ({}) => {
  const { currentCvId } = useCurrentCv();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = useMemo(() => Boolean(anchorEl), [anchorEl]);

  return (
    <>
      <IconButton
        title="Version history"
        onClick={handleClick}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        disabled={!currentCvId}
      >
        <HistoryIcon />
      </IconButton>
      {currentCvId && (
        <VersionHistoryPopover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          cvId={currentCvId}
        />
      )}
    </>
  );
};
