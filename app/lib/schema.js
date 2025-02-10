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
    .min(10, { message: 'Bio must be at least 10 characters' })
    .max(500, { message: 'Bio cannot exceed 500 characters' }),

  experience: z
    .preprocess((val) => Number(val), z
      .number({ invalid_type_error: 'Experience must be a number' })
      .min(0, { message: 'Experience must be at least 0 years' })
      .max(50, { message: 'Experience cannot exceed 50 years' })
    ),

  skills: z
    .string()
    .min(1, { message: 'At least one skill is required' })
    .transform((val) =>
      val
        ? val
            .split(',')
            .map((skill) => skill.trim())
            .filter(Boolean)
        : []
    ),
});
