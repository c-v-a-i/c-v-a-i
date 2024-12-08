import { InputType, PickType } from '@nestjs/graphql';
import { WorkExperience } from '@server/entities';

@InputType()
export class WorkExperienceInputType extends PickType(
  WorkExperience,
  ['name', 'position', 'duration', 'location', 'type', 'description', 'skills'],
  InputType
) {}
