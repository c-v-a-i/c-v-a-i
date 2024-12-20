import React from 'react';
import type { CvEntryComponentProps } from '../../types';
import type { Education as EducationGraphqlType } from '../../../../../generated/graphql';
import {
  useGetCvQuery,
  refetchGetEducationEntriesQuery,
} from '../../../../../generated/graphql';
import { EducationEntry } from './EducationEntry';
import { GenericEntriesSection, useCvEntries } from '../../../components';

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

  const renderEntry = (ed: EducationGraphqlType) => (
    <EducationEntry
      key={ed._id}
      cvId={cvId}
      entry={ed}
      updateField={updateField}
      removeEntry={() => removeEntry(ed._id)}
    />
  );

  return (
    <GenericEntriesSection<EducationGraphqlType>
      title="Education"
      titleStyles={{
        textAlign: 'right',
        width: '100%',
      }}
      loading={loading}
      entries={entries}
      noEntriesText="No education entries available."
      renderEntry={renderEntry}
      onAdd={handleAddEntry}
    />
  );
};
