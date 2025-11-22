import { useEffect, useState } from "react";
import { healthAPI } from "../services/api";

function HealthInfo() {
  const [formData, setFormData] = useState({
    steps: "",
    activeTime: "",
    sleep: "",
    weight: "",
    height: "",
    allergies: "",
    medications: "",
    medicalHistory: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    healthAPI
      .getHealthInfo()
      .then((res) => {
        if (res.data) {
          setFormData({
            steps: res.data.steps || "",
            activeTime: res.data.activeTime || "",
            sleep: res.data.sleep || "",
            weight: res.data.weight || "",
            height: res.data.height || "",
            allergies: res.data.allergies?.join(", ") || "",
            medications: res.data.medications?.join(", ") || "",
            medicalHistory: res.data.medicalHistory || "",
          });
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const data = {
        ...formData,
        allergies: formData.allergies
          .split(",")
          .map((a) => a.trim())
          .filter(Boolean),
        medications: formData.medications
          .split(",")
          .map((m) => m.trim())
          .filter(Boolean),
      };

      await healthAPI.updateHealthInfo(data);
      setMessage("Health information updated successfully!");
    } catch (err) {
      setMessage("Failed to update health information");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-green-50 to-cyan-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-lg shadow-lg p-8 border border-teal-100">
          <h1 className="text-3xl font-bold text-teal-900 mb-6">
            Health Information
          </h1>

          {message && (
            <div
              className={`px-4 py-3 rounded mb-4 ${
                message.includes("success")
                  ? "bg-green-100 border border-green-400 text-green-700"
                  : "bg-red-100 border border-red-400 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-4 rounded-lg border border-violet-200">
              <h3 className="text-lg font-semibold text-violet-900 mb-3">
                Daily Activity
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-violet-800 font-medium mb-2">
                    Steps
                  </label>
                  <input
                    type="number"
                    placeholder="10000"
                    className="w-full px-4 py-2 border border-violet-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                    value={formData.steps}
                    onChange={(e) =>
                      setFormData({ ...formData, steps: e.target.value })
                    }
                  />
                  <p className="text-xs text-violet-600 mt-1">steps/day</p>
                </div>

                <div>
                  <label className="block text-orange-800 font-medium mb-2">
                    Active Time
                  </label>
                  <input
                    type="number"
                    placeholder="30"
                    className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={formData.activeTime}
                    onChange={(e) =>
                      setFormData({ ...formData, activeTime: e.target.value })
                    }
                  />
                  <p className="text-xs text-orange-600 mt-1">minutes/day</p>
                </div>

                <div>
                  <label className="block text-indigo-800 font-medium mb-2">
                    Sleep
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    placeholder="8"
                    className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={formData.sleep}
                    onChange={(e) =>
                      setFormData({ ...formData, sleep: e.target.value })
                    }
                  />
                  <p className="text-xs text-indigo-600 mt-1">hours/night</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg border border-emerald-200">
              <h3 className="text-lg font-semibold text-emerald-900 mb-3">
                Body Metrics
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-emerald-800 font-medium mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="70"
                    className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={formData.weight}
                    onChange={(e) =>
                      setFormData({ ...formData, weight: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-teal-800 font-medium mb-2">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    placeholder="175"
                    className="w-full px-4 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={formData.height}
                    onChange={(e) =>
                      setFormData({ ...formData, height: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-4 rounded-lg border border-rose-200">
              <h3 className="text-lg font-semibold text-rose-900 mb-3">
                Medical Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-rose-800 font-medium mb-2">
                    Allergies (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="Peanuts, Penicillin"
                    className="w-full px-4 py-2 border border-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                    value={formData.allergies}
                    onChange={(e) =>
                      setFormData({ ...formData, allergies: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-pink-800 font-medium mb-2">
                    Medications (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="Aspirin, Vitamin D"
                    className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    value={formData.medications}
                    onChange={(e) =>
                      setFormData({ ...formData, medications: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-rose-800 font-medium mb-2">
                    Medical History
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Enter your medical history..."
                    className="w-full px-4 py-2 border border-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                    value={formData.medicalHistory}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        medicalHistory: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50 shadow-sm"
            >
              {saving ? "Saving..." : "Save Health Information"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HealthInfo;
