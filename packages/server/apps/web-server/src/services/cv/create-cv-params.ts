import { z } from 'zod';

export const createPositionIndexSchema = z.number();

export const createAboutMeSchema = z.object({
  fieldName: z.string(),
  description: z.string(),
});

export const createEducationSchema = z.object({
  name: z.string(),
  degree: z.string(),
  duration: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  skills: z.array(z.string()).nullable().optional(),
  location: z.string().nullable().optional(),
  positionIndex: createPositionIndexSchema,
});

export const createWorkExperienceSchema = z.object({
  position: z.string(),
  name: z.string(),
  type: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  duration: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  skills: z.array(z.string()).nullable().optional(),
  positionIndex: createPositionIndexSchema,
});

export const createProjectSchema = z.object({
  name: z.string(),
  description: z.string().nullable().optional(),
  skills: z.array(z.string()).nullable().optional(),
  positionIndex: createPositionIndexSchema,
});

export const createSkillSchema = z.object({
  category: z.string(),
  skills: z.array(z.string()),
  positionIndex: createPositionIndexSchema,
});

export const createContactInfoSchema = z.object({
  linkName: z.string(),
  link: z.string(),
  positionIndex: createPositionIndexSchema,
});

export const createCreateCvParamsSchema = z.object({
  title: z.string(),
  name: z.string(),
  aboutMe: createAboutMeSchema.nullable().optional(),
  educationEntries: z.array(createEducationSchema).nullable().optional(),
  workExperienceEntries: z
    .array(createWorkExperienceSchema)
    .nullable()
    .optional(),
  projectEntries: z.array(createProjectSchema).nullable().optional(),
  skillEntries: z.array(createSkillSchema).nullable().optional(),
  contactInfoEntries: z.array(createContactInfoSchema).nullable().optional(),
});

export type CreateCvParams = z.infer<typeof createCreateCvParamsSchema>;
