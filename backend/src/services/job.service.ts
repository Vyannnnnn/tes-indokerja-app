import prisma from "../config/prisma";

export const listJobs = async (search?: string) => {
  return prisma.job.findMany({
    where: search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { company: { contains: search, mode: "insensitive" } },
          ],
        }
      : undefined,
    orderBy: { createdAt: "desc" },
  });
};

export const getJobDetail = async (id: string) => {
  const job = await prisma.job.findUnique({
    where: { id },
    include: { companyUser: { select: { id: true, name: true, email: true } } },
  });
  if (!job) throw { status: 404, message: "Job not found" };
  return job;
};

export const createJob = async (companyId: string, data: any) => {
  return prisma.job.create({ data: { ...data, companyId } });
};

export const listMyJobs = async (companyId: string) => {
  return prisma.job.findMany({
    where: { companyId },
    include: { _count: { select: { applications: true } } },
    orderBy: { createdAt: "desc" },
  });
};
