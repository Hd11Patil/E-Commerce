
import axios from "axios";

const API = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : "https://e-commerce-bfn8.onrender.com"),
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
