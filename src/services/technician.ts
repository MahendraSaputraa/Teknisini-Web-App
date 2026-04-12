import api from "@/lib/axios";

export const getTechnicians = async (params: any) => {
  const res = await api.get("/technicians", { params });
  return res.data;
};

export const createTechnician = async (payload: any) => {
  const res = await api.post("/technicians", payload);
  return res.data;
};

export const updateTechnician = async (id: string, payload: any) => {
  const res = await api.put(`/admin/users/${id}`, payload);
  return res.data;
};

export const deleteTechnician = async (id: string) => {
  const res = await api.delete(`/admin/users/${id}`);
  return res.data;
};
