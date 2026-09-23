import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  if (!user) return null;

  return (
    <nav className="bg-white border-b px-6 py-3 flex items-center justify-between">
      <Link to="/" className="font-bold text-lg text-blue-600">
        IndoKerja.id
      </Link>
      <div className="flex gap-4 items-center text-sm">
        {user.role === "JOB_SEEKER" && (
          <>
            <Link to="/">Jobs</Link>
            <Link to="/my-applications">My Applications</Link>
          </>
        )}
        {user.role === "COMPANY" && (
          <>
            <Link to="/company/jobs">My Jobs</Link>
            <Link to="/company/jobs/new">Post Job</Link>
          </>
        )}
        <span className="text-gray-500">
          {user.name} ({user.role})
        </span>
        <button
          onClick={() => {
            logout();
            nav("/login");
          }}
          className="btn btn-secondary"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
