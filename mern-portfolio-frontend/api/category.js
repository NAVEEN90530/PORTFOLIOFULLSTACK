import api from "./axios";

export const listCategories = async () => {
  const { data } = await api.get("/categories");
  return data;
};

export const listDomainCategories = async (domainId) => {
  const url = domainId
    ? `/categories?domain=${domainId}`
    : `/categories`;
  const { data } = await api.get(url);
  return data;
};

export const createCategory = async (categoryData) => {
  const { data } = await api.post("/categories", categoryData);
  return data;
};

export const updateCategory = async (id, categoryData) => {
  const { data } = await api.put(`/categories/${id}`, categoryData);
  return data;
};

export const deleteCategory = async (id) => {
  const { data } = await api.delete(`/categories/${id}`);
  return data;
};
