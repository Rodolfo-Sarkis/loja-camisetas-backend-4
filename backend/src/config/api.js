const isProduction = import.meta.env.PROD;

export const API_URL =
  import.meta.env.VITE_API_URL?.trim() ||
  (isProduction
    ? "https://transcendental-clothing-api.onrender.com"
    : "http://localhost:5000");