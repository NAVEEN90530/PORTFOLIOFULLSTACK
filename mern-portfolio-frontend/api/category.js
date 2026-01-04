import api from "./axios";

// LIST ALL CATEGORIES
export const listCategories = async () => {
  const { data } = await api.get("/categories");
  return data;
};

// LIST CATEGORIES BY DOMAIN
export const listDomainCategories = async (domainId) => {
  const url = domainId
    ? `/categories?domain=${domainId}`
    : `/categories`;
  const { data } = await api.get(url);
  return data;
};

// CREATE CATEGORY
export const createCategory = async (categoryData) => {
  const { data } = await api.post("/categories", categoryData);
  return data;
};

// UPDATE CATEGORY
export const updateCategory = async (id, categoryData) => {
  const { data } = await api.put(`/categories/${id}`, categoryData);
  return data;
};

// DELETE CATEGORY
export const deleteCategory = async (id) => {
  const { data } = await api.delete(`/categories/${id}`);
  return data;
};
