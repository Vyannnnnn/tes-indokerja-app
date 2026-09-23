import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobList from "./pages/JobList";
import JobDetail from "./pages/JobDetail";
import MyApplications from "./pages/MyApplications";
import MyJobs from "./pages/company/MyJobs";
import CreateJob from "./pages/company/CreateJob";
import Applicants from "./pages/company/Applicants";

import "./App.css";

function HomeRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return user.role === "COMPANY" ? (
    <Navigate to="/company/jobs" replace />
  ) : (
    <JobList />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<HomeRedirect />} />
          <Route
            path="/jobs/:id"
            element={
              <ProtectedRoute role="JOB_SEEKER">
                <JobDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-applications"
            element={
              <ProtectedRoute role="JOB_SEEKER">
                <MyApplications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company/jobs"
            element={
              <ProtectedRoute role="COMPANY">
                <MyJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company/jobs/new"
            element={
              <ProtectedRoute role="COMPANY">
                <CreateJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company/jobs/:jobId/applicants"
            element={
              <ProtectedRoute role="COMPANY">
                <Applicants />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
