import { registerEnumType } from '@nestjs/graphql';

enum CvEntryType {
  WORK_EXPERIENCE = 'WORK_EXPERIENCE',
  PROJECT = 'PROJECT',
  EDUCATION = 'EDUCATION',
  SKILL = 'SKILL',
  CONTACT_INFO = 'CONTACT_INFO',
}

registerEnumType(CvEntryType, {
  name: 'CvEntryType',
});

export default CvEntryType;
