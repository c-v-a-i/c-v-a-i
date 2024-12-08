import { createUnionType } from '@nestjs/graphql';
import { WorkExperience, Project, Education } from '@server/entities';

export const CvEntryUnion = createUnionType({
  name: 'CvEntryUnion',
  types: () => [WorkExperience, Project, Education] as const,
  resolveType(value) {
    if (value instanceof WorkExperience) return WorkExperience;
    if (value instanceof Project) return Project;
    if (value instanceof Education) return Education;
    return null;
  },
});
