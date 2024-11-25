import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ContactInfoService } from './contact-info.service';
import { Logger, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/gql-auth/gql-auth.guard';
import { ContactInfo } from '@server/entities';
import { DecodedUserObjectType } from '../../auth/dto';
import { CurrentUser } from '../../common/decorators';
import { GetContactInfoEntriesByCvArgsType, UpdateContactInfoEntryArgsType } from './dto';

@UseGuards(GqlAuthGuard)
@Resolver()
export class ContactInfoResolver {
  private readonly logger = new Logger(ContactInfoResolver.name);
  constructor(private readonly contactInfoService: ContactInfoService) {}

  @Query(() => ContactInfo)
  async getContactInfo(
    @CurrentUser() { client_id }: DecodedUserObjectType,
    @Args() { cvId }: GetContactInfoEntriesByCvArgsType
  ): Promise<ContactInfo> {
    return this.contactInfoService.findOne(
      {
        searchParams: { cvId },
      },
      client_id
    );
  }

  @Mutation(() => Boolean)
  async updateContactInfo(
    @CurrentUser() { client_id }: DecodedUserObjectType,
    @Args() data: UpdateContactInfoEntryArgsType
  ): Promise<boolean> {
    await this.contactInfoService.update({ data }, client_id);
    return true;
  }
}
