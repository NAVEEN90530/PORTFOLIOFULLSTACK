import axios from "axios";

const API_URL = "https://auroxdemo.onrender.com/api/categories";

/* ===============================
   LIST ALL CATEGORIES
================================ */
export const listCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

/* ===============================
   LIST CATEGORIES BY DOMAIN
================================ */
export const listDomainCategories = async (domainId = "") => {
  // Include API_URL so the request goes to the backend
  const url = domainId ? `${API_URL}?domain=${domainId}` : API_URL;
  const { data } = await axios.get(url);
  return data;
};

/* ===============================
   CREATE CATEGORY (ADMIN)
================================ */
export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post(API_URL, categoryData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error.response?.data || error.message);
    throw error;
  }
};

/* ===============================
   UPDATE CATEGORY
================================ */
export const updateCategory = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error.response?.data || error.message);
    throw error;
  }
};

/* ===============================
   DELETE CATEGORY
================================ */
export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error.response?.data || error.message);
    throw error;
  }
};
