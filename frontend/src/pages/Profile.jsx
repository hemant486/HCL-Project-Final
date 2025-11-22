import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "../services/api";

export default function Profile() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    dateOfBirth: "",
    gender: "",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch("/auth/profile", formData);
      setMessage("Profile updated successfully!");
      setEditing(false);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-teal-900">My Profile</h1>
            <button
              onClick={() => setEditing(!editing)}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition"
            >
              {editing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {message && (
            <div
              className={`mb-4 p-3 rounded ${
                message.includes("success")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <div className="flex items-center gap-4 mb-6 pb-6 border-b">
            <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
              <p className="text-gray-600 capitalize">{user?.role}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>

          {editing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="input"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="input"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="input"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="input"
                    value={formData.dateOfBirth}
                    onChange={(e) =>
                      setFormData({ ...formData, dateOfBirth: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Gender
                </label>
                <select
                  className="input"
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Address
                </label>
                <textarea
                  className="input"
                  rows="3"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Save Changes
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Role
                </label>
                <p className="text-lg text-gray-900 capitalize">{user?.role}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Email
                </label>
                <p className="text-lg text-gray-900">{user?.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Member Since
                </label>
                <p className="text-lg text-gray-900">
                  {new Date(user?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="card mt-6">
          <h2 className="text-xl font-bold text-teal-900 mb-4">
            Account Security
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium text-gray-700">
                  Password Protected
                </span>
              </div>
              <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                Change Password
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium text-gray-700">
                  Data Encrypted
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
