
import axios from "axios";

const API = axios.create({
  baseURL: "https://e-commerce-bfn8.onrender.com", //  no trailing slash
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;