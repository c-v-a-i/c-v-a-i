import { IconButton, Tooltip } from '@mui/material';
import Preview from '@mui/icons-material/Preview';
import { usePreviewMode } from '../../contexts';
import { usePreviewEffects } from '../../hooks';

export const PreviewModeButton = ({}) => {
  const { togglePreviewMode, isPreviewing } = usePreviewMode();

  usePreviewEffects();

  if (isPreviewing) {
    return null;
  }
  return (
    <Tooltip title={'Preview'}>
      <IconButton onClick={togglePreviewMode}>
        <Preview />
      </IconButton>
    </Tooltip>
  );
};
