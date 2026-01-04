import axios from "axios";

const API = axios.create({
  baseURL: "https://auroxdemo.onrender.com/api",
  withCredentials: true,
});

export default API;
