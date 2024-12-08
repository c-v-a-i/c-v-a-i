import { z } from 'zod';

export const validationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  position: z.string().min(1, 'Position is required'),
  duration: z.string().optional(),
  location: z.string().optional(),
  type: z.string().optional(),
  description: z.string().optional(),
  skills: z.array(z.string()).optional(),
});
