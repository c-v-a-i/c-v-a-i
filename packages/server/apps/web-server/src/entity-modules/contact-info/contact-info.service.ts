import { Injectable } from '@nestjs/common';
import { ContactInfo } from '@server/entities';
import { CrudService } from '@server/common/services/crud-service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ContactInfoService extends CrudService<ContactInfo> {
  constructor(
    @InjectRepository(ContactInfo)
    private readonly contactInfoRepository: Repository<ContactInfo>
  ) {
    super(
      ContactInfo.name,
      {
        updatedAt: 'DESC',
      },
      contactInfoRepository,
      'userId'
    );
  }
}
