import api from "@/lib/axios";

export interface Service {
  id: string;
  name: string;
  category_id: string;
  category_name: string;
  description: string;
  price: number;
  duration_minutes: number;
  is_active: boolean;
  created_at: string | null;
}

// ─── Baca ─────────────────────────────────────────────────────────────────────

export interface GetServicesParams {
  category_id?: string;
  active?: "true" | "false";
}

export const getServices = async (params?: GetServicesParams) => {
  const res = await api.get("/services", { params });
  return res.data;
};

/**
 * Shortcut: ambil semua layanan aktif berdasarkan kategori
 * Dipakai oleh form booking saat user memilih kategori
 */
export const getServicesByCategory = async (categoryId: string) => {
  return getServices({ category_id: categoryId, active: "true" });
};

export const getServiceById = async (id: string) => {
  const res = await api.get(`/services/${id}`);
  return res.data.data as Service;
};

// ─── Tulis (Admin) ────────────────────────────────────────────────────────────

export interface CreateServicePayload {
  name: string;
  category_id: string;
  price: number;
  description?: string;
  duration_minutes?: number;
  is_active?: boolean;
}

export const createService = async (payload: CreateServicePayload) => {
  const res = await api.post("/services", payload);
  return res.data.data as Service;
};

export const updateService = async (
  id: string,
  payload: Partial<CreateServicePayload>,
) => {
  const res = await api.patch(`/services/${id}`, payload);
  return res.data.data as Service;
};

export const deleteService = async (id: string) => {
  const res = await api.delete(`/services/${id}`);
  return res.data;
};
