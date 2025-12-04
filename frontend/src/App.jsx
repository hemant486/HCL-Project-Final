import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import DoctorNavbar from "./components/DoctorNavbar";
import PublicNavbar from "./components/PublicNavbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import MedicalRecords from "./pages/MedicalRecords";
import HealthInfo from "./pages/HealthInfo";
import Goals from "./pages/Goals";
import Profile from "./pages/Profile";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import DoctorPatients from "./pages/doctor/DoctorPatients";
import DoctorSchedule from "./pages/doctor/DoctorSchedule";
import PatientDetail from "./pages/doctor/PatientDetail";

function AppRoutes() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  const isDoctor = user?.role === "doctor";
  const defaultRoute = isDoctor ? "/doctor/dashboard" : "/dashboard";

  return (
    <Router>
      {user ? (
        isDoctor ? (
          <DoctorNavbar user={user} onLogout={logout} />
        ) : (
          <Navbar user={user} onLogout={logout} />
        )
      ) : (
        <PublicNavbar />
      )}
      <Routes>
        <Route
          path="/"
          element={!user ? <Home /> : <Navigate to={defaultRoute} />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={defaultRoute} />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to={defaultRoute} />}
        />

        {/* Patient Routes */}
        <Route
          path="/dashboard"
          element={
            user && !isDoctor ? <Dashboard user={user} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/appointments"
          element={user && !isDoctor ? <Appointments /> : <Navigate to="/" />}
        />
        <Route
          path="/records"
          element={user && !isDoctor ? <MedicalRecords /> : <Navigate to="/" />}
        />
        <Route
          path="/health-info"
          element={user && !isDoctor ? <HealthInfo /> : <Navigate to="/" />}
        />
        <Route
          path="/goals"
          element={user && !isDoctor ? <Goals /> : <Navigate to="/" />}
        />

        {/* Doctor Routes */}
        <Route
          path="/doctor/dashboard"
          element={
            user && isDoctor ? (
              <DoctorDashboard user={user} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/doctor/appointments"
          element={
            user && isDoctor ? <DoctorAppointments /> : <Navigate to="/" />
          }
        />
        <Route
          path="/doctor/patients"
          element={user && isDoctor ? <DoctorPatients /> : <Navigate to="/" />}
        />
        <Route
          path="/doctor/patients/:patientId"
          element={user && isDoctor ? <PatientDetail /> : <Navigate to="/" />}
        />
        <Route
          path="/doctor/schedule"
          element={user && isDoctor ? <DoctorSchedule /> : <Navigate to="/" />}
        />

        {/* Shared Routes */}
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
