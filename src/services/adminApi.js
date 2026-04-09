import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({
  baseURL: apiBaseUrl,
});

export const adminLogin = (data) =>
  API.post("/admin/auth/login", data);

export const fetchDashboardStats = () =>
  API.get("/admin/dashboard/stats");

export const fetchPendingWorkers = () =>
  API.get("/admin/workers/pending");

export const approveWorker = (id) =>
  API.patch(`/admin/workers/${id}/approve`);

export const rejectWorker = (id) =>
  API.delete(`/admin/workers/${id}`);

export const fetchActiveWorkers = () =>
  API.get("/admin/workers/active");

export default API;
