import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/axios";
import { Job } from "../../types";

export default function MyJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  useEffect(() => {
    api.get("/jobs/company/mine").then(({ data }) => setJobs(data.data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Lowongan Saya</h1>
        <Link to="/company/jobs/new" className="btn btn-primary">
          + Post Job
        </Link>
      </div>
      {jobs.map((j) => (
        <div key={j.id} className="card flex justify-between items-center">
          <div>
            <h2 className="font-semibold">{j.title}</h2>
            <p className="text-sm text-gray-600">
              {j.location} • {j.salary}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {j._count?.applications ?? 0} pelamar
            </p>
          </div>
          <Link
            to={`/company/jobs/${j.id}/applicants`}
            className="btn btn-secondary"
          >
            Lihat Pelamar
          </Link>
        </div>
      ))}
    </div>
  );
}
