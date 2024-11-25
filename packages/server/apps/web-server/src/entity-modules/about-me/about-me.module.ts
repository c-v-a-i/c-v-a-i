import { Module } from '@nestjs/common';
import { AboutMeResolver } from './about-me.resolver';
import { AboutMeService } from './about-me.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutMe } from '@server/entities/cv-entity/about-me.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AboutMe])],
  providers: [AboutMeResolver, AboutMeService],
})
export class AboutMeModule {}
