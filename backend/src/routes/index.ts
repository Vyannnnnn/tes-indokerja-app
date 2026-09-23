import { Router } from "express";
import * as authCtrl from "../controllers/auth.controller";
import * as jobCtrl from "../controllers/job.controller";
import * as appCtrl from "../controllers/application.controller";
import { authenticate, authorize } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import {
  registerSchema,
  loginSchema,
  jobSchema,
  applySchema,
  statusSchema,
} from "../validators/schema";

const router = Router();

// Auth
router.post("/auth/register", validate(registerSchema), authCtrl.register);
router.post("/auth/login", validate(loginSchema), authCtrl.login);

// Jobs
router.get("/jobs", authenticate, jobCtrl.list);
router.get("/jobs/:id", authenticate, jobCtrl.detail);
router.post(
  "/jobs",
  authenticate,
  authorize("COMPANY"),
  validate(jobSchema),
  jobCtrl.create,
);
router.get(
  "/jobs/company/mine",
  authenticate,
  authorize("COMPANY"),
  jobCtrl.mine,
);

// Applications
router.post(
  "/applications",
  authenticate,
  authorize("JOB_SEEKER"),
  validate(applySchema),
  appCtrl.apply,
);
router.get(
  "/applications/me",
  authenticate,
  authorize("JOB_SEEKER"),
  appCtrl.myApps,
);
router.get(
  "/jobs/:jobId/applicants",
  authenticate,
  authorize("COMPANY"),
  appCtrl.applicants,
);
router.patch(
  "/applications/:id/status",
  authenticate,
  authorize("COMPANY"),
  validate(statusSchema),
  appCtrl.updateStatus,
);

export default router;
