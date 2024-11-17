import { Query } from '@nestjs/graphql';

export class HealthCheckGraphQLResolver {
  constructor() {}

  @Query(() => String)
  public async healthCheck(): Promise<string> {
    return 'hello';
  }
}
