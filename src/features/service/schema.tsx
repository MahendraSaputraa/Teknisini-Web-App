import { z } from "zod";

export const payloadSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "Nama minimal 3 karakter"),
  category_id: z.string().min(1, "Kategori wajib dipilih"),
  price: z.number().min(1, "Harga harus lebih dari 0"),
  description: z.string().optional(),
  duration_minutes: z.number().optional(),
  is_active: z.boolean().optional(),
});

export type PayloadData = z.infer<typeof payloadSchema>;

export const defaultValues: PayloadData = {
  id: "",
  name: "",
  category_id: "",
  price: 0,
  description: "",
  duration_minutes: 60,
  is_active: true,
};
