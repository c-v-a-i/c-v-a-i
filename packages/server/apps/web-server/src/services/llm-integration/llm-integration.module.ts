import { Module } from '@nestjs/common';
import { LlmIntegrationResolver } from './llm-integration.resolver';
import { LlmIntegrationService } from './llm-integration.service';
import { CvModule } from '../cv/cv.module';
import { ConfigModule } from '@nestjs/config';
import { llmServiceConfig } from '../../auth/config/llmServiceConfig';
import { HttpModule } from '@nestjs/axios';
import { LlmCommunicationModule } from '../llm-communication/llm-communication.module';

@Module({
  imports: [
    HttpModule,
    CvModule,
    ConfigModule.forFeature(llmServiceConfig),
    LlmCommunicationModule,
  ],
  providers: [LlmIntegrationResolver, LlmIntegrationService],
  exports: [LlmIntegrationService],
})
export class LlmIntegrationModule {}
