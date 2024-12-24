import { registerAs } from '@nestjs/config';

export const openaiConfig = registerAs(
  'openaiConfig',
  (): { openaiApiKey: string } => ({
    openaiApiKey: process.env.OPENAI_API_KEY ?? '',
  })
);
