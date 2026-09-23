import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { fail } from '../utils/response';

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);

  if (err instanceof ZodError)
    return fail(res, 400, 'Validation error', err.issues);

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') return fail(res, 409, 'Duplicate entry');
    if (err.code === 'P2025') return fail(res, 404, 'Data not found');
  }

  return fail(res, err.status || 500, err.message || 'Internal Server Error');
};