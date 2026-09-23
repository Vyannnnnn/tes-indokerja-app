import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/axios";

export default function CreateJob() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    jobType: "FULL_TIME",
  });
  const [err, setErr] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    try {
      await api.post("/jobs", form);
      nav("/company/jobs");
    } catch (e: any) {
      setErr(e.response?.data?.message || "Gagal");
    }
  };

  return (
    <form onSubmit={submit} className="max-w-2xl mx-auto p-6 card space-y-3">
      <h1 className="text-2xl font-bold">Posting Lowongan</h1>
      {err && <p className="text-red-500 text-sm">{err}</p>}
      <input
        className="input"
        placeholder="Job Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        className="input"
        placeholder="Company"
        onChange={(e) => setForm({ ...form, company: e.target.value })}
      />
      <input
        className="input"
        placeholder="Location"
        onChange={(e) => setForm({ ...form, location: e.target.value })}
      />
      <input
        className="input"
        placeholder="Salary"
        onChange={(e) => setForm({ ...form, salary: e.target.value })}
      />
      <select
        className="input"
        onChange={(e) => setForm({ ...form, jobType: e.target.value })}
      >
        {["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "FREELANCE"].map(
          (t) => (
            <option key={t}>{t}</option>
          ),
        )}
      </select>
      <textarea
        className="input"
        rows={5}
        placeholder="Description"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <button className="btn btn-primary w-full">Post Job</button>
    </form>
  );
}
