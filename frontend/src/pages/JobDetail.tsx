import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import { Job } from "../types";

export default function JobDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [msg, setMsg] = useState("");
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    api.get(`/jobs/${id}`).then(({ data }) => setJob(data.data));
  }, [id]);

  const apply = async () => {
    try {
      await api.post("/applications", { jobId: id });
      setApplied(true);
      setMsg("Berhasil melamar!");
    } catch (e: any) {
      setMsg(e.response?.data?.message || "Gagal melamar");
    }
  };

  if (!job) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button onClick={() => nav(-1)} className="text-blue-600 mb-4">
        ← Kembali
      </button>
      <div className="card space-y-3">
        <h1 className="text-2xl font-bold">{job.title}</h1>
        <p className="text-gray-600">
          {job.company} • {job.location}
        </p>
        <div className="flex gap-2 text-xs">
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
            {job.jobType}
          </span>
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
            {job.salary}
          </span>
        </div>
        <p className="whitespace-pre-line">{job.description}</p>
        {msg && <p className="text-sm text-blue-600">{msg}</p>}
        <button onClick={apply} disabled={applied} className="btn btn-primary">
          {applied ? "Sudah Dilamar" : "Apply Job"}
        </button>
      </div>
    </div>
  );
}
