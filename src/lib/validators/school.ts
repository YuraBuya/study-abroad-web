import { z } from 'zod';

export const schoolSchema = z.object({
  name: z.string().min(2, 'School name must be at least 2 characters'),
  nameKorean: z.string().optional(),
  location: z.string().min(3, 'Location must be at least 3 characters'),
  type: z.enum(['UNIVERSITY', 'LANGUAGE_INSTITUTE', 'GRADUATE_SCHOOL']),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  phone: z.string().optional(),
  description: z.string().optional(),
  logo: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  coverImage: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  tags: z.array(z.string()).optional(),
  status: z.enum(['active', 'inactive']).default('active'),
});

export type SchoolFormData = z.infer<typeof schoolSchema>;