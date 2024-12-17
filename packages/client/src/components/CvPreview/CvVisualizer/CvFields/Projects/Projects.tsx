import React from 'react';
import { ProjectEntry } from './ProjectEntry';
import { useCvEntries } from '../../../EntriesSection';
import type { CvEntryComponentProps } from '../../types';
import type { Project as ProjectGraphqlType } from '../../../../../generated/graphql';
import { useGetCvQuery } from '../../../../../generated/graphql';
import { refetchGetProjectEntriesQuery } from '../../../../../generated/graphql';
import { GenericEntriesSection } from '../../../EntriesSection/GenericEntriesSection';

export const Projects: React.FC<CvEntryComponentProps> = ({ cvId }) => {
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

  const renderEntry = (project: ProjectGraphqlType) => (
    <ProjectEntry
      cvId={cvId}
      key={project._id}
      entry={project}
      updateField={updateField}
      removeEntry={() => removeEntry(project._id)}
    />
  );

  return (
    <GenericEntriesSection<ProjectGraphqlType>
      title="Projects"
      loading={loading}
      entries={entries}
      noEntriesText="No project entries."
      renderEntry={renderEntry}
      onAdd={handleAddEntry}
    />
  );
};
