import { z } from "zod";

export const payloadSchema = z.object({
  id: z.string().optional(),

  name: z.string().min(3, "Nama minimal 3 karakter"),

  phone: z.string().min(1, "Nomor telepon wajib diisi"),

  category: z.string().min(1, "Kategori wajib diisi"),

  status: z.enum(["available", "busy", "suspended"]).optional(),

  rating_avg: z.number().optional(),

  total_reviews: z.number().optional(),
});

export type PayloadData = z.infer<typeof payloadSchema>;

export const defaultValues: PayloadData = {
  id: "",
  name: "",
  phone: "",
  category: "",
  status: "available",
  rating_avg: 0,
  total_reviews: 0,
};
