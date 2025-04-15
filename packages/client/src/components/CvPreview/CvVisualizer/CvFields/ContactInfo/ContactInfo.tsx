import React from 'react';
import { ContactInfoEntry } from './ContactInfoEntry';
import type { CvEntryComponentProps } from '../../types';
import type { ContactInfo as ContactInfoGraphqlType } from '../../../../../generated/graphql';
import {
  refetchGetContactInfoEntriesQuery,
  useGetCvQuery,
} from '../../../../../generated/graphql';
import {
  GenericEntriesSection,
  useCvEntries,
  WithRemoveEntryButton,
} from '../../../components';

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
        <WithRemoveEntryButton
          removeEntry={() => removeEntry(contactInfo._id)}
          key={contactInfo._id}
        >
          <ContactInfoEntry
            cvId={cvId}
            entry={contactInfo}
            updateField={updateField}
          />
        </WithRemoveEntryButton>
      )}
      onAdd={handleAddEntry}
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
      }}
    />
  );
};
