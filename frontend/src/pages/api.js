// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  }
});

API.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("adminToken") || localStorage.getItem("partenaireId");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;

