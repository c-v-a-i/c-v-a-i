import { createUnionType } from '@nestjs/graphql';
import {
  Education,
  Project,
  Skill,
  WorkExperience,
} from '../../../../../../libs/schemas';

export const CvEntryUnion = createUnionType({
  name: 'CvEntryUnion',
  types: () => [Education, WorkExperience, Project, Skill] as const,
  // resolveType(value) {
  //   // FIXME: results in just a plain object not belonging to any class
  //   console.log('resolveType: value', JSON.stringify(value));
  //   if (value instanceof Education) {
  //     return Education;
  //   }
  //   if (value instanceof WorkExperience) {
  //     return WorkExperience;
  //   }
  //   if (value instanceof Project) {
  //     return Project;
  //   }
  //   if (value instanceof Skill) {
  //     return Skill;
  //   }
  //   return null;
  // },
});
