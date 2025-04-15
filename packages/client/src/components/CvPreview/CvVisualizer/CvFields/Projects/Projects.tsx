import React from 'react';
import { ProjectEntry } from './ProjectEntry';
import {
  GenericEntriesSection,
  useCvEntries,
  WithRemoveEntryButton,
} from '../../../components';
import type { CvEntryComponentProps } from '../../types';
import type { Project as ProjectGraphqlType } from '../../../../../generated/graphql';
import {
  refetchGetProjectEntriesQuery,
  useGetCvQuery,
} from '../../../../../generated/graphql';

export const Projects = ({ cvId }: CvEntryComponentProps) => {
  const useGetEntriesQueryResult = useGetCvQuery({
    variables: { cvId },
  });
  const { entries, loading, updateField, removeEntry, handleAddEntry } =
    useCvEntries({
      cvId,
      useGetEntriesQueryResult,
      entryFieldName: 'projectEntries',
      refetchQueries: [refetchGetProjectEntriesQuery({ cvId })],
    });

  return (
    <GenericEntriesSection<ProjectGraphqlType>
      title="Projects"
      loading={loading}
      entries={entries}
      noEntriesText="No project entries."
      renderEntry={(project) => (
        <WithRemoveEntryButton
          removeEntry={() => removeEntry(project._id)}
          key={project._id}
        >
          <ProjectEntry
            cvId={cvId}
            entry={project}
            updateField={updateField}
          />
        </WithRemoveEntryButton>
      )}
      onAdd={handleAddEntry}
    />
  );
};
