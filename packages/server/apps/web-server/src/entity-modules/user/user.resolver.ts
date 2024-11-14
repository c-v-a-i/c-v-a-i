import { Resolver } from '@nestjs/graphql';
import { User } from '@server/entities';
import { DataloaderService } from '../../core/dataloader/dataloader.service';
import { UserService } from './user.service';

// TODO: create and add GqlAuthGuard
// it should use google auth
// @UseGuards(GqlAuthGuard)
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService, private readonly dataloaderService: DataloaderService) {}

  // @Query(() => User)
  // public async currentUser(
  //   @CurrentUser() { scope: { currentUserId } }: DecodedUserObjectType,
  // ) {
  //   return this.userService.getById({ userId: currentUserId });
  // }
}
