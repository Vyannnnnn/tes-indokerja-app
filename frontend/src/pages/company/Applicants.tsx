import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/axios";
import { Application, ApplicationStatus } from "../../types";

const STATUSES: ApplicationStatus[] = [
  "APPLIED",
  "REVIEWING",
  "SHORTLISTED",
  "REJECTED",
  "ACCEPTED",
];

export default function Applicants() {
  const { jobId } = useParams();
  const [apps, setApps] = useState<Application[]>([]);

  const load = () =>
    api.get(`/jobs/${jobId}/applicants`).then(({ data }) => setApps(data.data));
  useEffect(() => {
    load();
  }, [jobId]);

  const changeStatus = async (id: string, status: ApplicationStatus) => {
    await api.patch(`/applications/${id}/status`, { status });
    load();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Pelamar</h1>
      {apps.length === 0 && <p className="text-gray-500">Belum ada pelamar.</p>}
      {apps.map((a) => (
        <div key={a.id} className="card">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-semibold">{a.user?.name}</h2>
              <p className="text-sm text-gray-600">{a.user?.email}</p>
              <p className="text-xs text-gray-500">
                Applied: {new Date(a.createdAt).toLocaleDateString("id-ID")}
              </p>
            </div>
            <select
              value={a.status}
              onChange={(e) =>
                changeStatus(a.id, e.target.value as ApplicationStatus)
              }
              className="input w-auto"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <details className="mt-3 text-sm">
            <summary className="cursor-pointer text-gray-600">
              Riwayat Status
            </summary>
            <ul className="mt-2 space-y-1 pl-4 border-l">
              {a.histories.map((h) => (
                <li key={h.id} className="text-xs text-gray-600">
                  <b>{h.status}</b> — {h.note} •{" "}
                  {new Date(h.changedAt).toLocaleString("id-ID")}
                </li>
              ))}
            </ul>
          </details>
        </div>
      ))}
    </div>
  );
}
