import { Module } from '@nestjs/common';
import { LlmIntegrationResolver } from './llm-integration.resolver';
import { LlmIntegrationService } from './llm-integration.service';
import { CvModule } from '../cv/cv.module';
import { ConfigModule } from '@nestjs/config';
import { openaiConfig } from '../../auth/config/openai.config';

@Module({
  imports: [CvModule, ConfigModule.forFeature(openaiConfig)],
  providers: [LlmIntegrationResolver, LlmIntegrationService],
  exports: [LlmIntegrationService],
})
export class LlmIntegrationModule {}
