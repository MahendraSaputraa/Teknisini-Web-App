import api from "@/lib/axios";

export const getOrder = async (params: any) => {
  const res = await api.get("/orders", { params });
  return res.data;
};

export const createOrder = async (payload: any) => {
  const res = await api.post("/orders", payload);
  return res.data;
};

// export const updateTechnician = async (id: string, payload: any) => {
//   const res = await api.put(`/admin/users/${id}`, payload);
//   return res.data;
// };

// export const deleteTechnician = async (id: string) => {
//   const res = await api.delete(`/admin/users/${id}`);
//   return res.data;
// };
