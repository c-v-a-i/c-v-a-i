import React from 'react';
import { SkillEntry } from './SkillEntry';
import { useCvEntries, GenericEntriesSection } from '../../../components';
import type { CvEntryComponentProps } from '../../types';
import type { Skill as SkillGraphqlType } from '../../../../../generated/graphql';
import { useGetCvQuery } from '../../../../../generated/graphql';
import { refetchGetSkillEntriesQuery } from '../../../../../generated/graphql';

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

  const renderEntry = (skill: SkillGraphqlType) => (
    <SkillEntry
      cvId={cvId}
      key={skill._id}
      entry={skill}
      updateField={updateField}
      removeEntry={() => removeEntry(skill._id)}
    />
  );

  return (
    <GenericEntriesSection<SkillGraphqlType>
      title="Skills"
      titleStyles={{
        textAlign: 'right',
        width: '100%',
      }}
      loading={loading}
      entries={entries}
      noEntriesText="No skills available."
      renderEntry={renderEntry}
      onAdd={handleAddEntry}
    />
  );
};
