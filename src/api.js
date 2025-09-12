// src/api.js
import axios from "axios";

// Base API URL
const BASE_URL = "http://127.0.0.1:8000/api/";

// Initial token (hardcoded for now)
let TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsImV4cCI6MTc1NzY5MjIyNn0.5f7q4-gApQ0ZTycMCEanQu_-pbXTkCk8vTPgrAXHpIs";

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
});

// Optional: function to update token dynamically after login
export const setToken = (newToken) => {
  TOKEN = newToken;
  localStorage.setItem("token", newToken); // store in localStorage
  api.defaults.headers.Authorization = `Bearer ${newToken}`;
};

// Helper function for authenticated API calls
export const fetchWithAuth = async (endpoint, method = "GET", data = null) => {
  try {
    const response = await api({
      url: endpoint,
      method,
      data,
    });
    return response.data;
  } catch (err) {
    console.error("API request error:", err);
    throw err;
  }
};

// Axios request interceptor to always add token (for safety)
api.interceptors.request.use(
  (config) => {
    const token = TOKEN || localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
