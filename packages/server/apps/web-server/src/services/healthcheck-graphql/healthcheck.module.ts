import { Module } from '@nestjs/common';
import { HealthCheckGraphQLResolver } from './healthcheck.resolver';

@Module({
  imports: [],
  providers: [HealthCheckGraphQLResolver],
  exports: [],
})
export class HealthCheckGraphQLModule {}
