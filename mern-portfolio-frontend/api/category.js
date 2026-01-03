import api from "./axios";

// LIST ALL CATEGORIES
export const listCategories = async () => {
  const { data } = await api.get("/api/categories");
  return data;
};

// LIST CATEGORIES BY DOMAIN
export const listDomainCategories = async (domainId) => {
  const url = domainId
    ? `/api/categories?domain=${domainId}`
    : `/api/categories`;
  const { data } = await api.get(url);
  return data;
};

// CREATE CATEGORY
export const createCategory = async (categoryData) => {
  const { data } = await api.post("/api/categories", categoryData);
  return data;
};

// UPDATE CATEGORY
export const updateCategory = async (id, categoryData) => {
  const { data } = await api.put(`/api/categories/${id}`, categoryData);
  return data;
};

// DELETE CATEGORY
export const deleteCategory = async (id) => {
  const { data } = await api.delete(`/api/categories/${id}`);
  return data;
};
