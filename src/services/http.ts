import axios from "axios";

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
http.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

// Response interceptor
http.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ?? "something went wrong";
    console.error("[HTTP Error]", message);
    return Promise.reject(error);
  },
);