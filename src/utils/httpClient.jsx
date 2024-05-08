import axios from "axios";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://127.0.0.1:8000",
});

httpClient.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));

  config.headers.Authorization = `Bearer ${user?.access_token || ""}`;
  if (!config.headers || !config.headers["Content-Type"]) {
    config.headers = {
      ...config.headers,
      "Content-Type": "application/x-www-form-urlencoded",
    };
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default httpClient;
