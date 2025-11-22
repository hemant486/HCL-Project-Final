import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
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

function AppRoutes() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <Router>
      {user ? <Navbar user={user} onLogout={logout} /> : <PublicNavbar />}
      <Routes>
        <Route
          path="/"
          element={!user ? <Home /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} /> : <Navigate to="/" />}
        />
        <Route
          path="/appointments"
          element={user ? <Appointments /> : <Navigate to="/" />}
        />
        <Route
          path="/records"
          element={user ? <MedicalRecords /> : <Navigate to="/" />}
        />
        <Route
          path="/health-info"
          element={user ? <HealthInfo /> : <Navigate to="/" />}
        />
        <Route path="/goals" element={user ? <Goals /> : <Navigate to="/" />} />
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
