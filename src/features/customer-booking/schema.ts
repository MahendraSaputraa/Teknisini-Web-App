import { z } from "zod";

export const createOrderSchema = z.object({
  // Informasi Pelanggan
  name: z.string().min(1, "Nama lengkap harus diisi"),
  whatsapp: z.string().min(10, "Nomor Whatsapp minimal 10 digit"),

  // Detail Layanan
  category: z.string().min(1, "Pilih kategori layanan"),
  service: z.string().min(1, "Pilih layanan spesifik"),
  notes: z.string().optional(),

  // Lokasi (Sesuai kebutuhan API)
  location: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  address: z.string().min(1, "Alamat harus terisi melalui peta"),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
