import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Typography, Box } from '@mui/material';
import type {
  ArrayElementEnhancer,
  CvEntryComponentProps,
  UpdateItemizedFieldProps,
} from '../../types';
import type { UpdateWorkExperienceEntryMutationVariables } from '../../../../../generated/graphql';
import { useDeleteEntryItemMutation } from '../../../../../generated/graphql';
import {
  useGenerateNewEntryItemMutation,
  CvEntryType,
} from '../../../../../generated/graphql';
import { refetchGetWorkExperienceEntriesQuery } from '../../../../../generated/graphql';
import {
  useGetWorkExperienceEntriesQuery,
  useUpdateWorkExperienceEntryMutation,
} from '../../../../../generated/graphql';
import { WorkExperienceEntry } from './WorkExperienceEntry';
import { NewEntryManager } from './NewEntryManager';
import { match } from 'ts-pattern';
import { sortByPosition } from '../../../../utils';

export const WorkExperience: React.FC<CvEntryComponentProps> = ({ cvId }) => {
  const { data, loading } = useGetWorkExperienceEntriesQuery({
    variables: { cvId },
  });
  const workExperienceData = useMemo(() => {
    const weEntries = data?.getCv?.workExperienceEntries;
    return weEntries as ArrayElementEnhancer<
      typeof weEntries,
      { isEditing?: boolean }
    >;
  }, [data]);

  const [workExperienceEntries, setWorkExperienceEntries] = useState<
    NonNullable<typeof workExperienceData>
  >([]);

  useEffect(() => {
    setWorkExperienceEntries(sortByPosition(workExperienceData ?? []));
  }, [workExperienceData]);

  const [updateWorkExperienceEntry] = useUpdateWorkExperienceEntryMutation({
    refetchQueries: [refetchGetWorkExperienceEntriesQuery({ cvId })],
  });
  const [deleteWorkExperienceEntry] = useDeleteEntryItemMutation({
    refetchQueries: [refetchGetWorkExperienceEntriesQuery({ cvId })],
  });
  const [generateNewEntryItemMutation] = useGenerateNewEntryItemMutation({
    // allow some inconsistency, because we want to work with the received object instead of fetching new stuff
    refetchQueries: [],
  });

  const updateField = useCallback(
    async ({
      fieldName,
      value,
      _id,
    }: UpdateItemizedFieldProps<UpdateWorkExperienceEntryMutationVariables>) => {
      await updateWorkExperienceEntry({
        variables: {
          cvId,
          _id,
          [fieldName]: value,
        },
      });
    },
    [cvId, updateWorkExperienceEntry]
  );

  const removeEntry = useCallback(
    async ({ entryItemId }: { entryItemId: string }) => {
      await deleteWorkExperienceEntry({
        variables: {
          cvId,
          entryType: CvEntryType.WorkExperience,
          entryItemId,
        },
      });
    },
    [cvId, deleteWorkExperienceEntry]
  );

  const handleAddEntry = useCallback(async () => {
    const res = await generateNewEntryItemMutation({
      variables: {
        cvId,
        entryType: CvEntryType.WorkExperience,
      },
    });

    const newEntry = res.data?.generateNewEntryItem;
    if (!newEntry) return;

    const newWorkExperience = match(newEntry)
      .with({ __typename: 'WorkExperience' }, (we) => ({
        ...we,
        isEditing: true,
      }))
      .otherwise(() => null);

    if (newWorkExperience) {
      setWorkExperienceEntries((entries) =>
        sortByPosition([...entries, newWorkExperience])
      );
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
        {workExperienceEntries.map((we) => (
          <WorkExperienceEntry
            cvId={cvId}
            key={we._id}
            we={we}
            isEditing={we.isEditing}
            updateField={updateField}
            removeEntry={() => removeEntry({ entryItemId: we._id })}
          />
        ))}

        <NewEntryManager onAddEntry={handleAddEntry} />
      </Box>
    </Box>
  );
};
