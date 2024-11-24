import { Module } from '@nestjs/common';
import { EducationResolver } from './education.resolver';
import { EducationService } from './education.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Education } from '@server/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Education])],
  providers: [EducationResolver, EducationService],
})
export class EducationModule {}
