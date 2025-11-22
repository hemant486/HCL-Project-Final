import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { healthAPI } from "../services/api";
import axios from "../services/api";

function Dashboard({ user }) {
  const [healthInfo, setHealthInfo] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([healthAPI.getHealthInfo(), axios.get("/appointments")])
      .then(([healthRes, apptRes]) => {
        setHealthInfo(healthRes.data);
        setAppointments(apptRes.data.slice(0, 3));
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const upcomingAppointments = appointments.filter(
    (apt) => apt.status !== "cancelled" && new Date(apt.date) >= new Date()
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-green-50 to-cyan-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6 border border-teal-100">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-teal-900 mb-2">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-600 text-lg">
                <span className="inline-block bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-500 text-sm">Today</p>
              <p className="text-2xl font-bold text-teal-800">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <div className="bg-gradient-to-br from-violet-50 to-purple-100 border border-violet-200 rounded-xl shadow-sm p-6 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-violet-800">Steps</h3>
              <svg
                className="w-8 h-8 text-violet-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-3xl font-bold text-violet-900">
              {loading ? "..." : healthInfo?.steps || "0"}
            </p>
            <p className="text-violet-600 text-sm mt-1">steps</p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-amber-100 border border-orange-200 rounded-xl shadow-sm p-6 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-orange-800">
                Active Time
              </h3>
              <svg
                className="w-8 h-8 text-orange-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-3xl font-bold text-orange-900">
              {loading ? "..." : healthInfo?.activeTime || "0"}
            </p>
            <p className="text-orange-600 text-sm mt-1">minutes</p>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-blue-100 border border-indigo-200 rounded-xl shadow-sm p-6 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-indigo-800">Sleep</h3>
              <svg
                className="w-8 h-8 text-indigo-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-indigo-900">
              {loading ? "..." : healthInfo?.sleep || "0"}
            </p>
            <p className="text-indigo-600 text-sm mt-1">hours</p>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-sky-100 border border-cyan-200 rounded-xl shadow-sm p-6 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-cyan-800">
                Appointments
              </h3>
              <svg
                className="w-8 h-8 text-cyan-500"
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
            <p className="text-3xl font-bold text-cyan-900">
              {upcomingAppointments.length}
            </p>
            <p className="text-cyan-600 text-sm mt-1">Upcoming</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Upcoming Appointments
            </h2>
            {upcomingAppointments.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No upcoming appointments
              </p>
            ) : (
              <div className="space-y-3">
                {upcomingAppointments.map((apt) => (
                  <div
                    key={apt._id}
                    className="border-l-4 border-cyan-400 bg-cyan-50 p-4 rounded"
                  >
                    <p className="font-semibold text-cyan-900">
                      {new Date(apt.date).toLocaleDateString()}
                    </p>
                    <p className="text-cyan-700 text-sm">
                      {apt.time} - {apt.reason}
                    </p>
                  </div>
                ))}
              </div>
            )}
            <Link to="/appointments">
              <button className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg transition">
                View All Appointments
              </button>
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Link to="/appointments">
                <button className="w-full bg-gradient-to-r from-amber-100 to-orange-100 hover:from-amber-200 hover:to-orange-200 border border-amber-200 text-amber-900 font-bold py-4 rounded-lg transition flex items-center justify-center gap-2 shadow-sm">
                  <svg
                    className="w-5 h-5 text-amber-700"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Schedule Appointment
                </button>
              </Link>
              <Link to="/records">
                <button className="w-full bg-gradient-to-r from-stone-100 to-neutral-100 hover:from-stone-200 hover:to-neutral-200 border border-stone-200 text-stone-900 font-bold py-4 rounded-lg transition flex items-center justify-center gap-2 shadow-sm">
                  <svg
                    className="w-5 h-5 text-stone-700"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                  </svg>
                  View Medical Records
                </button>
              </Link>
              <Link to="/health-info">
                <button className="w-full bg-gradient-to-r from-lime-100 to-green-100 hover:from-lime-200 hover:to-green-200 border border-lime-200 text-green-900 font-bold py-4 rounded-lg transition flex items-center justify-center gap-2 shadow-sm">
                  <svg
                    className="w-5 h-5 text-green-700"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Update Health Info
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
