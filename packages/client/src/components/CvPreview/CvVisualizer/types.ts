import type { GetWorkExperienceEntriesQuery } from '../../../generated/graphql';

export type CvEntryComponentProps = {
  cvId: string;
};

export type WorkExperienceEntry = GetWorkExperienceEntriesQuery['getWorkExperienceEntries'][number];
