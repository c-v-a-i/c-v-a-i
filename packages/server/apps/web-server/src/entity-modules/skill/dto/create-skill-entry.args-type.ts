import { ArgsType, PickType } from '@nestjs/graphql';
import { Skill } from '@server/entities';

@ArgsType()
export class CreateSkillEntryArgsType extends PickType(Skill, ['category', 'items', 'cvId'], ArgsType) {}
