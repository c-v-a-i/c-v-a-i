import React, { useCallback } from 'react';
import { Box } from '@mui/material';
import { EditableTypography, TextInputField } from '../../../../atoms';
import type { CvEntryItemProps } from '../../types';

import { SkillsList } from './SkillsList';
import {
  RightCvColumnEntriesContainer,
  WithRemoveEntryButton,
} from '../../../components';

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

  const handleEditSkill = useCallback(
    async (idx: number, newValue: string) => {
      const updatedSkills = skill.skills.map((s, i) =>
        i === idx ? newValue : s
      );
      await updateField({
        _id: skill._id,
        fieldName: 'skills',
        value: updatedSkills,
      });
    },
    [updateField, skill]
  );

  return (
    <RightCvColumnEntriesContainer>
      <WithRemoveEntryButton
        removeEntry={removeEntry}
        flexDirection={'row-reverse'}
      >
        <EditableTypography
          id={`skill-category-${skill._id}`}
          value={skill.category}
          onSave={(value) =>
            updateField({ _id: skill._id, fieldName: 'category', value })
          }
          variant="h6"
          sx={{ width: '100%' }}
          isEditing={isEditing}
        />
      </WithRemoveEntryButton>

      <Box display="flex" flexDirection="column" gap={1}>
        {skill.skills?.length > 0 && (
          <SkillsList
            skillIds={skill._id}
            skills={skill.skills}
            isEditing={isEditing}
            removeSkill={handleRemoveSkill}
            editSkill={handleEditSkill}
          />
        )}
      </Box>

      <TextInputField placeholder="New item" onEnterKey={handleAddSkillEntry} />
    </RightCvColumnEntriesContainer>
  );
};
