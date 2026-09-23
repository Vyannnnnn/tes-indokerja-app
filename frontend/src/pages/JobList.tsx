import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/axios";
import { Job } from "../types";

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await api.get("/jobs", { params: { search: q } });
    setJobs(data.data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Lowongan Pekerjaan</h1>
      <div className="flex gap-2">
        <input
          className="input"
          placeholder="Cari judul atau perusahaan..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button className="btn btn-primary" onClick={load}>
          Cari
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : jobs.length === 0 ? (
        <p className="text-gray-500">Belum ada lowongan.</p>
      ) : (
        <div className="space-y-3">
          {jobs.map((j) => (
            <Link
              to={`/jobs/${j.id}`}
              key={j.id}
              className="card block hover:shadow-md"
            >
              <h2 className="font-semibold text-lg">{j.title}</h2>
              <p className="text-sm text-gray-600">
                {j.company} • {j.location}
              </p>
              <div className="flex gap-2 mt-2 text-xs">
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  {j.jobType}
                </span>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                  {j.salary}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
