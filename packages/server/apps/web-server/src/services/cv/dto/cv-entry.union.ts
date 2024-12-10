import { createUnionType } from '@nestjs/graphql';
import { AboutMe, ContactInfo, Education, Project, Skill, WorkExperience } from '../cv.schema';

export const CvEntryUnion = createUnionType({
  name: 'CvEntryUnion',
  types: () => [AboutMe, ContactInfo, Education, WorkExperience, Project, Skill] as const,
});
