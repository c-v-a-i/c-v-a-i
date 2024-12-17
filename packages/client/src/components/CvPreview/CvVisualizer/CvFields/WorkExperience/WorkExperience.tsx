import React from 'react';
import { WorkExperienceEntry } from './WorkExperienceEntry';
import { useCvEntries } from '../../../EntriesSection';
import type { CvEntryComponentProps } from '../../types';
import type { WorkExperience as WorkExperienceGraphqlType } from '../../../../../generated/graphql';
import { useGetCvQuery } from '../../../../../generated/graphql';
import { refetchGetWorkExperienceEntriesQuery } from '../../../../../generated/graphql';
import { GenericEntriesSection } from '../../../EntriesSection/GenericEntriesSection';

export const WorkExperience: React.FC<CvEntryComponentProps> = ({ cvId }) => {
  const useGetEntriesQueryResult = useGetCvQuery({
    variables: { cvId },
  });
  const { entries, loading, updateField, removeEntry, handleAddEntry } =
    useCvEntries({
      cvId,
      useGetEntriesQueryResult,
      entryFieldName: 'workExperienceEntries',
      refetchQueries: [refetchGetWorkExperienceEntriesQuery({ cvId })],
    });

  const renderEntry = (we: WorkExperienceGraphqlType) => (
    <WorkExperienceEntry
      cvId={cvId}
      key={we._id}
      entry={we}
      updateField={updateField}
      removeEntry={() => removeEntry(we._id)}
    />
  );

  return (
    <GenericEntriesSection<WorkExperienceGraphqlType>
      title="Work Experience"
      loading={loading}
      entries={entries}
      noEntriesText="No work experience entries."
      renderEntry={renderEntry}
      onAdd={handleAddEntry}
    />
  );
};
