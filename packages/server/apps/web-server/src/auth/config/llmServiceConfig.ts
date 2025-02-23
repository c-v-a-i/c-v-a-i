import { registerAs } from '@nestjs/config';

export const llmServiceConfig = registerAs('llmServiceConfig', () => ({
  openaiApiKey: process.env.OPENAI_API_KEY ?? '',
  pdfServiceUrl: process.env.PDF_SERVICE_URL ?? '',
}));
