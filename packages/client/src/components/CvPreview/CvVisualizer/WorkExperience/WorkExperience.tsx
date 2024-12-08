import React, { useState, useCallback, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import type { CvEntryComponentProps } from '../types';
import type {
  UpdateWorkExperienceEntryMutationVariables,
  GetWorkExperienceEntriesQuery,
} from '../../../../generated/graphql';
import { useGenerateNewEntryItemMutation, CvEntryType } from '../../../../generated/graphql';
import { refetchGetWorkExperienceEntriesQuery } from '../../../../generated/graphql';
import {
  useGetWorkExperienceEntriesQuery,
  useUpdateWorkExperienceEntryMutation,
  useDeleteWorkExperienceEntryMutation,
} from '../../../../generated/graphql';
import { WorkExperienceEntry } from './WorkExperienceEntry';
import { NewEntryManager } from './NewEntryManager';
import { match } from 'ts-pattern';

type WorkExperienceItem = GetWorkExperienceEntriesQuery['getWorkExperienceEntries'][number] & { isEditing?: boolean };

export const WorkExperience: React.FC<CvEntryComponentProps> = ({ cvId }) => {
  const { data, loading } = useGetWorkExperienceEntriesQuery({ variables: { cvId } });
  const [workExperienceEntries, setWorkExperienceEntries] = useState<WorkExperienceItem[]>([]);

  useEffect(() => {
    setWorkExperienceEntries(data?.getWorkExperienceEntries ?? []);
  }, [data]);

  const [updateWorkExperienceEntry] = useUpdateWorkExperienceEntryMutation({
    refetchQueries: [refetchGetWorkExperienceEntriesQuery({ cvId })],
  });
  const [deleteWorkExperienceEntry] = useDeleteWorkExperienceEntryMutation({
    refetchQueries: [refetchGetWorkExperienceEntriesQuery({ cvId })],
  });
  const [generateNewEntryItemMutation] = useGenerateNewEntryItemMutation({
    // allow some inconsistency, because we want to work with the received object instead of fetching new stuff
    refetchQueries: [],
  });

  const updateField = useCallback(
    async (id: string, fieldName: keyof UpdateWorkExperienceEntryMutationVariables, value: string) => {
      await updateWorkExperienceEntry({
        variables: {
          cvId,
          id,
          [fieldName]: value,
        },
      });
    },
    [cvId, updateWorkExperienceEntry]
  );

  const removeEntry = useCallback(
    async (id: string) => {
      try {
        await deleteWorkExperienceEntry({
          variables: {
            cvId,
            id,
          },
        });
      } catch (error) {
        console.error('Error deleting work experience:', error);
      }
    },
    [cvId, deleteWorkExperienceEntry]
  );

  const handleAddEntry = useCallback(async () => {
    const res = await generateNewEntryItemMutation({
      variables: {
        cvId,
        type: CvEntryType.WorkExperience,
      },
    });

    const newEntry = res.data?.generateNewEntryItem;
    if (!newEntry) return;

    const newWorkExperience = match(newEntry)
      .with({ __typename: 'WorkExperience' }, (we) => ({ ...we, isEditing: true }))
      .otherwise(() => null);

    if (newWorkExperience) {
      setWorkExperienceEntries((entries) => [...entries, newWorkExperience]);
    }
  }, [cvId, generateNewEntryItemMutation]);

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          Work Experience
        </Typography>
      </Box>

      <Box display="flex" flexDirection="column" gap={2}>
        {workExperienceEntries.map((job) => (
          <WorkExperienceEntry
            cvId={cvId}
            key={job.id}
            job={job}
            isEditing={job.isEditing}
            updateField={updateField}
            removeEntry={() => removeEntry(job.id)}
          />
        ))}

        <NewEntryManager onAddEntry={handleAddEntry} />
      </Box>
    </Box>
  );
};
