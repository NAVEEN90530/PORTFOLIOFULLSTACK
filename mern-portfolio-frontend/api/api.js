import axios from "axios";

const VITE_API_URL = "https://auroxdemo.onrender.com";

const API = axios.create({
  baseURL: `${VITE_API_URL}/api`,
  withCredentials: true,
});

export default API;
