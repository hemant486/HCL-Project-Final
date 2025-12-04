import { useEffect, useState } from "react";
import axios from "../services/api";
import BookAppointment from "../components/BookAppointment";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [showBooking, setShowBooking] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("/appointments");
      setAppointments(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingSuccess = () => {
    fetchAppointments();
  };

  const handleCancel = async (id) => {
    try {
      await axios.patch(`/appointments/${id}`, { status: "cancelled" });
      fetchAppointments();
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Appointments</h1>
          <button
            onClick={() => setShowBooking(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
          >
            Book Appointment
          </button>
        </div>

        {showBooking && (
          <BookAppointment
            onClose={() => setShowBooking(false)}
            onSuccess={handleBookingSuccess}
          />
        )}

        <div className="space-y-4">
          {appointments.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              No appointments found. Book your first appointment!
            </div>
          ) : (
            appointments.map((apt) => (
              <div key={apt._id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-gray-800">
                        {new Date(apt.date).toLocaleDateString()}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          apt.status
                        )}`}
                      >
                        {apt.status}
                      </span>
                    </div>

                    {apt.doctorId && (
                      <div className="mb-3 flex items-center gap-2">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">
                            {apt.doctorId.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-gray-800 font-medium">
                            Dr. {apt.doctorId.name}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {apt.doctorId.email}
                          </p>
                        </div>
                      </div>
                    )}

                    <p className="text-gray-600 mb-2">
                      <span className="font-medium">Time:</span> {apt.time}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <span className="font-medium">Reason:</span> {apt.reason}
                    </p>
                    {apt.notes && (
                      <p className="text-gray-600">
                        <span className="font-medium">Notes:</span> {apt.notes}
                      </p>
                    )}
                  </div>
                  {apt.status === "pending" && (
                    <button
                      onClick={() => handleCancel(apt._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Appointments;
