import { Link } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  const isDoctor = user?.role === "doctor";

  return (
    <nav className="bg-gradient-to-r from-teal-50 via-green-50 to-cyan-50 border-b border-teal-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/dashboard" className="flex items-center gap-2 group">
          <div className="relative">
            <svg
              className="w-8 h-8 text-teal-600 group-hover:text-teal-700 transition"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <div>
            <span className="text-xl font-bold text-teal-800 group-hover:text-teal-900 transition">
              HealthCare
            </span>
            <p className="text-xs text-teal-600">Portal</p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to="/dashboard"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-teal-700 hover:bg-teal-100 hover:text-teal-900 transition font-medium"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Dashboard
          </Link>

          <Link
            to="/appointments"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-cyan-700 hover:bg-cyan-100 hover:text-cyan-900 transition font-medium"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Appointments
          </Link>

          <Link
            to="/records"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-emerald-700 hover:bg-emerald-100 hover:text-emerald-900 transition font-medium"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
            </svg>
            Records
          </Link>

          <Link
            to="/health-info"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-green-700 hover:bg-green-100 hover:text-green-900 transition font-medium"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            Health
          </Link>

          <div className="flex items-center gap-2 ml-3 pl-3 border-l border-teal-300">
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg shadow-sm">
              <div
                className={`w-2 h-2 rounded-full ${
                  isDoctor ? "bg-blue-500" : "bg-green-500"
                }`}
              ></div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="flex items-center gap-1 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-lg transition font-medium text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clipRule="evenodd"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
