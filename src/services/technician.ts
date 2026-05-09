import api from "@/lib/axios";

export interface GetTechniciansParams {
  status?: "available" | "busy" | "suspended";
}

export const getTechnicians = async (params?: GetTechniciansParams) => {
  const res = await api.get("/technicians", { params });
  return res.data;
};

export const getTechnicianById = async (id: string) => {
  const res = await api.get(`/technicians/${id}`);
  return res.data;
};

export const createTechnician = async (payload: any) => {
  const res = await api.post("/technicians", payload);
  return res.data;
};

export const updateTechnician = async (id: string, payload: any) => {
  const res = await api.patch(`/technicians/${id}`, payload);
  return res.data;
};

export const deleteTechnician = async (id: string) => {
  const res = await api.delete(`/technicians/${id}`);
  return res.data;
};