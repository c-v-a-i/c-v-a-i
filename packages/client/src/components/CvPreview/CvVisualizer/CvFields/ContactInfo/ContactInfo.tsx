import React from 'react';
import { ContactInfoEntry } from './ContactInfoEntry';
import type { CvEntryComponentProps } from '../../types';
import type { ContactInfo as ContactInfoGraphqlType } from '../../../../../generated/graphql';
import {
  refetchGetContactInfoEntriesQuery,
  useGetCvQuery,
} from '../../../../../generated/graphql';
import { GenericEntriesSection, useCvEntries } from '../../../components';

export const ContactInfo = ({ cvId }: CvEntryComponentProps) => {
  const useGetEntriesQueryResult = useGetCvQuery({
    variables: { cvId },
  });
  const { entries, loading, updateField, removeEntry, handleAddEntry } =
    useCvEntries({
      cvId,
      useGetEntriesQueryResult,
      entryFieldName: 'contactInfoEntries',
      refetchQueries: [refetchGetContactInfoEntriesQuery({ cvId })],
    });

  return (
    <GenericEntriesSection<ContactInfoGraphqlType>
      flexDirection="row"
      loading={loading}
      entries={entries}
      noEntriesText="No contact info entries available."
      renderEntry={(contactInfo) => (
        <ContactInfoEntry
          cvId={cvId}
          key={contactInfo._id}
          entry={contactInfo}
          updateField={updateField}
          removeEntry={() => removeEntry(contactInfo._id)}
        />
      )}
      onAdd={handleAddEntry}
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
      }}
    />
  );
};
