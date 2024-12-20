import React, { useCallback } from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import { EditableTypography, RemoveEntryButton } from '../../../../atoms';
import type { CvEntryItemProps } from '../../types';
import CloseIcon from '@mui/icons-material/Close';

const SkillInputField = ({
  onAddSkill,
}: {
  onAddSkill: (skill: string) => void;
}) => {
  const [inputValue, setInputValue] = React.useState('');

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      onAddSkill(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <TextField
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyPress}
      fullWidth
      variant="standard"
      size="small"
      sx={{
        typography: 'body2',
        width: '160px',
      }}
      placeholder="New item"
    />
  );
};

export const SkillEntry = ({
  entry: skill,
  updateField,
  isEditing,
  removeEntry,
}: CvEntryItemProps<'skillEntries'>) => {
  const handleRemoveSkill = useCallback(
    async (idxToRemove: number) => {
      const updatedSkills = [
        ...skill.skills.slice(0, idxToRemove),
        ...skill.skills.slice(idxToRemove + 1),
      ];
      await updateField({
        _id: skill._id,
        fieldName: 'skills',
        value: updatedSkills,
      });
    },
    [updateField, skill]
  );

  const handleAddSkillEntry = useCallback(
    async (name: string) => {
      const newSkills = [...skill.skills, name];
      await updateField({
        _id: skill._id,
        fieldName: 'skills',
        value: newSkills,
      });
    },
    [updateField, skill]
  );

  return (
    <Box display={'flex'} gap={1}>
      <RemoveEntryButton onClick={removeEntry} />

      <Box
        flex={1}
        display="flex"
        sx={{
          textAlign: 'right',
          alignItems: 'flex-end',
          flexDirection: 'column',
        }}
      >
        <EditableTypography
          id={`skill-category-${skill._id}`}
          value={skill.category}
          onSave={(value) =>
            updateField({
              _id: skill._id,
              fieldName: 'category',
              value,
            })
          }
          variant="h6"
          sx={{
            width: '100%',
          }}
          isEditing={isEditing}
        />
        <Box display={'flex'} flexDirection="column" gap={1}>
          {skill.skills && skill.skills.length > 0 && (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-end"
              gap={'2px'}
            >
              {skill.skills.map((skillItem, idx) => (
                <Box key={skillItem} display="flex" alignItems="center">
                  <IconButton
                    size="small"
                    onClick={async () => handleRemoveSkill(idx)}
                    sx={{
                      padding: '1px',
                      borderRadius: '2px',
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>

                  <EditableTypography
                    sx={{
                      flex: 1,
                    }}
                    id={`skill-item-${skill._id}-${skillItem}`}
                    value={skillItem}
                    onSave={async (value) => {
                      const updatedSkills = skill.skills.map((s) =>
                        s === skillItem ? value : s
                      );
                      await updateField({
                        _id: skill._id,
                        fieldName: 'skills',
                        value: updatedSkills,
                      });
                    }}
                    variant="body2"
                    isEditing={isEditing}
                  />
                </Box>
              ))}
            </Box>
          )}
        </Box>
        {/* <TextField></TextField>*/}
        <SkillInputField onAddSkill={handleAddSkillEntry} />
        {/* <AddEntryButton width={'150px'} onAddEntry={handleAddSkillEntry} />*/}
      </Box>
    </Box>
  );
};
