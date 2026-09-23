import { Response, NextFunction } from "express";
import * as jobService from "../services/job.service";
import { AuthRequest } from "../types/auth";
import { ok, created } from "../utils/response";

export const list = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    ok(res, await jobService.listJobs(req.query.search as string));
  } catch (e) {
    next(e);
  }
};

export const detail = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    ok(res, await jobService.getJobDetail(req.params.id as string));
  } catch (e) {
    next(e);
  }
};

export const create = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    created(res, await jobService.createJob(req.user!.id, req.body));
  } catch (e) {
    next(e);
  }
};

export const mine = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    ok(res, await jobService.listMyJobs(req.user!.id));
  } catch (e) {
    next(e);
  }
};
