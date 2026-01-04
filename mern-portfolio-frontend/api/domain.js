import api from "./axios";

// LIST DOMAINS
export const listDomains = async () => {
  const { data } = await api.get("/domains");
  return data;
};

// CREATE DOMAIN
export const createDomain = async (domainData) => {
  const { data } = await api.post("/domains", domainData);
  return data;
};

// UPDATE DOMAIN
export const updateDomain = async (id, domainData) => {
  const { data } = await api.put(`/domains/${id}`, domainData);
  return data;
};

// DELETE DOMAIN
export const deleteDomain = async (id) => {
  const { data } = await api.delete(`/domains/${id}`);
  return data;
};
