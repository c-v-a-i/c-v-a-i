import Preview from '@mui/icons-material/Preview';
import { usePreviewMode } from '../../contexts';
import { usePreviewEffects } from '../../hooks';
import { IconButton } from '../atoms/IconButton';

export const PreviewModeButton = ({}) => {
  const { togglePreviewMode, isPreviewing } = usePreviewMode();

  usePreviewEffects();

  if (isPreviewing) {
    return null;
  }
  return (
    <IconButton onClick={togglePreviewMode} title={'Preview'}>
      <Preview />
    </IconButton>
  );
};
