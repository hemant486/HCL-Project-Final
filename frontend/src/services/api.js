import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getMe: () => api.get("/auth/me"),
};

export const healthAPI = {
  getHealthInfo: () => api.get("/health"),
  updateHealthInfo: (data) => api.post("/health", data),
};

export default api;

export const appointmentAPI = {
  getAll: () => api.get("/appointments"),
  create: (data) => api.post("/appointments", data),
  update: (id, data) => api.patch(`/appointments/${id}`, data),
  delete: (id) => api.delete(`/appointments/${id}`),
};

export const recordAPI = {
  getAll: () => api.get("/records"),
  create: (data) => api.post("/records", data),
};
