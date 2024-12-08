import { ArgsType, PickType } from '@nestjs/graphql';
import { WorkExperience } from '@server/entities';

@ArgsType()
export class CreateWorkExperienceEntryArgsType extends PickType(
  WorkExperience,
  ['name', 'position', 'duration', 'location', 'type', 'description', 'skills', 'cvId'],
  ArgsType
) {}
