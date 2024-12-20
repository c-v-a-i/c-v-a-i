import { useCallback, useEffect, useMemo, useState } from 'react';
import type { GetCvQueryHookResult } from '../../../../generated/graphql';
import {
  CvEntryType,
  useDeleteEntryItemMutation,
  useGenerateNewEntryItemMutation,
  useGetCvQuery,
  useUpdateCvMutation,
} from '../../../../generated/graphql';
import { sortByPosition } from '../../../utils';
import type { InternalRefetchQueriesInclude } from '@apollo/client';
import type {
  CvEntryArrayFieldName,
  CvEntryItem,
  UpdateItemizedFieldProps,
} from '../../CvVisualizer/types';
import { match } from 'ts-pattern';

interface UseCvEntriesOptions<T extends CvEntryArrayFieldName> {
  cvId: string;
  entryFieldName: T;
  useGetEntriesQueryResult: GetCvQueryHookResult;
  refetchQueries: InternalRefetchQueriesInclude;
}

export function useCvEntries<T extends CvEntryArrayFieldName>(
  options: UseCvEntriesOptions<T>
) {
  const { cvId, entryFieldName, refetchQueries } = options;

  const entryType = useMemo(
    () =>
      match(entryFieldName as unknown as CvEntryArrayFieldName)
        .returnType<CvEntryType>()
        .with('workExperienceEntries', () => CvEntryType.WorkExperience)
        .with('educationEntries', () => CvEntryType.Education)
        .with('projectEntries', () => CvEntryType.Project)
        .with('skillEntries', () => CvEntryType.Skill)
        .with('contactInfoEntries', () => CvEntryType.ContactInfo)
        .exhaustive(),
    [entryFieldName]
  );

  // TODO: update to dynamic query, ideally. because I don't wanna fetch the whole CV since it's sub-optimal.
  //   The dynamic document should fetch only the selected fields given by entryFieldName.
  //   Then, there should be a map entryFieldName => CorrectFragment
  const { data, loading } = useGetCvQuery({
    variables: {
      cvId,
    },
  });

  const entriesData = useMemo(
    () => data?.getCv?.[entryFieldName] ?? [],
    [data, entryFieldName]
  );

  const [entries, setEntries] = useState<typeof entriesData>([]);

  const [updateCv] = useUpdateCvMutation({
    refetchQueries,
  });
  const [deleteEntryItemMutation] = useDeleteEntryItemMutation({
    refetchQueries,
  });
  const [generateNewEntryItemMutation] = useGenerateNewEntryItemMutation({
    refetchQueries: [],
  });

  useEffect(() => {
    setEntries(sortByPosition<CvEntryItem>(entriesData) as typeof entriesData);
  }, [entriesData]);

  const updateField = useCallback(
    async ({
      _id,
      fieldName,
      value,
    }: UpdateItemizedFieldProps<typeof entryFieldName>) => {
      await updateCv({
        variables: {
          cvId,
          data: {
            [entryFieldName]: [{ _id, [fieldName]: value }],
          },
        },
      });
    },
    [cvId, updateCv, entryFieldName]
  );

  const removeEntry = useCallback(
    async (entryItemId: string) => {
      await deleteEntryItemMutation({
        variables: {
          cvId,
          entryType,
          entryItemId,
        },
      });
    },
    [cvId, entryType, deleteEntryItemMutation]
  );

  const handleAddEntry = useCallback(async () => {
    const res = await generateNewEntryItemMutation({
      variables: {
        cvId,
        entryType,
      },
    });

    const newEntries = res.data?.generateNewEntryItem?.[entryFieldName];

    if (!newEntries?.length) {
      return;
    }
    // probably, there should be 'isEditing: true' as well
    setEntries(sortByPosition([...newEntries]) as typeof entries);
  }, [cvId, entryType, entryFieldName, generateNewEntryItemMutation]);

  return {
    entries,
    loading,
    updateField,
    removeEntry,
    handleAddEntry,
  };
}
