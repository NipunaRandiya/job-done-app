import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const workerApi = axios.create({
  baseURL: apiBaseUrl,
});

workerApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getWorkerDashboard = () => 
  workerApi.get("/workers/dashboard");

export const getWorkerProfile = (fields = "name,category,profileImage,rating,availability,status") => 
  workerApi.get(`/workers/profile?fields=${fields}`);

export const getWorkerProfilePage = (fields = "name,category,email,telephone,address,createdAt,profileImage,rating,availability,status") => 
  workerApi.get(`/workers/profile?fields=${fields}`);

export const toggleWorkerStatus = () => 
  workerApi.patch("/workers/status", {});

export const getWorkerJobs = () => 
  workerApi.get("/workers/jobs");

export const getChatHistory = (chatId, page = 1) => 
  workerApi.get(`/chat/${chatId}?page=${page}&limit=10`);

export const updateWorkerProfile = (data) => 
  workerApi.patch("/workers/update-profile", data);

export const getWorkerReviews = (workerId) => 
  workerApi.get(`/work-orders/worker/${workerId}/reviews`);

export const getWorkerEarningStats = () => 
  workerApi.get("/workers/earning-stats");

export const getWorkerTaskHistory = (page = 1) => 
  workerApi.get(`/workers/task-history?page=${page}`);

export default workerApi;