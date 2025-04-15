import React from 'react';
import type { CvEntryComponentProps } from '../../types';
import type { Education as EducationGraphqlType } from '../../../../../generated/graphql';
import {
  refetchGetEducationEntriesQuery,
  useGetCvQuery,
} from '../../../../../generated/graphql';
import { EducationEntry } from './EducationEntry';
import {
  GenericEntriesSection,
  useCvEntries,
  WithRemoveEntryButton,
} from '../../../components';

export const Education: React.FC<CvEntryComponentProps> = ({ cvId }) => {
  const useGetEntriesQueryResult = useGetCvQuery({
    variables: { cvId },
  });

  const { entries, loading, updateField, removeEntry, handleAddEntry } =
    useCvEntries({
      cvId,
      useGetEntriesQueryResult,
      entryFieldName: 'educationEntries',
      refetchQueries: [refetchGetEducationEntriesQuery({ cvId })],
    });

  return (
    <GenericEntriesSection<EducationGraphqlType>
      title="Education"
      loading={loading}
      entries={entries}
      noEntriesText="No education entries available."
      renderEntry={(entry) => (
        <WithRemoveEntryButton removeEntry={() => removeEntry(entry._id)}>
          <EducationEntry
            key={entry._id}
            cvId={cvId}
            entry={entry}
            updateField={updateField}
            removeEntry={() => removeEntry(entry._id)}
          />
        </WithRemoveEntryButton>
      )}
      onAdd={handleAddEntry}
    />
  );
};
