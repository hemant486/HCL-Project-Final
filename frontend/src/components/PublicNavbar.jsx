import { Link } from "react-router-dom";

export default function PublicNavbar() {
  return (
    <nav className="bg-gradient-to-r from-teal-50 via-green-50 to-cyan-50 border-b border-teal-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
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

        <div className="flex gap-3">
          <Link
            to="/login"
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-5 rounded-lg transition shadow-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            Login
          </Link>
          <Link
            to="/register"
            className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-2 px-5 rounded-lg transition shadow-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
            </svg>
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
