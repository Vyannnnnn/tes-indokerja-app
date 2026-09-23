import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    try {
      await login(form.email, form.password);
      nav("/");
    } catch (e: any) {
      setErr(e.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="card w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Login</h1>
        {err && <p className="text-red-500 text-sm">{err}</p>}
        <input
          className="input"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="btn btn-primary w-full">Login</button>
        <p className="text-sm text-center">
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </p>
        <p className="text-xs text-gray-500 text-center">
          Demo: seeker@test.com / company@test.com — password123
        </p>
      </form>
    </div>
  );
}
