// TODO: delete this. Unused
import { registerEnumType } from '@nestjs/graphql';

enum CvEntryType {
  WORK_EXPERIENCE = 'WORK_EXPERIENCE',
  PROJECT = 'PROJECT',
  EDUCATION = 'EDUCATION',
  SKILL = 'SKILL',
}

registerEnumType(CvEntryType, {
  name: 'CvEntryType',
});

export default CvEntryType;
