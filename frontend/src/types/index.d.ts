export type Role = "JOB_SEEKER" | "COMPANY";
export type JobType =
  | "FULL_TIME"
  | "PART_TIME"
  | "CONTRACT"
  | "INTERNSHIP"
  | "FREELANCE";
export type ApplicationStatus =
  | "APPLIED"
  | "REVIEWING"
  | "SHORTLISTED"
  | "REJECTED"
  | "ACCEPTED";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
}
export interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  salary: string;
  jobType: JobType;
  createdAt: string;
  _count?: { applications: number };
}
export interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: ApplicationStatus;
  createdAt: string;
  job: Job;
  user?: User;
  histories: {
    id: string;
    status: ApplicationStatus;
    note?: string;
    changedAt: string;
  }[];
}

interface AuthCtx {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
}