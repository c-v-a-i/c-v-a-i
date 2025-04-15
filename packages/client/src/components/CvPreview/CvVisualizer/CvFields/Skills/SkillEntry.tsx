import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { EditableTypography, Row } from '../../../../atoms';
import type { CvEntryItemProps } from '../../types';
import { CommaSeparatedList } from '../../../../CommaSeparatedList';

export const SkillEntry = ({
  entry: skill,
  updateField,
  isEditing,
}: CvEntryItemProps<'skillEntries'>) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleUpdateSkills = async (newSkills: string[]) => {
    await updateField({
      _id: skill._id,
      fieldName: 'skills',
      value: newSkills,
    });
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Row>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'baseline',
            whiteSpace: 'nowrap',
            minWidth: 'fit-content',
          }}
        >
          <EditableTypography
            id={`skill-category-${skill._id}`}
            value={skill.category}
            onSave={(value) =>
              updateField({ _id: skill._id, fieldName: 'category', value })
            }
            variant="h6"
            sx={{
              fontWeight: 'bold',
              display: 'inline',
            }}
            isEditing={isEditing}
          />
          <Typography variant="h6" sx={{ fontWeight: 'bold', mr: 1 }}>
            :
          </Typography>
        </Box>

        <CommaSeparatedList
          id={`skill-items-${skill._id}`}
          isEditing={isEditing}
          items={skill.skills || []}
          onSave={handleUpdateSkills}
          variant="h6"
          showWhenEmpty={isEditing}
          sx={{ width: '100%' }}
        />
      </Row>

      {isEditing && skill.skills.length === 0 && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1, ml: isMobile ? 0 : 2 }}
        >
          Add skills to this category
        </Typography>
      )}
    </Box>
  );
};
