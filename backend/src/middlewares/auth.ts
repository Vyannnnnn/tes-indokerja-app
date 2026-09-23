import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { fail } from '../utils/response';

import { AuthRequest } from '../types/auth';

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return fail(res, 401, 'Unauthorized');
  try {
    req.user = verifyToken(header.slice('Bearer '.length));
    next();
  } catch {
    return fail(res, 401, 'Invalid or expired token');
  }
};

export const authorize = (...roles: string[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role))
      return fail(res, 403, 'Forbidden');
    next();
  };