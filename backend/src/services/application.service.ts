import prisma from "../config/prisma";
import { ApplicationStatus } from "@prisma/client";

export const applyJob = async (userId: string, jobId: string) => {
  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job) throw { status: 404, message: "Job not found" };

  const existing = await prisma.application.findUnique({
    where: { jobId_userId: { jobId, userId } },
  });
  if (existing)
    throw { status: 409, message: "You already applied to this job" };

  return prisma.application.create({
    data: {
      jobId,
      userId,
      status: ApplicationStatus.APPLIED,
      histories: {
        create: {
          status: ApplicationStatus.APPLIED,
          note: "Application submitted",
        },
      },
    },
  });
};

export const myApplications = async (userId: string) => {
  return prisma.application.findMany({
    where: { userId },
    include: {
      job: true,
      histories: { orderBy: { changedAt: "asc" } },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const applicantsByJob = async (companyId: string, jobId: string) => {
  const job = await prisma.job.findFirst({ where: { id: jobId, companyId } });
  if (!job) throw { status: 404, message: "Job not found or not yours" };

  return prisma.application.findMany({
    where: { jobId },
    include: {
      user: { select: { id: true, name: true, email: true } },
      histories: { orderBy: { changedAt: "asc" } },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const updateStatus = async (
  companyId: string,
  applicationId: string,
  status: ApplicationStatus,
  note?: string,
) => {
  const app = await prisma.application.findUnique({
    where: { id: applicationId },
    include: { job: true },
  });
  if (!app) throw { status: 404, message: "Application not found" };
  if (app.job.companyId !== companyId)
    throw { status: 403, message: "Forbidden" };

  return prisma.application.update({
    where: { id: applicationId },
    data: {
      status,
      histories: {
        create: { status, note: note || `Status changed to ${status}` },
      },
    },
    include: { histories: { orderBy: { changedAt: "asc" } } },
  });
};
