import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ReactNode } from "react";

export default function ProtectedRoute({
  children,
  role,
}: {
  children: ReactNode;
  role?: "JOB_SEEKER" | "COMPANY";
}) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return <>{children}</>;
}
