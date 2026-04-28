import axios from "axios";

const API = axios.create({
  baseURL: "https://e-commerce-bfn8.onrender.com/"
});

export default API;