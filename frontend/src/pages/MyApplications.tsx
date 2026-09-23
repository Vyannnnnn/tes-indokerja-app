import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { Application } from "../types";

const badge: Record<string, string> = {
  APPLIED: "bg-gray-100 text-gray-700",
  REVIEWING: "bg-yellow-100 text-yellow-700",
  SHORTLISTED: "bg-blue-100 text-blue-700",
  REJECTED: "bg-red-100 text-red-700",
  ACCEPTED: "bg-green-100 text-green-700",
};

export default function MyApplications() {
  const [apps, setApps] = useState<Application[]>([]);

  useEffect(() => {
    api.get("/applications/me").then(({ data }) => setApps(data.data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Lamaran Saya</h1>
      {apps.length === 0 && <p className="text-gray-500">Belum ada lamaran.</p>}
      {apps.map((a) => (
        <div key={a.id} className="card">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-semibold">{a.job.title}</h2>
              <p className="text-sm text-gray-600">
                {a.job.company} • {a.job.location}
              </p>
            </div>
            <span className={`text-xs px-2 py-1 rounded ${badge[a.status]}`}>
              {a.status}
            </span>
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
