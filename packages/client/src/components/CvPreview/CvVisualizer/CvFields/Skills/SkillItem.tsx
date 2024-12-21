import React from 'react';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { EditableTypography } from '../../../../atoms';
import { usePreviewMode } from '../../../../../contexts';

interface SkillItemProps {
  skillId: string;
  skillValue: string;
  isEditing?: boolean;
  onRemove: () => void;
  onEdit: (newValue: string) => void;
}

export const SkillItem: React.FC<SkillItemProps> = ({
  skillId,
  skillValue,
  isEditing,
  onRemove,
  onEdit,
}) => {
  const { isPreviewing } = usePreviewMode();

  return (
    <Box display="flex" alignItems="center">
      {!isPreviewing && (
        <IconButton
          size="small"
          onClick={onRemove}
          sx={{ padding: '1px', borderRadius: '2px' }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      )}

      <EditableTypography
        sx={{ flex: 1 }}
        id={skillId}
        value={skillValue}
        onSave={async (value) => onEdit(value)}
        variant="body2"
        isEditing={isEditing}
      />
    </Box>
  );
};
