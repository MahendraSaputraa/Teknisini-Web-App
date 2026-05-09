import { z } from "zod";

export const createOrderSchema = z.object({
  // Informasi Pelanggan
  name: z.string().min(1, "Nama lengkap harus diisi"),
  user_phone: z.string().min(10, "Nomor minimal 10 digit"),

  // Detail Layanan
  category_id: z.string().min(1, "Pilih kategori layanan"),
  service_id: z.string().min(1, "Pilih layanan spesifik"),
  notes: z.string().optional(),

  // Lokasi (Sesuai kebutuhan API)
  location: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  address: z.string().min(1, "Alamat harus terisi melalui peta"),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
