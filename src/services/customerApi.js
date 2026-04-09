import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const customerApi = axios.create({
  baseURL: apiBaseUrl,
});

customerApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getCustomerProfile = () => 
  customerApi.get("/users/profile?fields=name,telephone,address,nic,email");

export const getCustomerJobs = () => 
  customerApi.get("/users/jobs");

export const getNotifications = () => 
  customerApi.get("/users/notifications");

export const createCheckoutSession = (workOrderId) => 
  customerApi.post("/payments/create-milestone-session", { workOrderId });

export const verifyManualPayment = (workOrderId) => 
  customerApi.post("/payments/manual-verify", { workOrderId });

export const getChatHistory = (chatId, page = 1, limit = 10) => 
  customerApi.get(`/chat/${chatId}?page=${page}&limit=${limit}`);

export const submitReview = (workOrderId, reviewData) => 
  customerApi.patch(`/work-orders/${workOrderId}/review`, reviewData);

export const getWorkerPublicProfile = (workerId) => 
  customerApi.get(`/workers/get-worker`, { params: { workerId } });

export default customerApi;