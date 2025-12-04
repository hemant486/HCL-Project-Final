import { useState, useEffect } from "react";
import axios from "../services/api";

export default function BookAppointment({ onClose, onSuccess }) {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Select Doctor, 2: Select Date/Time, 3: Confirm

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      fetchAvailability();
    }
  }, [selectedDoctor, selectedDate]);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("/auth/doctors");
      setDoctors(res.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const fetchAvailability = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `/auth/doctors/${selectedDoctor._id}/availability?date=${selectedDate}`
      );
      setAvailableSlots(res.data.availableSlots);
    } catch (error) {
      console.error("Error fetching availability:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("/appointments", {
        doctorId: selectedDoctor._id,
        date: selectedDate,
        time: selectedTime,
        reason,
      });
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split("T")[0];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-gray-800">Book Appointment</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                1
              </div>
              <div
                className={`w-20 h-1 ${
                  step >= 2 ? "bg-blue-600" : "bg-gray-200"
                }`}
              ></div>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 2
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                2
              </div>
              <div
                className={`w-20 h-1 ${
                  step >= 3 ? "bg-blue-600" : "bg-gray-200"
                }`}
              ></div>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 3
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                3
              </div>
            </div>
          </div>

          {/* Step 1: Select Doctor */}
          {step === 1 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Select a Doctor</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {doctors.map((doctor) => (
                  <div
                    key={doctor._id}
                    onClick={() => handleDoctorSelect(doctor)}
                    className="border rounded-lg p-4 hover:border-blue-500 hover:shadow-lg cursor-pointer transition"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 font-bold text-xl">
                          {doctor.name.split(" ")[1]?.charAt(0) || "D"}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg text-gray-800">
                          {doctor.name}
                        </h4>
                        <p className="text-blue-600 text-sm">
                          {doctor.specialization}
                        </p>
                        <p className="text-gray-600 text-sm mt-1">
                          {doctor.experience} years experience
                        </p>
                        <p className="text-gray-800 font-medium mt-2">
                          ${doctor.consultationFee} consultation fee
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Date and Time */}
          {step === 2 && (
            <div>
              <button
                onClick={() => setStep(1)}
                className="text-blue-600 hover:text-blue-700 mb-4 flex items-center gap-2"
              >
                ← Back to doctors
              </button>

              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-800">
                  {selectedDoctor.name}
                </h4>
                <p className="text-blue-600 text-sm">
                  {selectedDoctor.specialization}
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Select Date
                  </label>
                  <input
                    type="date"
                    min={getMinDate()}
                    max={getMaxDate()}
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setSelectedTime("");
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {selectedDate && (
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Available Time Slots
                    </label>
                    {loading ? (
                      <div className="text-center py-4">Loading slots...</div>
                    ) : availableSlots.length === 0 ? (
                      <div className="text-center py-4 text-gray-500">
                        No available slots for this date
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                        {availableSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => {
                              setSelectedTime(slot);
                              setStep(3);
                            }}
                            className={`px-4 py-2 rounded-lg border transition ${
                              selectedTime === slot
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Confirm and Add Reason */}
          {step === 3 && (
            <form onSubmit={handleSubmit}>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-blue-600 hover:text-blue-700 mb-4 flex items-center gap-2"
              >
                ← Back to date/time
              </button>

              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Appointment Summary
                </h4>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-medium">Doctor:</span>{" "}
                    {selectedDoctor.name}
                  </p>
                  <p>
                    <span className="font-medium">Specialization:</span>{" "}
                    {selectedDoctor.specialization}
                  </p>
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(selectedDate).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium">Time:</span> {selectedTime}
                  </p>
                  <p>
                    <span className="font-medium">Fee:</span> $
                    {selectedDoctor.consultationFee}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Reason for Visit *
                </label>
                <textarea
                  required
                  rows="4"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Please describe your symptoms or reason for consultation..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {loading ? "Booking..." : "Confirm Appointment"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
