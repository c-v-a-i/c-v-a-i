import React from 'react';
import { SkillEntry } from './SkillEntry';
import {
  GenericEntriesSection,
  useCvEntries,
  WithRemoveEntryButton,
} from '../../../components';
import type { CvEntryComponentProps } from '../../types';
import type { Skill as SkillGraphqlType } from '../../../../../generated/graphql';
import {
  refetchGetSkillEntriesQuery,
  useGetCvQuery,
} from '../../../../../generated/graphql';

export const Skills: React.FC<CvEntryComponentProps> = ({ cvId }) => {
  const useGetEntriesQueryResult = useGetCvQuery({
    variables: { cvId },
  });
  const { entries, loading, updateField, removeEntry, handleAddEntry } =
    useCvEntries({
      cvId,
      useGetEntriesQueryResult,
      entryFieldName: 'skillEntries',
      refetchQueries: [refetchGetSkillEntriesQuery({ cvId })],
    });

  return (
    <GenericEntriesSection<SkillGraphqlType>
      gap={0}
      title="Skills"
      loading={loading}
      entries={entries}
      noEntriesText="No skills available."
      renderEntry={(skill) => (
        <WithRemoveEntryButton removeEntry={() => removeEntry(skill._id)}>
          <SkillEntry
            cvId={cvId}
            key={skill._id}
            entry={skill}
            updateField={updateField}
          />
        </WithRemoveEntryButton>
      )}
      onAdd={handleAddEntry}
    />
  );
};
