import api from "@/lib/axios";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  is_active: boolean;
  created_at: string | null;
}

// ─── Baca ─────────────────────────────────────────────────────────────────────

export const getCategories = async () => {
  const res = await api.get("/categories");
  return res.data;
};

export const getCategoryById = async (id: string) => {
  const res = await api.get(`/categories/${id}`);
  return res.data.data as Category;
};

// ─── Tulis (Admin) ────────────────────────────────────────────────────────────

export interface CreateCategoryPayload {
  name: string;
  description?: string;
  icon?: string;
  is_active?: boolean;
}

export const createCategory = async (payload: CreateCategoryPayload) => {
  const res = await api.post("/categories", payload);
  return res.data.data as Category;
};

export const updateCategory = async (
  id: string,
  payload: Partial<CreateCategoryPayload>,
) => {
  const res = await api.patch(`/categories/${id}`, payload);
  return res.data.data as Category;
};

export const deleteCategory = async (id: string) => {
  const res = await api.delete(`/categories/${id}`);
  return res.data;
};
