import React from 'react';
import { ContactInfoEntry } from './ContactInfoEntry';
import type { CvEntryComponentProps } from '../../types';
import type { ContactInfo as ContactInfoGraphqlType } from '../../../../../generated/graphql';
import { useGetCvQuery } from '../../../../../generated/graphql';
import { refetchGetContactInfoEntriesQuery } from '../../../../../generated/graphql';
import { GenericEntriesSection, useCvEntries } from '../../../components';

export const ContactInfo: React.FC<CvEntryComponentProps> = ({ cvId }) => {
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

  const renderEntry = (contactInfo: ContactInfoGraphqlType) => (
    <ContactInfoEntry
      cvId={cvId}
      key={contactInfo._id}
      entry={contactInfo}
      updateField={updateField}
      removeEntry={() => removeEntry(contactInfo._id)}
    />
  );

  return (
    <GenericEntriesSection<ContactInfoGraphqlType>
      title="Links"
      titleStyles={{
        textAlign: 'right',
        width: '100%',
      }}
      loading={loading}
      entries={entries}
      noEntriesText="No contact info entries available."
      renderEntry={renderEntry}
      onAdd={handleAddEntry}
    />
  );
};
