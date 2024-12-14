import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { EditableTypography } from '../../../atoms';
import type { CvEntryComponentProps, UpdateItemizedFieldProps } from '../types';
import type { UpdateSkillEntryMutationVariables } from '../../../../generated/graphql';
import {
  useGetSkillEntriesQuery,
  refetchGetSkillEntriesQuery,
  useUpdateSkillEntryMutation,
} from '../../../../generated/graphql';
import { sortByPosition } from '../../../utils';

export const Skills: React.FC<CvEntryComponentProps> = ({ cvId }) => {
  const { data, loading } = useGetSkillEntriesQuery({
    variables: { cvId },
  });
  const skillEntriesData = data?.getCv?.skillEntries;

  const [skillEntries, setSkillEntries] = useState<
    NonNullable<typeof skillEntriesData>
  >([]);

  const [updateSkillEntry] = useUpdateSkillEntryMutation({
    refetchQueries: [refetchGetSkillEntriesQuery({ cvId })],
  });

  useEffect(() => {
    setSkillEntries(sortByPosition(skillEntriesData ?? []));
  }, [skillEntriesData]);

  const updateField = async ({
    _id,
    fieldName,
    value,
  }: UpdateItemizedFieldProps<UpdateSkillEntryMutationVariables>) => {
    try {
      await updateSkillEntry({
        variables: {
          cvId,
          _id,
          [fieldName]: value,
        },
      });
    } catch (error) {
      console.error('Error updating skill entry:', error);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!skillEntries.length) {
    return <Typography>No skills available.</Typography>;
  }

  return (
    <Box width={'100%'}>
      <Typography variant="h4" gutterBottom>
        Skills
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        {skillEntries.map((skill) => (
          <Box
            key={skill._id}
            mb={2}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'end'}
            textAlign={'right'}
          >
            <EditableTypography
              id={`skill-category-${skill._id}`}
              value={skill.category}
              onSave={(value) =>
                updateField({ _id: skill._id, fieldName: 'category', value })
              }
              variant="h6"
            />
            {/* For editing items, we could implement a similar pattern with EditableTypography or a multi-value input */}
            {skill.items && skill.items.length > 0 && (
              <Typography variant="body2" color={grey[600]}>
                Items: {skill.items.join(', ')}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
