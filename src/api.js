import axios from "axios";

// Base API URL
const BASE_URL = "http://127.0.0.1:8000/api/";

// Your token (later you can replace with localStorage or dynamic login)
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsImV4cCI6MTc1NzUzNTM1MX0.ze3RVg6s9qNOQPhX5-_BExhh_lNCKmqXGUQd3lgjE6w";

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`, // Use correct variable
    "Content-Type": "application/json",
  },
});

export default api;
