import { z } from 'zod';
import { createCreateCvParamsSchema } from '../cv/create-cv-params';

export const reviewCvResponseFormat = z.object({
  messages: z
    .array(z.string())
    .describe(
      'array with logically separated parts of the text review response with their content. it should not include any reasoning in it'
    ),
});
export type ReviewCvResponseFormat = z.infer<typeof reviewCvResponseFormat>;

export const convertPdfToCvResponseFormat = z.object({
  createdCv: createCreateCvParamsSchema.optional(),
  comment: z.string(),
});
export type CreateCvOutputSchema = z.infer<typeof convertPdfToCvResponseFormat>;

export const transformCvResponseFormat = z.object({
  comment: z.string(),
  cv: createCreateCvParamsSchema,
});
export type TransformCvResponseFormat = z.infer<
  typeof transformCvResponseFormat
>;
