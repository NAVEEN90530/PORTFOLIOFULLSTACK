import axios from 'axios';

const API_URL = "http://localhost:5000/api/categery";

// List Categories
export const listCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create Category
export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post(API_URL, categoryData, { withCredentials: true });
    console.log('Category created:');
    return response.data; // Return created category to use in UI
  } catch (error) {
    console.error('Error creating category:', error.response ? error.response.data : error.message);
    throw error; // Ensure we throw the error so the caller can handle it
  }
};

// Update Category
export const updateCategory = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data, { withCredentials: true });
  return response.data;
};

// Delete Category
export const deleteCategory = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
  return response.data;
};
