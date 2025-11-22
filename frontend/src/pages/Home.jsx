import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <svg
            className="w-16 h-16 text-green-600 mx-auto mb-6"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>

          <h1 className="text-5xl font-bold text-green-900 mb-4">
            Doctor-Patient Portal
          </h1>
          <p className="text-xl text-green-700 mb-8">
            Streamline healthcare communication. Book appointments, manage
            medical records, and track health information.
          </p>

          <div className="flex gap-4 justify-center mb-16">
            <Link
              to="/register"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-white hover:bg-green-50 text-green-900 font-bold py-3 px-8 rounded-lg border-2 border-green-200 transition"
            >
              Sign In
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="card text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-green-900">
                Appointments
              </h3>
              <p className="text-green-700 text-sm">Easy scheduling</p>
            </div>

            <div className="card text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-emerald-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-green-900">Records</h3>
              <p className="text-green-700 text-sm">Secure storage</p>
            </div>

            <div className="card text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-teal-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-green-900">
                Health Tracking
              </h3>
              <p className="text-green-700 text-sm">Monitor vitals</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
