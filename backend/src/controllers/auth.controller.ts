import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";
import { ok, created } from "../utils/response";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    created(res, await authService.register(req.body));
  } catch (e) {
    next(e);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    ok(res, await authService.login(req.body.email, req.body.password));
  } catch (e) {
    next(e);
  }
};
