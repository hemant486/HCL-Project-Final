import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../services/api";

export default function DoctorPatients() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [patientsRes, appointmentsRes] = await Promise.all([
        axios.get("/auth/patients"),
        axios.get("/appointments"),
      ]);
      setPatients(patientsRes.data);
      setAppointments(appointmentsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getLastVisit = (patientId) => {
    const patientAppointments = appointments
      .filter(
        (apt) => apt.patientId?._id === patientId && apt.status === "completed"
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    return patientAppointments[0]?.date || null;
  };

  const getPatientStatus = (patientId) => {
    const lastVisit = getLastVisit(patientId);
    if (!lastVisit) return "New";
    const daysSinceVisit = Math.floor(
      (new Date() - new Date(lastVisit)) / (1000 * 60 * 60 * 24)
    );
    return daysSinceVisit < 90 ? "Active" : "Inactive";
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Patients</h1>
          <p className="text-gray-600 mt-2">
            Manage and view your patient records
          </p>
        </div>

        <div className="card mb-6">
          <div className="flex items-center gap-4">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              placeholder="Search patients by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 outline-none"
            />
          </div>
        </div>

        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Patient Name
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Phone
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Last Visit
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-gray-500">
                      No patients found
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map((patient) => {
                    const lastVisit = getLastVisit(patient._id);
                    const status = getPatientStatus(patient._id);
                    return (
                      <tr
                        key={patient._id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-semibold">
                                {patient.name.charAt(0)}
                              </span>
                            </div>
                            <span className="font-medium text-gray-900">
                              {patient.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {patient.email}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {patient.phone || "N/A"}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {lastVisit
                            ? new Date(lastVisit).toLocaleDateString()
                            : "No visits"}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              status === "Active"
                                ? "bg-green-100 text-green-700"
                                : status === "New"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() =>
                              navigate(`/doctor/patients/${patient._id}`)
                            }
                            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
