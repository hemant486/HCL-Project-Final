import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../services/api";

export default function PatientDetail() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [healthInfo, setHealthInfo] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [healthData, setHealthData] = useState({});

  useEffect(() => {
    fetchPatientData();
  }, [patientId]);

  const fetchPatientData = async () => {
    try {
      const [patientRes, healthRes, appointmentsRes, recordsRes] =
        await Promise.all([
          axios.get(`/auth/patients`),
          axios.get(`/health/${patientId}`),
          axios.get(`/appointments`),
          axios.get(`/records`),
        ]);

      const patientData = patientRes.data.find((p) => p._id === patientId);
      setPatient(patientData);
      setHealthInfo(healthRes.data);
      setHealthData(healthRes.data || {});

      const patientAppointments = appointmentsRes.data.filter(
        (apt) => apt.patientId?._id === patientId
      );
      setAppointments(patientAppointments);

      const patientRecords = recordsRes.data.filter(
        (rec) => rec.patientId?._id === patientId
      );
      setMedicalRecords(patientRecords);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateHealth = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/health/${patientId}`, healthData);
      alert("Patient health information updated successfully");
      setEditMode(false);
      fetchPatientData();
    } catch (error) {
      console.error("Error updating health info:", error);
      alert("Failed to update health information");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-600">Patient not found</p>
            <button
              onClick={() => navigate("/doctor/patients")}
              className="mt-4 text-blue-600 hover:text-blue-700"
            >
              Back to Patients
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <button
          onClick={() => navigate("/doctor/patients")}
          className="text-blue-600 hover:text-blue-700 mb-6 flex items-center gap-2"
        >
          ← Back to Patients
        </button>

        {/* Patient Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-2xl">
                {patient.name.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {patient.name}
              </h1>
              <p className="text-gray-600">{patient.email}</p>
              {patient.phone && (
                <p className="text-gray-600">{patient.phone}</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Health Information */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Health Information
              </h2>
              <button
                onClick={() => setEditMode(!editMode)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                {editMode ? "Cancel" : "Edit"}
              </button>
            </div>

            {editMode ? (
              <form onSubmit={handleUpdateHealth} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      value={healthData.weight || ""}
                      onChange={(e) =>
                        setHealthData({
                          ...healthData,
                          weight: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      value={healthData.height || ""}
                      onChange={(e) =>
                        setHealthData({
                          ...healthData,
                          height: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Blood Pressure
                  </label>
                  <input
                    type="text"
                    placeholder="120/80"
                    value={healthData.bloodPressure || ""}
                    onChange={(e) =>
                      setHealthData({
                        ...healthData,
                        bloodPressure: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Allergies (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={healthData.allergies?.join(", ") || ""}
                    onChange={(e) =>
                      setHealthData({
                        ...healthData,
                        allergies: e.target.value
                          .split(",")
                          .map((a) => a.trim()),
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Medications (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={healthData.medications?.join(", ") || ""}
                    onChange={(e) =>
                      setHealthData({
                        ...healthData,
                        medications: e.target.value
                          .split(",")
                          .map((m) => m.trim()),
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Medical History
                  </label>
                  <textarea
                    rows="3"
                    value={healthData.medicalHistory || ""}
                    onChange={(e) =>
                      setHealthData({
                        ...healthData,
                        medicalHistory: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                >
                  Save Changes
                </button>
              </form>
            ) : (
              <div className="space-y-3">
                {healthInfo ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Weight</p>
                        <p className="font-medium">
                          {healthInfo.weight || "N/A"} kg
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Height</p>
                        <p className="font-medium">
                          {healthInfo.height || "N/A"} cm
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Blood Pressure</p>
                      <p className="font-medium">
                        {healthInfo.bloodPressure || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Allergies</p>
                      <p className="font-medium">
                        {healthInfo.allergies?.length > 0
                          ? healthInfo.allergies.join(", ")
                          : "None"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Medications</p>
                      <p className="font-medium">
                        {healthInfo.medications?.length > 0
                          ? healthInfo.medications.join(", ")
                          : "None"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Medical History</p>
                      <p className="font-medium">
                        {healthInfo.medicalHistory || "No history recorded"}
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500">
                    No health information available
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Appointments */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Appointments
            </h2>
            <div className="space-y-3">
              {appointments.length > 0 ? (
                appointments.map((apt) => (
                  <div
                    key={apt._id}
                    className="border-l-4 border-blue-500 pl-4 py-2"
                  >
                    <p className="font-medium">
                      {new Date(apt.date).toLocaleDateString()} at {apt.time}
                    </p>
                    <p className="text-sm text-gray-600">{apt.reason}</p>
                    <span
                      className={`inline-block mt-1 px-2 py-1 rounded text-xs ${
                        apt.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : apt.status === "confirmed"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {apt.status}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No appointments</p>
              )}
            </div>
          </div>
        </div>

        {/* Medical Records */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Medical Records
          </h2>
          <div className="space-y-4">
            {medicalRecords.length > 0 ? (
              medicalRecords.map((record) => (
                <div key={record._id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">
                      {record.diagnosis}
                    </h3>
                    <span className="text-sm text-gray-600">
                      {new Date(record.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-2">
                    <span className="font-medium">Treatment:</span>{" "}
                    {record.treatment}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <span className="font-medium">Prescription:</span>{" "}
                    {record.prescription}
                  </p>
                  {record.notes && (
                    <p className="text-gray-600 text-sm">
                      <span className="font-medium">Notes:</span> {record.notes}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No medical records</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
