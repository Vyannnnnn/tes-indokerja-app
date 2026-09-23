import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().min(6),
    name: z.string().min(2),
    role: z.enum(['JOB_SEEKER', 'COMPANY']),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().min(6),
  }),
});

export const jobSchema = z.object({
  body: z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    company: z.string().min(2),
    location: z.string().min(2),
    salary: z.string().min(1),
    jobType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'FREELANCE']),
  }),
});

export const applySchema = z.object({
  body: z.object({ jobId: z.uuid() }),
});

export const statusSchema = z.object({
  body: z.object({
    status: z.enum(['APPLIED', 'REVIEWING', 'SHORTLISTED', 'REJECTED', 'ACCEPTED']),
    note: z.string().optional(),
  }),
});