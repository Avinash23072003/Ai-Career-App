import { z } from 'zod';

export const onboardingSchema = z.object({
  industry: z
    .string({
      required_error: 'Please select an industry',
    })
    .min(1, { message: 'Industry cannot be empty' }),
  subIndustry: z
    .string({
      required_error: 'Please select a specialization',
    })
    .min(1, { message: 'Specialization cannot be empty' }),
  bio: z
    .string()
    .max(500, { message: 'Bio cannot exceed 500 characters' })
    .optional()
    .default(''),
  experience: z
    .string()
    .transform((val) => {
      const parsed = parseInt(val, 10);
      if (isNaN(parsed)) {
        return 0; // Default value or handle as needed
      }
      return parsed;
    })
    .refine((val) => val >= 0 && val <= 50, {
      message: 'Experience must be between 0 and 50 years',
    }),
  skills: z
    .string()
    .optional()
    .transform((val) =>
      val
        ? val
            .split(',')
            .map((skill) => skill.trim())
            .filter(Boolean)
        : []
    ),
});
