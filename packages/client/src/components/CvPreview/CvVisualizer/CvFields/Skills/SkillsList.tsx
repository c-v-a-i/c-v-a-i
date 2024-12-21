import React from 'react';
import { Box } from '@mui/material';
import { SkillItem } from './SkillItem';

interface SkillsListProps {
  skillIds: string; // e.g. skill._id
  skills: string[]; // array of skill strings
  removeSkill: (idx: number) => void;
  isEditing?: boolean;
  editSkill: (idx: number, newValue: string) => Promise<void>;
}

export const SkillsList: React.FC<SkillsListProps> = ({
  skillIds,
  skills,
  isEditing,
  removeSkill,
  editSkill,
}) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="flex-end" gap="2px">
      {skills.map((skillItem, idx) => (
        <SkillItem
          key={skillItem}
          skillId={`skill-item-${skillIds}-${skillItem}`}
          skillValue={skillItem}
          isEditing={isEditing}
          onRemove={() => removeSkill(idx)}
          onEdit={(newValue) => editSkill(idx, newValue)}
        />
      ))}
    </Box>
  );
};
