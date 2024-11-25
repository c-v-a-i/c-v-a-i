import { Module } from '@nestjs/common';
import { ContactInfoResolver } from './contact-info.resolver';
import { ContactInfoService } from './contact-info.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactInfo } from '@server/entities';

@Module({
  imports: [TypeOrmModule.forFeature([ContactInfo])],
  providers: [ContactInfoResolver, ContactInfoService],
})
export class ContactInfoModule {}
