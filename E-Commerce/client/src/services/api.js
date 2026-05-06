
import axios from "axios";

const API = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL || "https://e-commerce-bfn8.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
