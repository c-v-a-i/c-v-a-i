import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { ExampleService } from './example.service';
import { DecodedUserObjectType } from '../../auth/dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators';

@Resolver()
export class ExampleResolver {
  constructor(private readonly exampleService: ExampleService) {}

  @Query(() => String)
  @UseGuards(JwtAuthGuard)
  async protectedData(@CurrentUser() user: DecodedUserObjectType) {
    // You can access user information here
    return `This is protected data for user ${user.email}`;
  }

  @Query(() => String)
  async publicData() {
    return 'This is public data';
  }
}
