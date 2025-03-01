import { Module } from '@nestjs/common';
import { LlmCommunicationService } from './llm-communication.service';
import { ConfigModule } from '@nestjs/config';
import { llmServiceConfig } from '../../auth/config/llmServiceConfig';

@Module({
  imports: [ConfigModule.forFeature(llmServiceConfig)],
  providers: [LlmCommunicationService],
  exports: [LlmCommunicationService],
})
export class LlmCommunicationModule {}
