import axios from "axios";

const API_URL = "https://auroxdemo.onrender.com/api/domains";

/* ===============================
   LIST DOMAINS
================================ */
export const listDomains = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

/* ===============================
   CREATE DOMAIN (ADMIN)
================================ */
export const createDomain = async (data) => {
  const response = await axios.post(API_URL, data, {
    withCredentials: true,
  });
  return response.data;
};

/* ===============================
   UPDATE DOMAIN
================================ */
export const updateDomain = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data, {
    withCredentials: true,
  });
  return response.data;
};

/* ===============================
   DELETE DOMAIN
================================ */
export const deleteDomain = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    withCredentials: true,
  });
  return response.data;
};
