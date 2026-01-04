import api from "./axios";

export const listDomains = async () => {
  const { data } = await api.get("/domains");
  return data;
};

export const createDomain = async (domainData) => {
  const { data } = await api.post("/domains", domainData);
  return data;
};

export const updateDomain = async (id, domainData) => {
  const { data } = await api.put(`/domains/${id}`, domainData);
  return data;
};

export const deleteDomain = async (id) => {
  const { data } = await api.delete(`/domains/${id}`);
  return data;
};
