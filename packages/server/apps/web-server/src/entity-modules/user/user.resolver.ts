import { Query, Resolver } from '@nestjs/graphql';
import { User } from '@server/entities';
import { DataloaderService } from '../../core/dataloader/dataloader.service';
import { UserService } from './user.service';
import { DecodedUserObjectType } from '../../auth/dto';
import { CurrentUser } from '../../common/decorators';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/gql-auth/gql-auth.guard';

// TODO: create and add GqlAuthGuard
// it should use google auth
@UseGuards(GqlAuthGuard)
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService, private readonly dataloaderService: DataloaderService) {}

  @Query(() => User)
  public async currentUser(@CurrentUser() { client_id: id }: DecodedUserObjectType) {
    return this.userService.findOneBy({ id });
  }
}
