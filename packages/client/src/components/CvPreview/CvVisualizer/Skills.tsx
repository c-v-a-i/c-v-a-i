import React from 'react';
import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { EditableTypography } from '../EditableTypography';
import type { CvEntryComponentProps } from './types';
import type { UpdateSkillEntryMutationVariables } from '../../../generated/graphql';
import {
  GetSkillEntriesComponent,
  refetchGetSkillEntriesQuery,
  useUpdateSkillEntryMutation,
} from '../../../generated/graphql';

export const Skills = ({ cvId }: CvEntryComponentProps) => {
  const [updateSkillEntry] = useUpdateSkillEntryMutation({
    refetchQueries: [
      refetchGetSkillEntriesQuery({
        cvId,
      }),
    ],
  });

  const updateField = async (
    id: string,
    fieldName: keyof UpdateSkillEntryMutationVariables,
    value: string | string[]
  ) => {
    await updateSkillEntry({
      variables: {
        cvId,
        id,
        [fieldName]: value,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateSkill: true,
      },
    });
  };

  return (
    <GetSkillEntriesComponent fetchPolicy={'cache-first'} variables={{ cvId }}>
      {({ data: { getSkillEntries: skillEntries } = {}, loading }) =>
        loading || !skillEntries ? (
          <Typography>Loading...</Typography>
        ) : (
          <Box width={'100%'}>
            <Typography variant="h4" gutterBottom>
              Skills
            </Typography>

            <Box display="flex" flexDirection="column" gap={2}>
              {skillEntries.map((skill) => (
                <Box
                  key={skill.id}
                  mb={2}
                  display={'flex'}
                  flexDirection={'column'}
                  alignItems={'end'}
                  textAlign={'right'}
                >
                  <EditableTypography
                    id={`skill-category-${skill.id}`}
                    value={skill.category}
                    onSave={(value) => updateField(skill.id, 'category', value)}
                    variant="h6"
                  />
                  {/* TODO: implement editing for items array */}
                  {skill.items && skill.items.length > 0 && (
                    <Typography variant="body2" color={grey[600]}>
                      Items: {skill.items.join(', ')}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        )
      }
    </GetSkillEntriesComponent>
  );
};
