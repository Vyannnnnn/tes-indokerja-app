import { Response, NextFunction } from "express";
import * as appService from "../services/application.service";
import { AuthRequest } from "../types/auth";
import { ok, created } from "../utils/response";
import { ApplicationStatus } from "@prisma/client";

export const apply = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    created(res, await appService.applyJob(req.user!.id, req.body.jobId));
  } catch (e) {
    next(e);
  }
};

export const myApps = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    ok(res, await appService.myApplications(req.user!.id));
  } catch (e) {
    next(e);
  }
};

export const applicants = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    ok(
      res,
      await appService.applicantsByJob(
        req.user!.id,
        req.params.jobId as string,
      ),
    );
  } catch (e) {
    next(e);
  }
};

export const updateStatus = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { status, note } = req.body;
    ok(
      res,
      await appService.updateStatus(
        req.user!.id,
        req.params.id as string,
        status as ApplicationStatus,
        note,
      ),
    );
  } catch (e) {
    next(e);
  }
};
