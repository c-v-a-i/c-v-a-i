import { Module } from '@nestjs/common';
import { SkillResolver } from './skill.resolver';
import { SkillService } from './skill.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from '@server/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Skill])],
  providers: [SkillResolver, SkillService],
})
export class SkillModule {}
