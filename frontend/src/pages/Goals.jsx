import { useEffect, useState } from "react";
import axios from "../services/api";

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    targetValue: "",
    unit: "",
    deadline: "",
  });

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await axios.get("/goals");
      setGoals(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/goals", formData);
      setShowForm(false);
      setFormData({
        title: "",
        description: "",
        targetValue: "",
        unit: "",
        deadline: "",
      });
      fetchGoals();
    } catch (error) {
      console.error(error);
    }
  };

  const updateProgress = async (id, progress) => {
    try {
      await axios.patch(`/goals/${id}`, { progress, currentValue: progress });
      fetchGoals();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteGoal = async (id) => {
    if (confirm("Delete this goal?")) {
      try {
        await axios.delete(`/goals/${id}`);
        fetchGoals();
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-teal-900">Health Goals</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg transition"
          >
            {showForm ? "Cancel" : "+ New Goal"}
          </button>
        </div>

        {showForm && (
          <div className="card mb-6">
            <h2 className="text-xl font-bold mb-4 text-teal-900">
              Create New Goal
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Goal Title"
                required
                className="input"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <textarea
                placeholder="Description"
                rows="3"
                className="input"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Target Value"
                  className="input"
                  value={formData.targetValue}
                  onChange={(e) =>
                    setFormData({ ...formData, targetValue: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Unit (kg, steps, etc)"
                  className="input"
                  value={formData.unit}
                  onChange={(e) =>
                    setFormData({ ...formData, unit: e.target.value })
                  }
                />
                <input
                  type="date"
                  className="input"
                  value={formData.deadline}
                  onChange={(e) =>
                    setFormData({ ...formData, deadline: e.target.value })
                  }
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Create Goal
              </button>
            </form>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {goals.length === 0 ? (
            <div className="card col-span-2 text-center text-gray-500">
              No goals yet. Create your first health goal!
            </div>
          ) : (
            goals.map((goal) => (
              <div key={goal._id} className="card">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-teal-900">
                      {goal.title}
                    </h3>
                    <p className="text-sm text-gray-600">{goal.description}</p>
                  </div>
                  <button
                    onClick={() => deleteGoal(goal._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold text-teal-700">
                      {goal.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-teal-500 to-green-500 h-3 rounded-full transition-all"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex gap-2 mb-3">
                  {[25, 50, 75, 100].map((val) => (
                    <button
                      key={val}
                      onClick={() => updateProgress(goal._id, val)}
                      className={`flex-1 py-1 rounded text-sm font-medium transition ${
                        goal.progress >= val
                          ? "bg-teal-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {val}%
                    </button>
                  ))}
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>
                    Target: {goal.targetValue} {goal.unit}
                  </span>
                  {goal.deadline && (
                    <span>
                      Due: {new Date(goal.deadline).toLocaleDateString()}
                    </span>
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
